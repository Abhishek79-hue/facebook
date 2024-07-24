const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyPaser=require("body-parser")
const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}));


const FbRouter=require("./FbRouter/Routes")
const Port=1200
const DB_URL="mongodb://localhost:27017/Facebook-Timeline"

app.use("/api",FbRouter)

mongoose.connect(DB_URL).then(app.listen(Port,()=>{
    console.log(`DB Sucessfully Connected\nServer listen at Port ${Port}`)
})).catch((error)=>{
    console.log("error")
})