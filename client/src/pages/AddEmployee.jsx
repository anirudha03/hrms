import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
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
    home: "rent",
    bloodgroup: "",
    gender: "male", // Default value set to 'Male'
    mstatus: "single", // Default value set to 'Single'
    degree: "",
    post: "",
    department: "",
    bsalary: 0, // Default value set to 51000
    status: "active", // Default value set to 'Active'
    doj: "",
    passport: "",
    bonus_date: "",
    leave_balance: 0, // Default value set to 0
    oneyear: "0", // Default value set to '0' as a string
    password: "",
    pancard: "",
    accno: "",
    bank_name: "",
    ifsc: "",
    branch: "",
    holder_name:"",
    hra:0,
    lta:0,
    ta:0,
    ma:0,
    sa:0,
    pfempes:0,    
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleChange = (e) => {
    if (e.target.id === "male" || e.target.id === "female") {
      setFormData({
        ...formData,
        gender: e.target.id,
      });
    }
    if (e.target.id === "permanent" || e.target.id === "rent") {
      setFormData({
        ...formData,
        home: e.target.id,
      });
    }
    if (e.target.id === "married" || e.target.id === "single") {
      setFormData({
        ...formData,
        mstatus: e.target.id,
      });
    }
    if (e.target.id === "active" || e.target.id === "inactive" || e.target.id === "resigned") {
      setFormData({
        ...formData,
        status: e.target.id,
      });
    }
    if (
        e.target.type === 'number' ||
        e.target.type === 'text' ||
        e.target.type === 'textarea'
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    else if (e.target.type === "date") {
        // Convert date to YYYY-MM-DD format
        const formattedDate = e.target.valueAsDate
          ? e.target.valueAsDate.toISOString().split("T")[0]
          : "";
        setFormData({
          ...formData,
          [e.target.id]: formattedDate,
        });
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/crud/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData
            }),
          });
          const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }else{
        alert("employee successfully added")
      }
      navigate(`/home`);
    }
    catch (error) {
        setError(error.message);
        setLoading(false);
    }
    console.log(formData);
  };

  return (
    <main className="p-1 max-w-4xl mx-auto">
      {/* <h1 className="text-3xl font-semibold text-center my-2">Add Employee</h1> */}
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
              <input type='checkbox'id='permanent'className='w-5'onChange={handleChange}checked={formData.home === 'permanent'}/>
              <span>Permanent</span>
              <input type='checkbox'id='rent'className='w-5'onChange={handleChange}checked={formData.home === 'rent'}/>
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
            <input type="text" id="department" className="border p-1 rounded-sm" onChange={handleChange} value={formData.department} />
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
            Date of Bonus:
            <input type="date" id="bonus_date" className="border p-1 rounded-sm" onChange={handleChange} value={formData.bonus_date} />
            Leave Balance:
            <input type="number" id="leave_balance" className="border p-1 rounded-sm" onChange={handleChange} value={formData.leave_balance} />
            Password:
            <input type="text" id="password" className="border p-1 rounded-sm" onChange={handleChange} value={formData.password} />

            Pancard No.:
            <input type="text" id="pancard" className="border p-1 rounded-sm" onChange={handleChange} value={formData.pancard}/>
            Account Number:
            <input type="text" id="accno" className="border p-1 rounded-sm" onChange={handleChange} value={formData.accno}/>            
            Bank Name:
            <input type="text" id="bank_name" className="border p-1 rounded-sm" onChange={handleChange} value={formData.bank_name}/>
            Branch Name:
            <input type="text" id="branch" className="border p-1 rounded-sm" onChange={handleChange} value={formData.branch}/>
            IFSC code:
            <input type="text" id="ifsc" className="border p-1 rounded-sm" onChange={handleChange} value={formData.ifsc}/>    
            Account Holder Name:
            <input type="text" id="holder_name" className="border p-1 rounded-sm" onChange={handleChange} value={formData.holder_name}/>    


            house and rental allowance:
            <input type="number" id="hra" className="border p-1 rounded-sm" onChange={handleChange} value={formData.hra} />
            Travel Alowance:
            <input type="number" id="ta" className="border p-1 rounded-sm" onChange={handleChange} value={formData.ta} />
            Special Alowance:
            <input type="number" id="sa" className="border p-1 rounded-sm" onChange={handleChange} value={formData.sa} />
            Medical Alowance:
            <input type="number" id="ma" className="border p-1 rounded-sm" onChange={handleChange} value={formData.ma} />
            Leave Travel Alowance:
            <input type="number" id="lta" className="border p-1 rounded-sm" onChange={handleChange} value={formData.lta} />
            PF Employee:
            <input type="number" id="pfempes" className="border p-1 rounded-sm" onChange={handleChange} value={formData.pfempes} />      
        </div>
        </form>
        <div className="flex justify-center ">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-48'
        >
          {loading ? 'Loading...' : 'Add Employee'}
        </button>
      </div>
      {error && <p className='text-red-700 text-sm'>{error}</p>}
    </main>
  );
}
