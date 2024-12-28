import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req,res) =>{
    try {
        const {fullname,email,password,role} = req.body;
        if(!fullname || !email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist with this mail",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            password:hashedPassword,
            role,
            file:cloudResponse.secure_url
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req,res) => {
    try {
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        if(role!==user.role){
            return res.status(400).json({
                message:"Account does not exist with this role",
                success:false
            })
        }
        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{
            expiresIn:"1d"
        });
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            password:user.password,
            role:user.role
        }
        return res.status(200).cookie("token",token,{
            maxAge:1*24*60*60*1000,
            httpsOnly:true,
            sameSite:"strict"
        }).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }

}

export const logout = async (req, res) => {
    try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Account logout Successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const updateProfile = async (req,res) => {
     try {
        const {fullname,email} = req.body;

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const userId = req.id; // middlewares authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;

    if (cloudResponse) {
        user.file=cloudResponse.secure_url
      }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    }
    return res.status(200).json({
        message: "Profile updated successfully",
        user,
        success: true,
      })
     } catch (error) {
        console.log(error);
     }
  }