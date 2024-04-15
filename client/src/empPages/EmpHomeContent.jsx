import React from 'react';
import { useSelector } from 'react-redux';
import EmpSlips from '../components/EmpSlips';
import EmpLeaves from '../components/EmpLeaves';

export default function EmpHomeContent() {
    const { currentUserEmp } = useSelector((state) => state.employee);

    return (
        <div>
            <h1 className='text-4xl'>Hi, {currentUserEmp.fname}!</h1>
            <br />
            <span className='font-bold'>{currentUserEmp.empid}</span><div/>
            <span className='font-bold'>{currentUserEmp.department}</span><div/>
            <span className='font-bold'>{currentUserEmp.post}</span><div/>
            Leave Balance: <span className='font-bold'>{currentUserEmp.leave_balance}</span> <div/>
            <br />
            <hr />
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                    <EmpSlips empid={currentUserEmp.empid} />
                </div>
                <div className="lg:w-1/2 lg:pl-4 mt-4 lg:mt-0 overflow-y-auto max-h-sm">
                    <EmpLeaves empid={currentUserEmp.empid} />
                </div>
            </div>
        </div>
    );
}
