const express=require("express")
const {registerStudent, getAllForm, getAllClaimedForm, getAllUnclaimedForm, claimForm}=require("../controllers/formController")
const auth=require("../middlewares/auth.js") 
const router=express.Router()

router.post("/registerform",registerStudent)
router.get("/getform",auth,getAllForm)
router.get("/getclaimedform",auth,getAllClaimedForm)
router.get("/getunclaimedform",auth,getAllUnclaimedForm)
router.patch("/claimform/:id",auth,claimForm)

module.exports=router