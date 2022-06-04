const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        tirm: true,
        required: [true, "required name"],
    },
    email: {
        type: String,
        tirm: true,
        required: [true, "email address is required"],
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("invalid email adderss")
        }

    },
    password: {
        type: String,
        tirm: true,
        required: [true, "required password"],
        // match

    },
    phone: {
        type: String,
        tirm: true,
        required: [true, "required name"],
        validate(value) {
            if (!validator.isMobilePhone(value, 'ar-EG')) throw new Error("invalid mobile number")
        }
    },
    age: {
        type: Number,
        min: 5,
        max: 30
    },
    gender: {
        type: String,
        tirm: true,
        required: [true, "required name"],
        enum: ['male', 'female'],

    },
    status: {
        type: Boolean,
        default: false,

    },
    image: {
        type: String,
        tirm: true,
    },

    tokens: [{
        token: {
            type: String,
            trim: true,
            required: true
        }
    }]


}, {
    timestamps: true
})
userSchema.virtual('myPosts',{
    ref:"Posts",
    localField:"_id",
    foreignField:"userId"
})
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user

}
userSchema.pre("save", async function () {
    const userData = this
    if (userData.isModified("password"))
        userData.password = await bcrypt.hash(userData.password, 10)
})
userSchema.statics.loginUser = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("invaled email")
    const isValid = await user.checkPass(password)
    if (!isValid) throw new Error("invalid password")
    return user
}
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat( {token} )
    await user.save()
    return token

}
userSchema.methods.checkPass = async function (current){
    user = this
    const isValid = await bcrypt.compare(current, user.password)
    return isValid  
}
const User = mongoose.model("User", userSchema)
module.exports = User