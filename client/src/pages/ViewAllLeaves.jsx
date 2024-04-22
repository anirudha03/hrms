import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ViewAllLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [searchQueries, setSearchQueries] = useState({
    fromDate: '',
    toDate: '',
    days: '',
    empRef: '',
    against_balance:'',
    status: '',

  });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch('/api/leave/get-leaves');
        const data = await response.json();
        // Sort leaves in descending order based on _id
        const sortedLeaves = data.sort((a, b) => b._id.localeCompare(a._id));
        setLeaves(sortedLeaves);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };
    fetchLeaves();
  }, []);

  const handleSearchInputChange = (e, columnName) => {
    setSearchQueries({
      ...searchQueries,
      [columnName]: e.target.value,
    });
  };

  const filterLeaves = (leave) => {
    return Object.keys(searchQueries).every((key) => {
      const propertyValue = String(leave[key]).toLowerCase(); // Convert to string
      const queryValue = searchQueries[key].toLowerCase();
      return propertyValue.includes(queryValue);
    });
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-center">
              <input
                type="text"
                placeholder="From Date"
                value={searchQueries.fromDate}
                onChange={(e) => handleSearchInputChange(e, 'fromDate')}
                className="px-4 py-2 w-full bg-transparent border-none focus:outline-none text-center"
              />
            </th>
            <th className="px-4 py-2 text-center">
              <input
                type="text"
                placeholder="To Date"
                value={searchQueries.toDate}
                onChange={(e) => handleSearchInputChange(e, 'toDate')}
                className="px-4 py-2 w-full bg-transparent border-none focus:outline-none text-center"
              />
            </th>
            <th className="px-4 py-2 text-center">
              <input
                type="text"
                placeholder="Days"
                value={searchQueries.days}
                onChange={(e) => handleSearchInputChange(e, 'days')}
                className="px-4 py-2 w-full bg-transparent border-none focus:outline-none text-center"
              />
            </th>
            <th className="px-4 py-2 text-center">
              <input
                type="text"
                placeholder="Against"
                value={searchQueries.against_balance}
                onChange={(e) => handleSearchInputChange(e, 'days')}
                className="px-4 py-2 w-full bg-transparent border-none focus:outline-none text-center"
              />
            </th>
            <th className="px-4 py-2 text-center">
              <input
                type="text"
                placeholder="Employee ID"
                value={searchQueries.empRef}
                onChange={(e) => handleSearchInputChange(e, 'empRef')}
                className="px-4 py-2 w-full bg-transparent border-none focus:outline-none text-center"
              />
            </th>
            <th className="px-4 py-2 text-center">
              <input
                type="text"
                placeholder="Status"
                value={searchQueries.status}
                onChange={(e) => handleSearchInputChange(e, 'status')}
                className="px-4 py-2 w-full bg-transparent border-none focus:outline-none text-center"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {leaves.filter(filterLeaves).map((leave) => (
            <tr key={leave._id} className="bg-white">
              <td className="px-4 py-2 text-center">{leave.fromDate}</td>
              <td className="px-4 py-2 text-center">{leave.toDate}</td>
              <td className="px-4 py-2 text-center">{leave.days}</td>
              <td className="px-4 py-2 text-center">{leave.against_balance}</td>
              <td className="px-4 py-2 text-center">{leave.empRef}</td>
              <td className="px-4 py-2 text-center">{leave.status}</td>
              <td className="px-4 py-2 text-center">
                <Link
                  to={`/home/edit-leave/${leave._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
