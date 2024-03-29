
import Slip from '../models/slip.model.js';
import Employee from '../models/employee.model.js';
import Leave from '../models/leave.model.js';

export const addSlip = async (req, res) => {
    const { empRef, month, ename, des, djoin, bsal, hra, ta, sa, ma, lta, totearn, ptax, pfemper, pfempes, totded, totsal, al, lt, td, bl, doi } = req.body;

    const newSlip = new Slip({ empRef, month, ename, des, djoin, bsal, hra, ta, sa, ma, lta, totearn, ptax, pfemper, pfempes, totded, totsal, al, lt, td, bl, doi });

    try {
        const savedSlip = await newSlip.save();
        res.status(201).json(savedSlip); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};

export const getSlip = async (req, res) => {
    try {
        const { empid, month } = req.params;
        const slip = await Slip.findOne({ empRef: empid, month: month });

        if (!slip) {
            return res.status(404).json({ message: "Salary slip not found" });
        }

        res.status(200).json(slip); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const getSlips = async (req, res) => {
    try {
        const slips = await Slip.find();
        res.status(200).json(slips); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSlip = async (req, res) => {
    try {
        const { empid, month } = req.params;
        const updateFields = req.body;

        const updatedSlip = await Slip.findOneAndUpdate({ empRef: empid, month: month }, updateFields, { new: true });

        if (!updatedSlip) {
            return res.status(404).json({ message: "Salary slip not found" });
        }

        res.status(200).json(updatedSlip); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const getEmpMonth = async (req, res) => {
    try {
        const { empid, month } = req.params;

        // Retrieve employee information
        const employee = await Employee.findOne({ empid });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Retrieve leaves for the specified month with status "approved"
        const leaves = await Leave.find({ empRef: empid, month, status: "approved" });

        // Calculate total leave days for the month
        let totalDays = 0;
        leaves.forEach(leave => {
            totalDays += leave.days;
        });

        // Combine employee information and total days
        const result = {
            empid: employee.empid,
            fname: employee.fname,
            lname: employee.lname,
            doj: employee.doj,
            post: employee.post,
            bsalary: employee.bsalary,
            month: month,
            totalDays: totalDays,
            balance: employee.leave_balance,
            against_balance: leaves.against_balance,
        };

        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
