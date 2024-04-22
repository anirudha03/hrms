import Employee from "../models/employee.model.js";
import BankDetails from "../models/bank.model.js";
import Department from "../models/department.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const addEmployee = async (req, res, next) => {
  try {
    const {
      empid, fname, mname, lname, email, phone, aadhar, dob, address, home,
      bloodgroup, gender, mstatus, degree, post, department, bsalary, status,
      doj, passport, bonus_date, leave_balance, oneyear, password, hra, lta, ma, sa, pfempes, ta,
      pancard, accno, bank_name, ifsc, branch, holder_name
    } = req.body;

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new employee instance
    const employee = new Employee({
      empid, fname, mname, lname, email, phone, aadhar, dob, address, hometype: home,
      bloodgroup, gender, mstatus, degree, post, department, bsalary, status,
      doj, passport, bonus_date, leave_balance, oneyear, password: hashedPassword, hra, lta, ma, sa, pfempes, ta
    });

    // Save the employee to the database
    await employee.save();

    // Check if the employee exists before saving bank details
    const existingEmployee = await Employee.findOne({ empid });
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Create a new bank details instance
    const bankDetails = new BankDetails({
      pancard, accno, bank_name, ifsc, branch, empRef: empid, holder_name,
    });

    // Save the bank details to the database
    await bankDetails.save();

    // Return success response
    return res.status(201).json({ employee, bankDetails });
  } catch (error) {
    // Handle errors
    console.error('Error adding employee:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ empid: req.params.empid });
    if (!employee) {
      return next(errorHandler(404, 'Employee not found!'));
    }
    const { password, ...employeeWithoutPassword } = employee.toObject();
    res.status(200).json(employeeWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;

    // If password is being passed, hash it before updating
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      rest.password = hashedPassword;
    }

    const employee = await Employee.findOneAndUpdate(
      { empid: req.params.empid },
      rest,
      { new: true }
    );

    if (!employee) {
      return next(errorHandler(404, 'Employee not found!'));
    }

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().select('empid fname lname post department status doj bonus_date');
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmails = async (req, res, next) => {
  try {
    const employees = await Employee.find({}, 'empid email department gender');

    const emails = employees.map((employee) => ({
      empid: employee.empid,
      email: employee.email,
      department: employee.department,
      gender: employee.gender,
    }));

    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//----------------------------------------------------- bank details
export const addBankDetails = async (req, res, next) => {
  try {
      const bankDetailsData = req.body;
      const bankDetails = new BankDetails(bankDetailsData);
      await bankDetails.save();
      return res.status(200).json({ success: true, message: 'Bank details added successfully' });
  } catch (error) {
      return next(error);
  }
};

export const getBankDetails = async (req, res, next) => {
  try {
      const bankDetails = await BankDetails.find();
      return res.status(200).json({ success: true, data: bankDetails });
  } catch (error) {
      return next(error);
  }
};

export const getBankDetailsEmpId = async (req, res, next) => {
  try {
    const { empid } = req.params;
    const bankDetails = await BankDetails.findOne({ empRef: empid });

    if (!bankDetails) {
      return res.status(404).json({ success: false, message: 'Bank details not found for this employee ID' });
    }
    return res.status(200).json({ success: true, data: bankDetails });
  } catch (error) {
    next(error);
  }
};

export const updateBankDetails = async (req, res, next) => {
  try {
      const { empid } = req.params; 
      const bankDetailsData = req.body;
      const updatedBankDetails = await BankDetails.findOneAndUpdate({ empRef: empid }, bankDetailsData, { new: true });
      if (!updatedBankDetails) {
          return res.status(404).json({ success: false, message: 'Bank details not found' });
      }
      return res.status(200).json({ success: true, message: 'Bank details updated successfully', data: updatedBankDetails });
  } catch (error) {
      return next(error);
  }
};

// Department crud
export const addDep = async(req,res,next)=>{
  try{
    const departmentData = req.body;
      const department = new Department(departmentData);
      await department.save();
      return res.status(200).json({ success: true, message: 'Department added successfully' });
  }catch(error){
    return next(error)
  }
}

export const getDep = async (req, res, next) => {
  try {
      const department = await Department.find();
      return res.status(200).json({ success: true, data: department });
  } catch (error) {
      return next(error);
  }
};

export const deleteDep = async (req, res, next) => {
  try {
    const departmentId = req.params.id;
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);
    if (!deletedDepartment) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    return res.status(200).json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

//Ani@9902