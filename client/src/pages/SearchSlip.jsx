import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchSlip = () => {
  const [slips, setSlips] = useState([]);
  const [searchEmpId, setSearchEmpId] = useState('');
  const [searchMonth, setSearchMonth] = useState('');

  useEffect(() => {
    fetch('/api/slip/get-slip')
      .then(response => response.json())
      .then(data => setSlips(data))
      .catch(error => console.error('Error fetching slips:', error));
  }, []);

  const filteredSlips = slips.filter(slip => {
    return slip.empRef.toLowerCase().includes(searchEmpId.toLowerCase()) &&
           slip.month.toLowerCase().includes(searchMonth.toLowerCase());
  });

  return (
    <div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search Employee ID"
          value={searchEmpId}
          onChange={e => setSearchEmpId(e.target.value)}
          className="px-2 py-1 border rounded-md"
        />
        <input
          type="text"
          placeholder="Search Month"
          value={searchMonth}
          onChange={e => setSearchMonth(e.target.value)}
          className="px-2 py-1 border rounded-md"
        />
        {/* <button className="p-1.5 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ml-2">Search</button> */}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-200">
            <th className="px-2 py-1 text-center">Employee ID</th>
            <th className="px-2 py-1 text-center">Month</th>
            <th className="px-2 py-1 text-center">Total Salary</th>
            <th className="px-2 py-1 text-center">Date of Issue</th>
            <th className="px-2 py-1 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSlips.map(slip => (
            <tr key={slip._id} className="border-b border-gray-300">
              <td className="px-2 py-1 text-center">{slip.empRef}</td>
              <td className="px-2 py-1 text-center">{slip.month}</td>
              <td className="px-2 py-1 text-center">{slip.totsal}</td>
              <td className="px-2 py-1 text-center">{slip.doi}</td>
              <td className="px-2 py-1 text-center">
                <Link className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" to={`/get-slip/${slip.empRef}/${slip.month}`}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchSlip;
