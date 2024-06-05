
import Tour from "../models/Tour.js"
import Review from "../models/Review.js"

export const createReview =async(req,res)=>{

    const tourId = req.params.tourId
    const newReview = new Review({...req.body,productId:tourId})
    console.log(newReview);
try {
    const savedReview = await newReview.save()
    console.log(savedReview)
    await Tour.findByIdAndUpdate(tourId,{
        $push:{reviews:savedReview._id}
    })
    

    res.status(200).json({sucess:true, message:'Review Submitted', data:savedReview})
} catch (err) {
    console.log(err.message)
    res.status(500).json({sucess:false, message:'Review failed to  Submit '})
}
};