import Employee from "../models/employee.model.js";
import moment from 'moment';

export async function autobonus() {
    try {
        const currentDate = moment().startOf('day');
        // console.log('Current Date:', currentDate.format('YYYY-MM-DD'));

        const employees = await Employee.find({ oneyear: 0 });

        for (const employee of employees) {
            const bonusDate = moment(employee.bonus_date).startOf('day');
            // console.log(`Bonus Date for Employee ID ${employee.empid}:`, bonusDate.format('YYYY-MM-DD'));
            
            if (currentDate.isSameOrAfter(bonusDate)) {
                employee.leave_balance += 12;
                employee.oneyear = 1;
                const updatedEmployee = await employee.save();
                console.log(`Employee ID ${updatedEmployee.empid} updated. Leave balance increased to ${updatedEmployee.leave_balance}, oneyear set to ${updatedEmployee.oneyear}`);
            }
        }

        // console.log('Autobonus processed successfully');
    } catch (error) {
        console.error('Error processing autobonus:', error);
    }
}
