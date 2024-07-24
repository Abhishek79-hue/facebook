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
        return res.status(200).send({message:"Post Sucessfully Added"})
    } catch (error) {
        console.log("error dsfdsf")
    }
}

const FileUpload=async(req,res)=>{
    try {
        if(!req.file){
            return res.status(404).send({message:"No File Uploaded"})
        }else{
            return res.status(200).json(req.file).send({message:"Image Sucessfully Uploaded"})
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
const getAll = async (req, res) => {
    try {
        // Get query parameters with default values
        const limit = parseInt(req.query.limit) || 10;
        const start = parseInt(req.query.start) || 0;
        const orderBy = parseInt(req.query.orderBy) || 1; // 1 for ascending, 0 for descending

        // Validate parameters
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).send({ message: "Invalid limit parameter" });
        }
        if (isNaN(start) || start < 0) {
            return res.status(400).send({ message: "Invalid start parameter" });
        }

        // Determine the sort order
        const sortOrder = orderBy === 1 ? 'createdAt' : '-createdAt'; // Ascending or descending

        // Calculate the number of documents to skip
        const skip = start;

        // Fetch total count of documents
        const total = await FaceBook.countDocuments();

        // Fetch posts with pagination and sorting
        const posts = await FaceBook.find()
            .sort(sortOrder) // Apply the sorting order
            .skip(skip)      // Skip the specified number of documents
            .limit(limit);   // Limit the number of documents returned

        // Send success response       
        return res.status(200).send({
            message: "All posts fetched successfully",
            total,
            posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return res.status(500).send({
            message: "An error occurred while fetching posts",
            error: error.message
        });
    }
};

module.exports={createPost,FileUpload,updateFbPost,deletePost,getPost,getAll}