const express=require("express")
const cors=require("cors")
const connect = require('./db/connect');
const employeeRouter=require("./routes/employeeRoute")
const formRouter=require("./routes/formRoute")
const app=express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send(" it's Home page ...")
})

app.use("/Employee",employeeRouter)
app.use("/Form",formRouter)



connect()
.then(() => {
    app.listen(3000, () => {
        console.log('Server listening at http://localhost:3000')
    });
})