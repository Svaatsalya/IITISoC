import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


//Generate a token jwt
const generateToken = (userId) => {
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn: '7d'})
}

export const registerUser = async (req,res) => {
    try{
        const{name,email,password} = req.body;
        console.log("Request Body:", req.body); // ✅ Add this log

        //To Check if user already exists
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must be atleast of 8 characters"})
        }

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)

        //Create A User
        const user = await User.create({
            name,
            email,
            password:hashedpassword
        })

         console.log("User Created:", user); // ✅ Add this log

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })

    }

    catch (error){
            console.error("Registration Error:", error); // ✅ Add this
             res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
    
}

//login function
export const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(500).json({message: "Invalid email or password"})
        }

        //compare the password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
             return res.status(500).json({message: "Invalid email or password"})

        }

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }
   catch (error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }


}

//GetUser profile function

export const getUserProfile = async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json(user)
    }
     catch (error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
     }
}