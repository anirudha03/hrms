import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
} from "../redux/user/userSlice";
import {
  deleteUserFailureEmp,
  deleteUserSuccessEmp,
  signOutFailureEmp,
  signOutStartEmp,
} from "../redux/employee/employeeSlice";

export default function Header() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart()); 
      const res = await fetch("/api/admin-auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleSignOutEmp = async () => {
    try {
      dispatch(signOutStartEmp()); 
      const res = await fetch("/api/employee-auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailureEmp(data.message));
        return;
      }
      dispatch(deleteUserSuccessEmp(data));
    } catch (error) {
      dispatch(signOutFailureEmp(error.message));
    }
  };

  return (
    <div className="bg-slate-300 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl ">
          <span className="text-slate-500">Set</span>
          <span className="text-slate-700">Point</span>
        </h1>

        <ul className="flex gap-4">
          <li>
            <HamburgerMenu handleSignOut={handleSignOut} handleSignOutEmp={handleSignOutEmp}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
