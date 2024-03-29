import express from 'express';
import {addLeave,getLeaves, getLeavesEmp,getLeave, updateLeave, deleteLeave} from '../controllers/leave.controller.js'
import { verifyToken, verifyTokenEmp } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/add-leave",verifyTokenEmp, addLeave); 
router.get("/get-leaves",verifyToken , getLeaves); 
router.get("/get-leave/:id",verifyToken || verifyTokenEmp, getLeave); 
router.get("/get-leaves/:empid",verifyToken || verifyTokenEmp, getLeavesEmp); 
router.post("/update-leave/:id",verifyToken, updateLeave); 
router.delete("/delete-leave/:id",verifyToken, deleteLeave); 

export default router;