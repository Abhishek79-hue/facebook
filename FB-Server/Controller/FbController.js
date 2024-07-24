const { json } = require("body-parser")
const FaceBook=require("./../Model/FbModel")

const createPost=async(req,res)=>{
    try {
        const {post}=req.body
        if(req.file){
            var image=req.file.filename
        }
        const faceBook=new FaceBook({
            post:post,
            background:image
        })
        await faceBook.save()
        return res.status(200).json(faceBook)
    } catch (error) {
        console.log("error dsfdsf")
    }
}

const FileUpload=async(req,res)=>{
    try {
        if(!req.file){
            return res.status(404).send({message:"No File Uploaded"})
        }else{
            res.json({ message: 'File uploaded successfully', filename: req.file.filename });
        }
    } catch (error) {
        console.log("error")
    }
}
const updateFbPost=async(req,res)=>{
   try {
    const userId=req.query.id
    const update = { ...req.body };

    if (req.file) {
        update.background = req.file.filename;
    }
    const faceBook=await FaceBook.findByIdAndUpdate({_id:userId},update,{new:true})
    return res.status(200).send({message:"Post Sucessfully Upadated",data:faceBook})
   } catch (error) {
    console.log("Error")
   }
}
const getPost=async(req,res)=>{
    try {
        const userId=req.query.id
        const faceBook=await FaceBook.findById({_id:userId})
        return res.status(200).send({message:"Post Sucessfully find",data:faceBook})
    } catch (error) {
        console.log("error")
    }
}
const deletePost=async(req,res)=>{
    try {
        const userId=req.query.id
        await FaceBook.findByIdAndDelete({_id:userId})
        return res.status(200).send({message:"post sucessfully deleted"})
    } catch (error) {
       console.log("error") 
    }
}
const getAll=async(req,res)=>{
    try {
        const total=await FaceBook.countDocuments()

        const limit=parseInt(req.query.limit)|| 10;
        const start=parseInt(req.query.start)|| 1;
        const orderBy=parseInt(req.query.orderBy)
        const skip=(start-1)*limit
        
        const sorted=orderBy===1? 'createdAt: 1':'createdAt: -1'
         
        const posts=await FaceBook.find({})
        .sort({sorted})
        .skip(skip)
        .limit(limit)
     return res.status(200).send({message:"All post get Successfully",posts})
    } catch (error) {
        console.log("error")
    }
}

module.exports={createPost,FileUpload,updateFbPost,deletePost,getPost,getAll}