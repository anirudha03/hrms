import express from 'express';
import {signup, signin, signOut, getStorageStats} from '../controllers/adminAuth.controller.js'

const router = express.Router();

router.post("/signup", signup); //the second signup is the function imported from controller 
router.post("/signin", signin); 
router.get("/signout", signOut);
router.get("/storage-stats", getStorageStats)


export default router; 