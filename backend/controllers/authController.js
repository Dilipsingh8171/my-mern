import userModel from "../models/userModel.js"
import { hashPassword, comparePassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken"

//register controller
export const registerController = async (req, res) => {

    try {
        const { name, password, email, phone, address, answer } = req.body
        //validations
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone no is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is Required' })
        }
        //check user
        const existinguser = await userModel.findOne({ email })

        //existing user
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "User Already Registered please Register with new email",

            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, password: hashedPassword, email, phone, address, answer }).save()
        return res.status(201).send({
            success: true,
            message: "User Succesfully Registered",
            user,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in register Controller",
            error,
        })
    }

}

//Login controller method post
export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body

        //validation
        if (!email || !password) {

            return res.status(404).send({
                succes: false,
                message: 'Please Enter Email or Password',
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                message: "Email is not Registered",
                succes: false,


            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                succes: false,
                message: "Invalid Password",
            })
        }


        //token

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })
        console.log(token)

        res.status(200).send({
            succes: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            message: "error in logincontroller",
            error,
            success: false
        })
    }


}

//fogot-paasword
export const forgotPasswordController = async (req, res) => {
    try {

        const { email, answer, newPassword } = req.body

        if (!email) {
            return res.status(400).send({ message: 'Email is Required' })
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is Required' })
        }
        if (!newPassword) {
            return res.send({ message: 'newPassword is Required' })
        }

        //check Email or answer

        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Passwrod"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }

}


//test cotroller
export const testController =async (req, res) => {
    try {
        res.send("protected route chala badi muskhil se")
        console.log("okkkk")
    } catch (error) {
        console.log(error)
        res.send({ error })
    }
}
//protected route
