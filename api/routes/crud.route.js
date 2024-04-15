import express from 'express';
import {addEmployee,getEmployee,updateEmployee, getEmployees, updateBankDetails, getBankDetailsEmpId, getBankDetails, getEmails} from '../controllers/crud.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/add",verifyToken, addEmployee); 
router.get("/get",verifyToken, getEmployees); 
router.get("/get/:empid",verifyToken, getEmployee); 
router.post("/update/:empid",verifyToken, updateEmployee); 
router.post("/update-bank/:empid",verifyToken, updateBankDetails); 
router.get("/get-bank/:empid",verifyToken, getBankDetailsEmpId);
router.get("/get-bank",verifyToken, getBankDetails);
router.get("/get-email", verifyToken, getEmails)
// router.post("/signin", signin);
// router.get('/signout', signOut);

export default router;
