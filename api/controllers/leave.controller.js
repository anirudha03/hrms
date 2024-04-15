import Leave from "../models/leave.model.js"
import Employee from "../models/employee.model.js"
import { errorHandler } from "../utils/error.js";

export const addLeave = async (req, res, next) => {
    try {
        const leave = new Leave(req.body);
        await leave.save();
        return res.status(201).json(leave);
    } catch (error) {
        next(error);
    }
};

export const updateLeave = async (req, res, next) => {
    try {
        const leaveId = req.params.id;
        const updatedLeave = await Leave.findByIdAndUpdate(leaveId, req.body, { new: true });
        
        if (updatedLeave.status.toLowerCase() === "approved") {
            const employee = await Employee.findOne({ empid: updatedLeave.empRef });
            if (!employee) {
                return next(errorHandler(404, 'Employee not found!'));
            }
            employee.leave_balance -= updatedLeave.days;
            await employee.save();
        } else if (updatedLeave.status.toLowerCase() === "rejected") {
            const employee = await Employee.findOne({ empid: updatedLeave.empRef });
            if (!employee) {
                return next(errorHandler(404, 'Employee not found!'));
            }
            employee.leave_balance += updatedLeave.days; 
            await employee.save();
        }

        return res.status(200).json(updatedLeave);
        
    } catch (error) {
        next(error);
    }
};


export const getLeavesEmp = async (req, res, next) => {
    try {
        const empid = req.params.empid;
        const leaves = await Leave.find({ empRef: empid });

        if (!leaves) {
            return next(errorHandler(404, 'No leaves found for this employee ID!'));
        }
        // console.log(leaves)
        return res.status(200).json(leaves);
    } catch (error) {
        next(error);
    }
};
export const getLeave = async (req, res, next) => {
    try {
        const id = req.params.id;
        const leave = await Leave.findById(id);

        if (!leave) {
            return next(errorHandler(404, 'No leave found with this ID!'));
        }

        return res.status(200).json(leave);
    } catch (error) {
        next(error);
    }
};

export const getLeaves = async (req, res, next) => {
    try {
        const leaves = await Leave.find();

        return res.status(200).json(leaves);
    } catch (error) {
        next(error);
    }
};

export const deleteLeave = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedLeave = await Leave.findByIdAndDelete(id);

        if (!deletedLeave) {
            return next(errorHandler(404, 'No leave found with this ID!'));
        }

        return res.status(200).json({ message: 'Leave deleted successfully' });
    } catch (error) {
        next(error);
    }
};