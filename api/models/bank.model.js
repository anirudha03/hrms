import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bankDetailsSchema = new Schema({
    pancard: {
        type: String,
        required: true,
        unique: true
    },
    accno: {
        type: String,
        required: true,
    },
    bank_name: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    branch: String,
    empRef: {
        type: String,
        required: true
    },
    holder_name:{
        type: String,
    }
}, {timestamps:true});

const BankDetails = model('BankDetails', bankDetailsSchema);

export default BankDetails;
