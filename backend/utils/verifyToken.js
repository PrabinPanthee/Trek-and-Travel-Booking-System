
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({success:false,message:"you are not authorized (invaid token)"})
    }
    //if token exist then verify the token

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err, user)=>
    {
        if(err){
            return res.status(401).json({sucess:false, message:"token is invalid"})
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id=== req.params.id || req.user.role==='user'){
            next()
        }else{
            res.status(401).json({success:false, message:"your are not  authenticated(login)"});
        }
    });
};
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role==='admin'){
            next()
        }else{
            res.status(401).json({success:false, message:"your are not  authorized(you are not an admin)"});
        }
    });
};


