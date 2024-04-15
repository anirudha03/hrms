import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const employeeSchema = new Schema({
    empid: {
        type: String,
        required: true,
        unique: true
    },
    fname: String,
    mname: String,
    lname: String,
    email: String,
    phone: String,
    aadhar: String,
    dob: String,
    address: String,
    hometype: String,
    bloodgroup: String,
    gender: String,
    mstatus: String,
    degree: String,
    post: String,
    department: String,
    bsalary: Number,
    status: String,
    doj: String,
    passport: String,
    bonus_date: String,
    leave_balance: Number,
    oneyear: String,
    password: String,
    avatar: {
        type: String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    hra: { type: Number, default: null },
    ta: { type: Number, default: null },
    sa: { type: Number, default: null },
    ma: { type: Number, default: null },
    lta: { type: Number, default: null },
    pfempes: { type: Number, default: null },
}, {timestamps:true});

const Employee = model('Employee', employeeSchema);

export default Employee;
