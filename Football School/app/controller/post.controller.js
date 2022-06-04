const postModel =require("../database/models/post.models")
class Post{
    static add =async(req,res)=>{
        try {
            // const invalidEdits = ["password", "tokens", "status", "__v", "updatedAt"]
            // for (const property in req.body) {
                // if (!invalidEdits.includes(property))
                    // req.user[property] = req.body[property]
            // }
            const postData=new postModel({
                ...req.body, userId:req.user._id,
            })
            await postData.save()
            res.status(200).send({
                apiStatus: true,
                data: {postData,userId:req.user._name,userId:req.user_email},
                message: "post added"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "user adding error"
            })
        }
    }
    static all =async(req,res)=>{
        try {
            const posts = await postModel.find()
            res.status(200).send({
                apiStatus: true,
                data: posts,
                message: "data loading players"
            })

        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "erorr undefid data players"
            })
        }
    }
    static myPosts =async(req,res)=>{
        try {
            const posts = await postModel.find({userId: req.user._id})
            res.status(200).send({
                apiStatus: true,
                data: {posts, user:req.user},
                message: "data loading players"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "erorr undefid data players"
            })
        }
    }
    static myPostsWithVirtual =async(req,res)=>{
        try {
            await req.user.populate("myPosts")
            res.status(200).send({
                apiStatus: true,
                data: {posts:req.user.myPosts,user:req.user },
                message: "data loading players"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "erorr undefid data players"
            })
        }
    }

}
module.exports=Post