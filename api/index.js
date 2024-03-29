import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from "path"

import adminAuthRouter from './routes/adminAuth.route.js'; //for admin
import employeeAuthRouter from './routes/employeeAuth.route.js'; //for employee
import crudRouter from './routes/crud.route.js'; //for CRUD operations
import leaveRouter from './routes/leave.route.js'; //for leave operations
import slipRouter from './routes/slip.route.js'; //for salary slip operations

dotenv.config();
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(async () => {
    console.log("Connected to the database");
    try {
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        for (const { name } of collections) {
            const stats = await db.command({ collStats: name });
            console.log(`Storage consumed in collection '${name}': ${stats.size} bytes`);
        }
    } catch (error) {
        console.error('Error retrieving database statistics:', error);
    } 
}).catch((err)=>{
    console.log('Error connecting to the database:', err);
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

app.use("/api/admin-auth", adminAuthRouter);
app.use("/api/employee-auth", employeeAuthRouter);
app.use("/api/crud", crudRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/slip", slipRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => { // Error handling middleware
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});

//employees: 728*40
//admin: 201
//bank: 188*40