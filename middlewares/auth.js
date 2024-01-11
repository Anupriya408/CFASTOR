const jwt = require("jsonwebtoken")

const asyncHandler = require("express-async-handler")
const Employee = require("../models/employeeModel")

const authorisation=asyncHandler(async (req,res,next)=>{
    try{
        // const token = req.headers?.auth?.split(" ")[1]
        const token = req.headers?.auth;
        if(!token){
            res.status(404)
            throw new Error("Not authorized,Again Please login")
        }
    
        const verified=jwt.verify(token,process.env.JWT_SECRET)
    
       
        const employee= await Employee.findById(verified.id).select("-password")
    
        if(!employee){
            res.status(404)
            throw new Error("employee not found.")
        }
        req.employee=employee
        next()
    
    } catch (err){
        res.status(404)
        throw new Error("Please login")
    }
    })

module.exports = authorisation
