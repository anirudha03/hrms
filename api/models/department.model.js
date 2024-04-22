import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const DepartmentSchema = new Schema({
    department: {
        type: String,
        required: true
    }
});
const Department = model('Department', DepartmentSchema);
export default Department;
