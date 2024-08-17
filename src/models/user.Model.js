import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
       type: String,
       required: [true, "Please provide an email"],
       unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide an email"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

//Nextjs is edge time framework , check first this model is present or not in db
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User; 