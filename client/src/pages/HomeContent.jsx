import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../scrollbar.css';

export default function HomeContent() {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [leavesToday, setLeavesToday] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all leaves
    const fetchLeaves = async () => {
      try {
        const res = await fetch('/api/leave/get-leaves');
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.error(data.message);
          return;
        }
        // Filter for pending leaves
        setPendingLeaves(data.filter(leave => leave.status === 'pending'));

        // Filter for members on leave today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
        setLeavesToday(data.filter(leave => {
          const fromDate = new Date(leave.fromDate);
          const toDate = new Date(leave.toDate);
          return leave.status === 'approved' && fromDate <= today && today <= toDate;
        }));
      } catch (err) {
        setError('Failed to fetch leave data.');
        console.error(err);
      }
    };

    // Fetch all employees
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/crud/get');
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.error(data.message);
          return;
        }
        setEmployees(data);
      } catch (err) {
        setError('Failed to fetch employee data.');
        console.error(err);
      }
    };

    fetchLeaves();
    fetchEmployees();
  }, []);

  return (
    <div className="p-4 space-y-6 h-screen overflow-y-auto">
      {/* Error Display */}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>}

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <Link 
          to="/home/view-all-leaves" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Manage Leave Approvals
        </Link>
        <Link 
          to="/home/leave-calendar" 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          View Leave Calendar
        </Link>
      </div>

      {/* Unapproved Leave Requisitions Section */}
      <div className="bg-slate-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-slate-700">Unapproved Leave Requisitions</h2>
        {pendingLeaves.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-slate-200">
                <tr>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Employee ID</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">From Date</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">To Date</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Reason</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingLeaves.map(leave => (
                  <tr key={leave._id} className="hover:bg-slate-50">
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{leave.employeeId}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{new Date(leave.fromDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{new Date(leave.toDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{leave.reason || '-'}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-600">No pending leave requisitions.</p>
        )}
      </div>

      {/* Members on Leave Today Section */}
      <div className="bg-slate-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-slate-700">Members on Leave Today</h2>
        {leavesToday.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-slate-200">
                <tr>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Employee ID</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">From Date</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">To Date</th>
                </tr>
              </thead>
              <tbody>
                {leavesToday.map(leave => (
                  <tr key={leave._id} className="hover:bg-slate-50">
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{leave.employeeId}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{new Date(leave.fromDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{new Date(leave.toDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-600">No employees are on leave today.</p>
        )}
      </div>

      {/* Employee Information Section */}
      <div className="bg-slate-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-slate-700">Employee Information</h2>
        <p className="mb-3 text-slate-600">Total Employees: {employees.length}</p>
        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-slate-200">
                <tr>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Employee ID</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Name</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Post</th>
                  <th className="py-2 px-4 border-b border-slate-300 text-left text-sm font-medium text-slate-600">Department</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee._id} className="hover:bg-slate-50">
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{employee.employeeId}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{employee.fname} {employee.lname}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{employee.post}</td>
                    <td className="py-2 px-4 border-b border-slate-200 text-sm text-slate-700">{employee.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-600">No employees found.</p>
        )}
      </div>
    </div>
  );
}
