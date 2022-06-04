const express = require("express")
const path = require("path")
const app = express()
 const cors = require("cors")

require('dotenv').config()
require("./database/connect")
const userRoutes = require("../routes/user.routes")
const psotRoutes = require("../routes/post.routes")
// const { request } = require("http")
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user',userRoutes)
app.use('/post',psotRoutes)
app.all("*",(req,res)=>{ res.status(404).send({ error:"invalid url segment",  apiStautus: false })
})
module.exports=app