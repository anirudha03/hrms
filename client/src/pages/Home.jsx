import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="flex flex-grow h-full">
      <Sidebar />
      <div className="w-5/6 p-4 overflow-y-auto scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
}
