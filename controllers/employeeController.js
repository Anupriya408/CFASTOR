const Employee=require("../models/employeeModel")
const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerEmployee=asyncHandler(
    async(req,res)=>{
        const {email,password}=req.body
        if(!email || !password){
            res.status(400).json({message:"Please fill all the fields",status:"400"})
        }
        if(password.length<5){
            res.status(400).json({message:"Password must be 5 characters",status:"400"})
        }
        const employeeExists=await Employee.findOne({email})
        if(employeeExists){
            res.status(400).json({message:"Email is already registered",status:"400"})
        }
        const employee=await Employee.create({
            email,
            password
        })
        if(employee){
            const{_id,email}=employee
            res.status(201).json({
                _id,email
                })
        }
        else{
            res.status(400).json({message:"Invalid user data",status:"400"})
          
          }
    }
)

const loginEmployee=asyncHandler(async (req,res)=>{
    const {email,password}=req.body


    if(!email || !password){
      res.status(400).json({message:"Please enter email and password",status:400})
      
    }
  
    
    const employee =await Employee.findOne({email})
    console.log("employee",employee);

    if(!employee){
      res.status(400).json({message:"Employee not found, request to signup",status:400})
     
    }
 
  
    const passwordIsCorrect = password === employee.password;
  
  console.log("generating token");
  const token=generateToken(employee._id);
  console.log("generated");


  
    if(employee && passwordIsCorrect){
      const{_id,email}=employee
      res.status(200).json({
          _id,email,token
      })
    }else{
      res.status(400).json({message:"Invalid email or password",status:400})
     
    }
  
  })

  module.exports={registerEmployee,loginEmployee}