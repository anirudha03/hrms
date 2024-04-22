import React from 'react'
import StorageStats from '../components/StorageStats'
import DepartmentManagement from '../components/DepartmentManagement'

export default function Account() {
  return (
    <div className='flex gap-3'>
        <div className="lg:w-1/3 lg:h-1/2 rounded-lg mb-3">
            <StorageStats/>
        </div>
        <div className="lg:w-1/3 lg:h-1/2 rounded-lg mb-3 ">
            <DepartmentManagement/>
        </div>
    </div>
  )
}
