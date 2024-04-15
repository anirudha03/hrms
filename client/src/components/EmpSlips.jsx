import React, { useState, useEffect } from 'react';

export default function EmpSlips({ empid }) {
    const [slips, setSlips] = useState([]);

    useEffect(() => {
        fetch(`/api/employee-auth/emp-slips/${empid}`)
            .then(response => response.json())
            .then(data => {
                // Sort slips in descending order based on DOI
                const sortedSlips = data.sort((a, b) => new Date(b.doi) - new Date(a.doi));
                setSlips(sortedSlips);
            })
            .catch(error => {
                console.error('Error fetching employee slips:', error);
            });
    }, [empid]);

    return (
        <div className='max-w-screen-md h-52 overflow-y-auto'>
            <table className="w-full mt-4 border-collapse border border-gray-200">
                <thead className="bg-slate-300">
                    <tr>
                        <th className="py-2 px-4 text-sm text-center">DOI</th>
                        <th className="py-2 px-4 text-sm text-center">Month</th>
                        <th className="py-2 px-4 text-sm text-center">Total Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {slips.map((slip, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="py-2 px-4 text-sm text-center"><button className='bg-slate-500 text-white py-1 px-2 rounded'>{slip.doi}</button></td>
                            <td className="py-2 px-4 text-sm text-center">{slip.month}</td>
                            <td className="py-2 px-4 text-sm text-center">{slip.totsal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
