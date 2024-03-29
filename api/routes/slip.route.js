import express from 'express';
import {addSlip,getSlips, getSlip, updateSlip, getEmpMonth} from '../controllers/slip.controller.js'
import { verifyToken, verifyTokenEmp } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/add-slip",verifyToken, addSlip); 
router.post("/update-slip/:empid/:month",verifyToken, updateSlip); 
router.get("/get-slip/:empid/:month",verifyToken , getSlip); 
router.get("/get-slip",verifyToken , getSlips); 
router.get('/getEmpMonth/:empid/:month',verifyToken,getEmpMonth);

export default  router;