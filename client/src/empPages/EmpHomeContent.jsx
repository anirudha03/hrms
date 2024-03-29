import React from 'react'
import { useSelector } from 'react-redux'

export default function EmpHomeContent() {
    const { currentUserEmp } = useSelector((state) => state.employee);
  return (
    <div>
        <h1 className='text-4xl'>Hi, {currentUserEmp.fname}!</h1>
        <br />
        <span className='font-bold'>{currentUserEmp.empid}</span><div/>
        <span className='font-bold'>{currentUserEmp.department}</span><div/>
        <span className='font-bold'>{currentUserEmp.post}</span><div/>
        Leave Balance : <span className='font-bold'>{currentUserEmp.leave_balance}</span> <div/>
        <br />
        <hr />
    </div>
  )
}
