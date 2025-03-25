import express from 'express';
import {getLeaveBalance, signin, signOut, viewData} from '../controllers/employeeAuth.controller.js'
import { getLeavesEmp } from '../controllers/leave.controller.js';
import {getSlipsEmp} from '../controllers/slip.controller.js'
import { getSlip } from '../controllers/slip.controller.js';
import { verifyTokenEmp } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/signin", signin); 
router.get('/signout', signOut);
router.get("/viewdata/:empid", viewData)
router.get("/emp-leaves/:empid", getLeavesEmp)
router.get("/emp-slips/:empid", getSlipsEmp)
// router.get("/get-slip/:empid/:month",verifyTokenEmp, getSlip); 
router.post('/getLeaveBalance', getLeaveBalance)

export default router;