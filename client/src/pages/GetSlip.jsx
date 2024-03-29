import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/SetPointAsiringEminence.png"
import "../print.css"

const GetSlip = () => {
  const { empRef, month } = useParams();
  const [slip, setSlip] = useState(null);

  useEffect(() => {
    fetch(`/api/slip/get-slip/${empRef}/${month}`)
      .then((response) => response.json())
      .then((data) => setSlip(data))
      .catch((error) => console.error("Error fetching slip:", error));
  }, [empRef, month]);

  if (!slip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto">
        <div className="flex justify-between">
            <div className="flex flex-ROW">
                <img src={logo} alt="Image Description" className="w-32 h-32" />
                <p className="mt-9 text-slate-800 font-bold">ENGINEERING <br /> SERVICE</p>
            </div>
            <div className="ml-4 font-semibold">
                DOI : {slip.doi}
            </div>
        </div>
      <table className="w-full border-separate border-spacing-2">
        <tbody>
          <tr>
            <td className="px-4 py-2">Employee ID:</td>
            <td className="px-4 py-1 border border-gray-300 rounded-lg ">{slip.empRef}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Employee Name:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.ename}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Designation:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.des}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Date of Joining:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.djoin}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Month:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.month}</td>
          </tr>
          {/* <tr className="h-2"></tr> Adding space between sections */}
          <tr><td><span className=" px-2 font-bold">SALARY DETAILS</span></td></tr>
          
          <tr>
            <td className="px-4 py-2">Basic:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.bsal}</td>
            <td className="px-4 py-2">Professional Tax:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.ptax}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">House Rent Allowance:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.hra}</td>
            <td className="px-4 py-2">PF@Employer:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.pfemper}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Travel Allowance:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.ta}</td>
            <td className="px-4 py-2">PF@Employees:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.pfempes}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Special Allowance:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.sa}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="px-4 py-2">Medical Allowance:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.ma}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="px-4 py-2">Leave Travel Allowance:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.lta}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="px-4 py-2">Total Earnings:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.totearn}</td>
            <td className="px-4 py-2">Total Deductions:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.totded}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="px-4 py-2">Total Salary:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.totsal}</td>
          </tr>
          <tr>
            <td>
            <span className=" px-2 font-bold">LEAVE DETAILS</span>
            </td>
          </tr>         

          <tr>
            <td className="px-4 py-2">Alloted Leaves:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.al}</td>
            <td className="px-4 py-2">Leaves Taken:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.lt}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Total Days:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.td}</td>
            <td className="px-4 py-2">Balanced Leaves:</td>
            <td className="px-4 py-1 rounded-lg border border-gray-300">{slip.bl}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => window.print()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 printbutton">
        Print Slip
      </button>
    </div>
  );
};

export default GetSlip;
