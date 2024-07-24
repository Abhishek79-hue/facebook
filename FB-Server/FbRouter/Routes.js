const FbController=require("./../Controller/FbController")
const Upload=require("../Middleware/multerMiddleWare")
const express=require("express")
const Router=express()

Router.route("/post").post(Upload.single("background"),FbController.createPost)
Router.route("/uplaod/image").post(Upload.single("background"),FbController.FileUpload)
Router.route("/post").put(Upload.single("background"),FbController.updateFbPost)
Router.route("/post").get(FbController.getPost)
Router.route("/post").get(FbController.getAll)
Router.route("/post").delete(FbController.deletePost)

module.exports=Router;