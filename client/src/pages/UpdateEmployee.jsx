import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function UpdateEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empSearch, setEmpSearch] = useState({
    empid: "", 
  });
  const navigate = useNavigate();
  // Define the state variable for data
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    empid: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    phone: "",
    aadhar: "",
    dob: "",
    address: "",
    hometype: "",
    bloodgroup: "",
    gender: "",
    mstatus: "",
    passport: "",
    degree: "",
    post: "",
    department: "",
    bonusMonths: 0,
    bsalary: "",
    status: "",
    doj: "",
    bonus_date: "",
    leave_balance: "",
    password: "",
    hra:0,
    lta:0,
    ta:0,
    ma:0,
    mpa:0,
    sa:0,
    pfempes:0,
  });

  useEffect(() => {
    // Fetch departments when the component mounts
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/crud/get-department');
      const data = await res.json();
      if (data.success) {
        setDepartments(data.data.map(department => department.department));
      } else {
        setError("Failed to fetch departments");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (e) => {
    if (e.target.id === 'empid') {
      setEmpSearch({
        ...empSearch,
        empid: e.target.value, 
      });
    }
  };

  const handleChange = (e) => {
    const { id, type, value } = e.target;
  
    // Handle checkbox changes
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      // Handle other input changes
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
  
      // If Date of Joining changes, recalculate the Bonus Date
      if (id === "doj") {
        const updatedBonusDate = calculateBonusDate(value, formData.bonusMonths);
        setFormData((prevFormData) => ({
          ...prevFormData,
          bonus_date: updatedBonusDate,
        }));
      }
  
      // If Bonus Months changes, update the Bonus Date
      if (id === "bonusMonths") {
        const updatedBonusDate = calculateBonusDate(formData.doj, value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          bonusMonths: value,
          bonus_date: updatedBonusDate,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/crud/get/${empSearch.empid}`);
      const fetchedData = await res.json();
      setData(fetchedData);
      setFormData({
        ...fetchedData,
        department: fetchedData.department // Set the department explicitly
      });
    } catch (error) {
      setError(error);
    }
  };
  

  const handleUpdate = async (e) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/crud/update/${formData.empid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await res.json();
      console.log(responseData); // Log the response data
      setLoading(false);
      if (responseData) {
        console.log("Update successful!"); // Log if the update is successful
        navigate(`/home`);
      } else {
        setError(responseData || "Failed to update employee"); // Log and set error message
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Failed to update employee"); // Log and set error message
    }
  };
  
  const calculateBonusDate = (doj, bonusMonths) => {
    if (!doj || !bonusMonths) return ""; // If either doj or bonusMonths is empty, return empty string for bonus date

    const dojDate = new Date(doj);
    const bonusDate = new Date(dojDate.setMonth(dojDate.getMonth() + parseInt(bonusMonths)));

    // Format the bonus date as "YYYY-MM-DD"
    return bonusDate.toISOString().split("T")[0];
  };


  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          Enter Employee ID: <br/>
          <input type="text" id="empid" name="empid" className="border p-1 rounded-sm" onChange={handleSearchChange} value={empSearch.empid}/>
          <button className="p-1.5 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ml-2">Search</button>
        </form>
      </div>
      {/* Display the message when data is not null */}
      {data && (
        <main className="p-1 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1">
          <div className="flex flex-col gap-2 flex-1">
              Employee ID:
              <input type="text" id="empid" className="border p-1 rounded-sm" onChange={handleChange} value={formData.empid} />
              First Name:
              <input type="text" id="fname" className="border p-1 rounded-sm" onChange={handleChange} value={formData.fname} />
              Middle Name:
              <input type="text" id="mname" className="border p-1 rounded-sm" onChange={handleChange} value={formData.mname} />
              Last Name:
              <input type="text" id="lname" className="border p-1 rounded-sm" onChange={handleChange} value={formData.lname} />
              Email ID:
              <input type="text" id="email" className="border p-1 rounded-sm" onChange={handleChange} value={formData.email} />
              Phone No.:
              <input type="number" id="phone" className="border p-1 rounded-sm" onChange={handleChange} value={formData.phone} />
              Aadhar No.:
              <input type="number" id="aadhar" className="border p-1 rounded-sm" onChange={handleChange} value={formData.aadhar} />
              Date of Birth:
              <input type="date" id="dob" className="border p-1 rounded-sm" onChange={handleChange} value={formData.dob} />
              Address:
              <textarea type="" id="address" className="border p-1 rounded-sm" onChange={handleChange} value={formData.address} />
              Home Type:
              <div className='flex gap-2'>
                <input type='checkbox'id='permanent'className='w-5'onChange={handleChange}checked={formData.hometype === 'permanent'}/>
                <span>Permanent</span>
                <input type='checkbox'id='rent'className='w-5'onChange={handleChange}checked={formData.hometype === 'rent'}/>
                <span>Rental</span>
              </div>
              Blood Group:
              <input type="text" id="bloodgroup" className="border p-1 rounded-sm" onChange={handleChange} value={formData.bloodgroup}/>
              Gender:
              <div className='flex gap-2'>
                <input type='checkbox'id='male'className='w-5'onChange={handleChange}checked={formData.gender === 'male'}/>
                <span>Male</span>
                <input type='checkbox'id='female'className='w-5'onChange={handleChange}checked={formData.gender === 'female'}/>
                <span>Female</span>
              </div>
              Marital Status:
              <div className='flex gap-2'>
                <input type='checkbox'id='single'className='w-5'onChange={handleChange}checked={formData.mstatus === 'single'}/>
                <span>Single</span>
                <input type='checkbox'id='married'className='w-5'onChange={handleChange}checked={formData.mstatus === 'married'}/>
                <span>Married</span>
              </div>
              Passport No.:
              <input type="number" id="passport" className="border p-1 rounded-sm" onChange={handleChange} value={formData.passport} />                          
          </div>
          <div className='flex flex-col flex-1 gap-2'>
          Degree:
              <input type="text" id="degree" className="border p-1 rounded-sm" onChange={handleChange} value={formData.degree} />
              Post:
              <input type="text" id="post" className="border p-1 rounded-sm" onChange={handleChange} value={formData.post} />
              Department:
              <select id="department" className="border p-1 rounded-sm" onChange={handleChange} value={formData.department}>
                <option value="">Select Department</option>
                  {departments.map(department => (
                <option key={department} value={department} selected={formData.department === department}>{department}</option>
                ))}
              </select>
              Basic Salary:
              <input type="number" id="bsalary" className="border p-1 rounded-sm" onChange={handleChange} value={formData.bsalary} />
              Status:
              <div className='flex gap-2'>
                <input type='checkbox'id='active'className='w-5'onChange={handleChange}checked={formData.status === 'active'}/>
                <span>Active</span>
                <input type='checkbox'id='inactive'className='w-5'onChange={handleChange}checked={formData.status === 'inactive'}/>
                <span>Inactive</span>
                <input type='checkbox'id='resigned'className='w-5'onChange={handleChange}checked={formData.status === 'resigned'}/>
                <span>Resigned</span>
              </div>
  
              Date of joining:
              <input type="date" id="doj" className="border p-1 rounded-sm" onChange={handleChange} value={formData.doj} />
              Bonus Months:
              <input type="number" id="bonusMonths" className="border p-1 rounded-sm" onChange={handleChange} value={formData.bonusMonths} />
              Date of Probation:
              <input type="date" id="bonus_date" className="border p-1 rounded-sm" onChange={handleChange} value={formData.bonus_date} />
              Leave Balance:
              <input type="number" id="leave_balance" className="border p-1 rounded-sm" onChange={handleChange} value={formData.leave_balance} />
              Password:
              <input type="text" id="password" className="border p-1 rounded-sm" onChange={handleChange} value={formData.password} />   

              house and rental allowance:
              <input type="number" id="hra" className="border p-1 rounded-sm" onChange={handleChange} value={formData.hra} />
              Travel Alowance:
              <input type="number" id="ta" className="border p-1 rounded-sm" onChange={handleChange} value={formData.ta} />
              Special Alowance:
              <input type="number" id="sa" className="border p-1 rounded-sm" onChange={handleChange} value={formData.sa} />
              Medical Alowance:
              <input type="number" id="ma" className="border p-1 rounded-sm" onChange={handleChange} value={formData.ma} />
              Mediclaim:
              <input type="number" id="mpa" className="border p-1 rounded-sm" onChange={handleChange} value={formData.mpa} />
              Leave Travel Alowance:
              <input type="number" id="lta" className="border p-1 rounded-sm" onChange={handleChange} value={formData.lta} />
              PF Employee:
              <input type="number" id="pfempes" className="border p-1 rounded-sm" onChange={handleChange} value={formData.pfempes} />
          </div>
          </form>
          <div className="flex justify-center ">
          <button
            disabled={loading}
            onClick={handleUpdate}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-48'
          >
            {loading ? 'Loading...' : 'Update Employee'}
          </button>
        </div>
        {error && <p className='text-red-700 text-sm'>{error}</p>}
      </main>
      )}
    </main>
  );
}
