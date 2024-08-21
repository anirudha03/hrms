import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function GenerateSlip() {
  const navigate = useNavigate();
  const [empSearch, setEmpSearch] = useState({
    empid: "",
    month: "",
  });
  const [data, setData] = useState({
    empRef: "",
    month: "",
    ename: "",
    des: "",
    djoin: "",
    bsal: 0,
    hra: 0,
    ta: 0,
    sa: 0,
    ma: 0,
    lta: 0,
    totearn: 0,
    ptax: 0,
    pfemper: 0,
    pfempes: 0,
    totded: 0,
    totsal: 0,
    al: 0,
    lt: 0,
    td: 0,
    bl: 0,
    el: 0,
    npd: 0,
    doi: "",
    against_balance: 0,
    bonus_date:""
  });
  const getEmployeeInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/slip/getEmpMonth/${empSearch.empid}/${empSearch.month}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        // If response is JSON
        const result = await response.json();
        setData({
          ...data,
          empRef: result.empid,
          month: result.month,
          ename: `${result.fname} ${result.lname}`,
          des: result.post,
          djoin: result.doj,
          bsal: result.bsalary,
          lt: result.totalDays,
          bl: result.balance,
          against_balance: result.against_balance,
          hra: result.hra,
          lta: result.lta,
          ta: result.ta,
          sa: result.sa,
          ma: result.ma,
          pfempes:  result.pfempes,
          bonus_date: result.bonus_date
        });
      } else {
        throw new Error("Failed to fetch employee data: Response is not JSON");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const bonusDate = new Date(data.bonus_date);
  
    if (today >= bonusDate) {
      setData((prevData) => ({
        ...prevData,
        al: 2
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        al: 1
      }));
    }
  }, [data.bonus_date]);
  

  const handleSearchChange = (e) => {
    if (e.target.id === "empid") {
      setEmpSearch({
        ...empSearch,
        empid: e.target.value,
      });
    }
    if (e.target.id === "month") {
      setEmpSearch({
        ...empSearch,
        month: e.target.value,
      });
    }
  };
  

  const handleFormChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    
    // Check if the field being changed is 'al' and the bonus date has passed
    if (e.target.id === 'al' && new Date() >= new Date(data.bonus_date)) {
      // Allow manual changes to 'al'
      setData((prevData) => ({
        ...prevData,
        al: value,
      }));
    } else {
      // Update other fields as usual
      setData({
        ...data,
        [e.target.id]: value,
      });
    }
  };
  

  const calculateTotals = () => {
    const totalEarnings = data.bsal + data.hra + data.ta + data.sa + data.ma + data.lta;
    const totalDeductions = data.ptax + data.pfemper + data.pfempes;
    const totalSalary = totalEarnings - totalDeductions;
    const td = data.bl + data.lt - data.against_balance;
    // net-paid-days, balanced-leaves=0, leaves-taken =14, alloted-leaves=2; against balance= 2;

    // june, bal=5; in the month of june=> lt= 3; bal =2;
    setData({
      ...data,
      totearn: totalEarnings,
      totded: totalDeductions,
      totsal: totalSalary,
      // npd: npd,
      td: td,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (data.doi === "" || data.against_balance === "" || data.totsal === 0) {
    alert("Please fill all fields");
  } else {
    try {
      const response = await fetch("/api/slip/add-slip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add salary slip");
      }
      alert("Salary slip added successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add salary slip");
    }
  }
};


  return (
    <>
      <header>
        <form onSubmit={getEmployeeInfo}>
          <input
            type="text"
            id="empid"
            name="empid"
            className="border p-1 rounded-sm"
            placeholder="Enter Employee ID"
            onChange={handleSearchChange}
            value={empSearch.empid}
          />
          <input
            type="text"
            id="month"
            name="month"
            className="border p-1 rounded-sm"
            placeholder="Enter month(yyyy-mm)"
            onChange={handleSearchChange}
            value={empSearch.month}
          />

          <button className="p-1.5 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ml-2">
            Search
          </button>
        </form>
      </header>

      {data.empRef && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1">
          <div>
            <div className="m-2">
            <label htmlFor="doi" className="m-1">Date of Issue:</label>
            <input type="date" name="doi" id="doi" className="border p-1 rounded-sm" onChange={handleFormChange} value={data.doi} required/>
            </div>
          
            <div className="flex flex-row flex-1 m-2 gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="empRef" className="m-1">Employee ID:</label>
                <label htmlFor="ename" className="m-1">Employee Name:</label>
                <label htmlFor="ename" className="m-1">Designation:</label>
                <label htmlFor="djoin" className="m-1">Date of Joining:</label>
                <label htmlFor="month" className="m-1">Month:</label>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <input type="text" name="empRef" id="empRef" className="border p-1 rounded-sm" onChange={handleFormChange} value={data.empRef}/>
                <input type="text" name="ename" id="ename"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.ename}/>
                <input type="text" name="des" id="des"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.des}/>
                <input type="text" name="djoin" id="djoin"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.djoin}/>
                <input type="text" name="month" id="month"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.month}/>
              </div>
            </div>
            <hr />
            <div className="flex flex-row flex-1 m-2 gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="bsal" className="m-1">Basic:</label>
                <label htmlFor="hra" className="m-1">House Rent Allowance:</label>
                <label htmlFor="ta" className="m-1">Travel Allowance:</label>
                <label htmlFor="sa" className="m-1">Special Allowance:</label>
                <label htmlFor="ma" className="m-2">Medical Allowance:</label>
                <label htmlFor="lta" className="m-1">Leave Travel Allowance:</label>
                <label htmlFor="totearn" className="m-1">Total Earnings:</label>
                <br />
                <label htmlFor="ptax" className="m-2">Professional Tax:</label>
                <label htmlFor="pfemper" className="m-1">PF@Employer:</label>
                <label htmlFor="pfempes" className="m-1">PF@Employees:</label>
                <label htmlFor="totded" className="m-2">Total Deductions:</label>
                <hr />
                <label htmlFor="totsal" className="m-2">Total Salary:</label>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <input type="number" name="bsal" id="bsal" className="border p-1 rounded-sm" onChange={handleFormChange} value={data.bsal}/>
                <input type="number" name="hra" id="hra"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.hra}/>
                <input type="number" name="ta" id="ta"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.ta}/>
                <input type="number" name="sa" id="sa"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.sa}/>
                <input type="number" name="ma" id="ma"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.ma}/>
                <input type="number" name="lta" id="lta"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.lta}/>
                <input type="number" name="totearn" id="totearn"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.totearn}/>
                <br />
                <input type="number" name="ptax" id="ptax"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.ptax}/>
                <input type="number" name="pfemper" id="pfemper"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.pfemper}/>
                <input type="number" name="pfempes" id="pfempes"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.pfempes}/>
                <input type="number" name="totded" id="totded"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.totded}/>
                <hr />
                <input type="number" name="totsal" id="totsal"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.totsal} required/>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row flex-1 m-2 gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="al" className="m-1">Alloted Leaves:</label>
                <label htmlFor="lt" className="m-1">Leaves Taken:</label>
                <label htmlFor="td" className="m-1">Total Days:</label>
                <label htmlFor="bl" className="m-1">Balanced Leaves:</label>
                <label htmlFor="against_balance" className="m-2">Against Balance</label>
                <label htmlFor="el" className="m-1">Encashed Leaves</label>
                <label htmlFor="npd" className="m-1">Net Paid Days</label>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <input type="number" name="al" id="al" className="border p-1 rounded-sm" onChange={handleFormChange} value={data.al}/>
                <input type="number" name="lt" id="lt"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.lt}/>
                <input type="number" name="td" id="td"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.td}/>
                <input type="number" name="bl" id="bl"className="border p-1 rounded-sm"onChange={handleFormChange}value={data.bl}/>
                <input type="number" name="against_balance" id="against_balance"className="border p-1 rounded-sm" onChange={handleFormChange} value={data.against_balance} required/>
                <input type="number" name="el" id="el"className="border p-1 rounded-sm" onChange={handleFormChange} value={data.el} required/>
                <input type="number" name="npd" id="npd"className="border p-1 rounded-sm" onChange={handleFormChange} value={data.npd} required/>
              </div>
            </div>
          </div>          
        </form>
        
      )}
        <button onClick={calculateTotals} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Calculate
        </button>
        <br />
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>

      <footer>
        <div></div>
      </footer>
    </>
  );
}
