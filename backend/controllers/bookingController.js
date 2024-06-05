
import Booking from "../models/Booking.js"

export const createBooking = async(req, res)=>{
    const newBooking = new Booking(req.body)
    console.log(req.body)
   
    
    try {
        const savedBooking =await newBooking.save()
        console.log(savedBooking);
        res.status(200).json({sucess:true,message:'your tour is booked',data:savedBooking})
        
    } catch (err) {
        console.log(err.message)
        res.status(200).json({sucess:true,message:'internal server error'})
    }
}
export const getBooking = async (req,res)=>{
    const id =  req.params.id
    try {
        const book = await Booking.findById({_id:id})
        res.status(200).json({sucess:true,message:'sucessful',data:book})
    } catch (err) {
        res.status(404).json({sucess:false,message:'failed to fetch'})
    }

}
export const getAllBooking = async (req,res)=>{
 
    try {
        const books = await Booking.find()
        res.status(200).json({sucess:true,message:'sucessful',data:books})
    } catch (err) {
        res.status(500).json({sucess:false,message:'failed to fetch'})
    }

}



