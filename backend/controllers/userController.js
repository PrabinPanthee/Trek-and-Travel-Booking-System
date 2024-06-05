import User from '../models/User.js'

//update 
export const updateUser = async(req,res)=>{
     const id =req.params.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true});
        res
            .status(200)
            .json({
                sucess:true,
                message:"Sucessfully updated",
                data:updatedUser,
            });
    } catch(err){
        res
        .status(500)
        .json({
            sucess:false,
            message:"not updated",
            
        });
    }
};

//delete
export const deleteUser = async(req,res)=>{
    const id =req.params.id;

    try{
        await User.findByIdAndDelete(id);
        res
            .status(200)
            .json({
                sucess:true,
                message:"Sucessfully deleted",
               
            });
    } catch(err){
        res
        .status(500)
        .json({
            sucess:false,
            message:"Failed to Delete. Try again",
            
        });
    }
};

//geting single user
export const getSingleUser = async(req,res)=>{
    const id =req.params.id;

    try{
        const User = await User.findById(id);
        res
            .status(200)
            .json({
                sucess:true,
                message:"found",
                data:User,
            });
    } catch(err){
        res
        .status(404)
        .json({
            sucess:false,
            message:"not found",
            
        });
    }
};
//get all users
export const getAllUser = async(req,res)=>{
    


    try{
        const users = await User.find({}, {password :0 })
        res
            .status(200)
            .json({
                sucess:true,
                message:"all data found",
                data:users,
            });
    } catch(err){
        res
        .status(404)
        .json({
            sucess:false,
            message:"Failed to find. Try again",
            
        });
    }
};