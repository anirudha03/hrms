import { Link } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentUserEmp } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart);
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
      dispatch(signOutStartEmp);
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
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Set</span>
          <span className="text-slate-700">Point</span>
        </h1>

        <ul className="flex gap-4">
          {currentUser || currentUserEmp ? (
            <span className="flex gap-4">
              <Link to={currentUserEmp ? "/employee-home" : "/home"}>
                <li>Home</li>
              </Link>
              <span
                onClick={currentUserEmp ? handleSignOutEmp : handleSignOut}
                className="text-red-700 cursor-pointer"
              >
                Sign out
              </span>
            </span>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
