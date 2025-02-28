import express from 'express';
import {addSlip,getSlips, getSlip, updateSlip, getEmpMonth, deleteSlip} from '../controllers/slip.controller.js'
import { verifyToken, verifyTokenEmp } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/add-slip",verifyToken, addSlip); 
router.post("/update-slip/:empid/:month",verifyToken, updateSlip); 
router.get("/get-slip/:empid/:month" , getSlip); 
router.get("/get-slip",verifyToken , getSlips); 
router.get('/getEmpMonth/:empid/:month',verifyToken,getEmpMonth);
router.delete("/delete-slip/:empid/:month", verifyToken, deleteSlip);


export default  router;