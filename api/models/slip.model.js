import mongoose from 'mongoose';

const { Schema } = mongoose;

const salarySlipSchema = new Schema({
  empRef: { type: String, required: true },
  month: { type: String, required: true },
  ename: { type: String, default: null },
  des: { type: String, default: null },
  djoin: { type: String, default: null },
  bsal: { type: Number, default: null },
  hra: { type: Number, default: null },
  ta: { type: Number, default: null },
  sa: { type: Number, default: null },
  ma: { type: Number, default: null },
  mpa: { type: Number, default: null },
  lta: { type: Number, default: null },
  totearn: { type: Number, default: null },
  ptax: { type: Number, default: null },
  pfemper: { type: Number, default: null },
  pfempes: { type: Number, default: null },
  totded: { type: Number, default: null },
  totsal: { type: Number, default: null },
  al: { type: Number, default: null },
  lt: { type: Number, default: null },
  td: { type: Number, default: null },
  bl: { type: Number, default: null },
  el: { type: Number, default: null },
  against_balance: { type: Number, default: 0 },
  doi: { type: String, default: null }
});

salarySlipSchema.index({ empRef: 1, month: 1 }, { unique: true });

const Slip = mongoose.model('Slip', salarySlipSchema);

export default Slip;
