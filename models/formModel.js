const mongoose=require("mongoose");
const formSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter your name"],
      
     
    },
    email:{
        type:String,
        require:[true,"Please enter email"],
        unique:true
    },
    courseInterest:{
        type:String,
        require:[true,"Please enter your Course Interest"],
      },
      claimed:{
        type: Boolean,
        default: false
      },
      claimedBy:{
        type:String,
        default:null
      },
      employeeEmailId:{
        type:String,
        default:null
      }
})
const Form=mongoose.model("form",formSchema)
module.exports=Form