
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { hashPassword } from '../utils/auth.js'
//registration
export const register = async(req,res)=>{ 
    const email = req.body.email;
    console.log(req.body);
    try {
        
        const user = await User.findOne({email});
        if(user){
            return res.status(404).json({sucess:false, message:'User already exist register with new email'})
        }
       
        //hashing password
        const hashedPassword = await hashPassword(req.body.password);

        const newUser = await User({
           username: req.body.username,
           email: email,
           password:hashedPassword,
           
        })
        console.log(newUser);
        await newUser.save();
        res.status(200)
        .json({success:true,message:'sucess', data:newUser})
          
    } catch (err) {
        console.log(err.message)
        res.status(500)
        .json({success:false,message:'failed',})
    }
}


//Login
export const login = async(req,res)=>{
    const email = req.body.email;
    try {
        const user = await User.findOne({email});
        //if user doesnt exist

        if(!user){
            return res.status(404).json({sucess:false, message:'User not found'})
        }
        //if user exist
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        //if password is incorrect
        if(!checkCorrectPassword){
            return res
                .status(401)
                .json({sucess:false, message:"incorrect email or password"});
        }

        const {password,...rest} = user._doc;

        //create jwt token
        const token  = jwt.sign(
            {
                id: user._id, role: user.role
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "15d"}
        );


        //seting token in browser cookies and sending the response to the client 
        res.cookie('accessToken',token,{
            httpOnly: true,
            expires:token.expiresIn
        }).status(200).json({success:true, message:'sucessfully login',data:{...rest}})
    } catch (err) {
        res.status(500)
        .json({success:false,message:'failed to login'})
    }
}