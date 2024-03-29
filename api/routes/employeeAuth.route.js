import express from 'express';
import {signin, signOut, viewData} from '../controllers/employeeAuth.controller.js'

const router = express.Router();

router.post("/signin", signin); 
router.get('/signout', signOut);
router.get("/viewdata/:empid", viewData)

export default router;