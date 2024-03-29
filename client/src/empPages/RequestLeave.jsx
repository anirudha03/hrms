import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RequestLeave() {
  const { currentUserEmp } = useSelector((state) => state.employee);
  // console.log(currentUserEmp.empid);

  const navigate = useNavigate();

  const [leaveData, setLeaveData] = useState({
    fromDate: "",
    toDate: "",
    days: 0,
    reason: "",
    status: "Pending",
    month: new Date().toISOString().split("-").slice(0, 2).join("-"),
    empRef: currentUserEmp.empid,
  });

  const calculateDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    let count = 0;
    for (
      let current = start;
      current <= end;
      current.setDate(current.getDate() + 1)
    ) {
      if (current.getDay() !== 0) {
        count++;
      }
    }
    return count;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevLeaveData) => ({
      ...prevLeaveData,
      [name]: value,
    }));
    if (name === "fromDate" || name === "toDate") {
      const days = calculateDays(
        name === "fromDate" ? value : leaveData.fromDate,
        name === "toDate" ? value : leaveData.toDate
      );
      setLeaveData((prevLeaveData) => ({
        ...prevLeaveData,
        days: days,
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/leave/add-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });

      if (!response.ok) {
        throw new Error("Failed to add leave");
      }

      // Navigate to the desired page after successfully adding leave
      navigate("/employee-home"); // Replace with your desired page path
    } catch (error) {
      console.error("Error adding leave:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block mb-2">From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={leaveData.fromDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">To Date:</label>
          <input
            type="date"
            name="toDate"
            value={leaveData.toDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Number of Days:</label>
          <input
            type="number"
            name="days"
            value={leaveData.days}
            className="border border-gray-300 p-2 rounded-md w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Reason:</label>
          <textarea
            name="reason"
            value={leaveData.reason}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Submit</button>
      </form>
    </div>
  );
}
