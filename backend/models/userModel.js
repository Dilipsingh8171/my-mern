import mongoose from "mongoose";


const userSchema = mongoose.Schema({

    name: {
        type: String,
        reuired: [true, "Name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },

    password: {
        type: String,
        reuired: [true, "password is required"]
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
    }


}, { timestamps: true })


export default mongoose.model("users", userSchema)

