import Leave from "../models/leave.model.js";
import Employee from "../models/employee.model.js";
import moment from 'moment';


// Function to execute leave deduction logic
const executeLeaveDeductionLogic = async () => {
    // Get the current date
    // const currentDate = '2024-04-06'
    const currentDate = moment().format('YYYY-MM-DD');

    // Find leave requests with toDate matching the current date and status "approved"
    const leaveRequests = await Leave.find({ toDate: currentDate, status: 'approved' });

    // Iterate over the leave requests
    for (const leaveRequest of leaveRequests) {
        try {
            // Find the corresponding employee
            const employee = await Employee.findOne({ empid: leaveRequest.empRef });

            // If employee exists
            if (employee) {
                // Deduct leave balance
                employee.leave_balance -= leaveRequest.days;

                // Update the employee's leave balance
                await employee.save();
            }
        } catch (error) {
            console.error('Error updating leave balance:', error);
        }
    }
};

export default executeLeaveDeductionLogic;
