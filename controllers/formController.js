const Form=require("../models/formModel")
const asyncHandler=require("express-async-handler")
const Employee=require("../models/employeeModel")
// register form Students
const registerStudent=asyncHandler(
    async(req,res)=>{
        const {email,name,courseInterest,claimed}=req.body
        if(!email || !name || !courseInterest){
            res.status(400).json({message:"fill all the required fields",status:"400"})
        }
        
        const formExists=await Form.findOne({email})
        if(formExists){
            res.status(400).json({message:"Form is already been submitted",status:"400"})
        }
        const form=await Form.create({
            email,name,courseInterest,claimed
        })
        if(form){
            const{_id,email,name,courseInterest, claimed, claimedBy}=form
            res.status(201).json({
                _id,email,name,courseInterest, claimed, claimedBy
                })
        }
        else{
            res.status(400).json({message:"Invalid form data",status:"400"})
          
          }
    }
)



const getAllForm=asyncHandler(async(req,res)=>{
    const forms=await Form.find()
    if(forms){
        res.send(forms)
    }else{
        res.status(400)
        throw new Error ("forms not found")
       }
})

//get all claimed forms
const getAllClaimedForm=asyncHandler(async(req,res)=>{
    const forms=await Form.find()
    const claimedForms=forms.filter(obj => obj.claimed === true)
    if( claimedForms){
        res.send( claimedForms)
    }else{
        res.status(400)
        throw new Error ("claimed forms not found")
       }
})

//get all unclaimed forms
const getAllUnclaimedForm=asyncHandler(async(req,res)=>{
    const forms=await Form.find()
    const unclaimedForms=forms.filter(obj => obj.claimed === false)
    if( unclaimedForms){
        res.send( unclaimedForms)
    }else{
        res.status(400)
        throw new Error ("unclaimed forms not found")
       }
})


const claimForm=asyncHandler(async(req,res)=>{
    const employee=await Employee.findById(req.employee._id)
   
    const {id}=req.params
    const form=await Form.findById(id)
    if(form){
        const {name,email,courseInterest,claimed,claimedBy,employeeEmailId}=form
        form.email=email,
        form.name=name,
        form.courseInterest=courseInterest,
        form.claimed=true,
        form.claimedBy=employee._id
        form.employeeEmailId=employee.email
        const updatedForm=await form.save()
        res.status(200).json({
            employee_id:updatedForm._id
        })
}else{
    res.status(404)
    throw new Error ("form not found here")
  }

})

module.exports={registerStudent,getAllForm,getAllClaimedForm,getAllUnclaimedForm,claimForm}
