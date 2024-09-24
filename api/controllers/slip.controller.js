
import Slip from '../models/slip.model.js';
import Employee from '../models/employee.model.js';
import Leave from '../models/leave.model.js';

export const addSlip = async (req, res) => {
    const { empRef, month, ename, des, djoin, bsal, hra, ta, sa, ma, mpa, lta, totearn, ptax, pfemper, pfempes, totded, totsal, al, lt, td, bl, el, doi, npd } = req.body;
    
    const newSlip = new Slip({ empRef, month, ename, des, djoin, bsal, hra, ta, sa, ma, mpa, lta, totearn, ptax, pfemper, pfempes, totded, totsal, al, lt, td, bl, el, doi, npd });

    try {
        const savedSlip = await newSlip.save();
        
        const employee = await Employee.findOne({ empid: empRef });
        if (employee) {
            const updatedLeaveBalance = employee.leave_balance + al; 
            await Employee.updateOne({ empid: empRef }, { leave_balance: updatedLeaveBalance });
            const { oneyear } = employee;
            console.log("oneyear:", oneyear);
        } else {
            throw new Error('Employee not found');
        }

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

export const getSlipsEmp = async (req, res) => {
    const empid = req.params.empid; 
    try {
        const slips = await Slip.find({ empRef: empid });
        // console.log(slips)
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

        const [year, monthStr] = month.split('-');
        const monthNumber = parseInt(monthStr);

        let prevMonthNumber = monthNumber - 1;
        let prevYear = year;

        if (prevMonthNumber === 0) {
            prevMonthNumber = 12;
            prevYear = parseInt(year) - 1;
        }
        const prevMonth = `${prevYear}-${prevMonthNumber.toString().padStart(2, '0')}`;

        const employee = await Employee.findOne({ empid });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const leaves = await Leave.find({ empRef: empid, month: prevMonth, status: "approved" });

        let totalDays = 0;
        let againstBalance = 0; // Initialize against_balance
        leaves.forEach(leave => {
            totalDays += leave.days;
            againstBalance += leave.against_balance || 0; // Add against_balance
        });

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
            against_balance: againstBalance, 
            hra: employee.hra,
            lta: employee.lta,
            ta: employee.ta,
            ma: employee.ma,
            mpa: employee.mpa,
            sa: employee.sa,
            pfempes: employee.pfempes,
            bonus_date: employee.bonus_date,
        };

        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
