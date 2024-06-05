import Tour from '../models/Tour.js'
import fs from 'fs'
//create
//create
export const createTour = async(req,res)=>{
     console.log(req.file)
    try{ 
        const { title, city, address, distance, desc, price, maxGroupSize } = req.body;
        let fileName;
           if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                fileName = `${baseUrl}/${req.file.filename}`;
                const filesize = (req.file.size / (1024 * 1024)).toFixed(2)
                if (filesize > 1) {
                    fs.unlink(`./uploads/${req.file.filename}`, (err) => {
                        if (err) {
                            console.log('unable to delete')
                        }
                    })
                    return res.status(400).json({
                        message: 'upload image less than equal to 1mb'
                    })
                }

            } else {
                fileName = 'https://www.foodiesfeed.com/wp-content/uploads/2023/10/recycled-paper-cup.jpg'
            }
            const newTourData = {
                title,
                city,
                address,
                distance,
                desc,
                price,
                maxGroupSize,
                featured: req.body.featured,
                photo:fileName
              };
              const newTour = new Tour(newTourData);
              const savedTour = await newTour.save();
        
                console.log("saved",savedTour);
                res
                    .status(200)
                    .json({
                        sucess:true,
                        message:"Sucessfully created",
                        data:savedTour,
                    });
    } catch(err){
        console.log(err.message)
        res
        .status(500)
        .json({
            sucess:false,
            message:"Failed to create. Try again",
            
        });
    }
};
  


//update 
export const updateTour = async(req,res)=>{
    const id = req.params.id;
  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }

    const { title, city, address, distance, desc, price, maxGroupSize, featured } = req.body;
    let fileName = tour.photo; // Default to current photo if not updated

    if (req.file) {
        
        fileName = `http://localhost:4000/`+req.file.filename;
      // Handle the new photo
      // Check if the filesize is greater than 1MB
      const filesize = (req.file.size / (1024 * 1024)).toFixed(2);
      if (filesize > 1) {
        fs.unlink(`./uploads/${req.file.filename}`, (err) => {
          if (err) {
            console.log('Unable to delete');
          }
        });
        return res.status(400).json({
          message: 'Upload image less than or equal to 1MB',
        });
      }

      // Delete the old photo if a new one is uploaded
      fs.unlink(`./uploads/${tour.photo}`, (err) => {
        if (err) {
          console.log('Unable to delete old photo');
        }
      });
    }

    const updatedTourData = {
      title,
      city,
      address,
      distance,
      desc,
      price,
      maxGroupSize,
      featured,
      photo: fileName,
    };

    const updatedTour = await Tour.findByIdAndUpdate(id, { $set: updatedTourData }, { new: true });
    console.log("updated",updatedTour);
    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedTour,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update. Try again',
    });
  }
};

//delete
export const deleteTour = async(req,res)=>{
    const id =req.params.id;

    try{
        await Tour.findByIdAndDelete(id);
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

//geting single tour
export const getSingleTour = async(req,res)=>{
    const id =req.params.id;

    try{
        const tour = await Tour.findById(id).populate("reviews");
        
        res
            .status(200)
            .json({
                sucess:true,
                message:"found",
                data:tour,
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
//get all tours
export const getAllTour = async(req,res)=>{
    


    try{
        const tours = await Tour.find({}).populate("reviews");
        res
            .status(200)
            .json({
                sucess:true,
                message:"all data found",
                data:tours,
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
//get tour by search 
export const getTourBySearch = async(req,res)=>{
    const city = new RegExp(req.query.city,'i');
    try{
        const tours = await Tour.find({
            city
        }).populate("reviews");
        res
            .status(200)
            .json({
                sucess:true,
                message:"SucessFull",
                data:tours,
            });
    } catch(err){ 
        res
        .status(404)
        .json({
            sucess:false,
            message:"failed",
            
        });
    }
};
//get featured tour
export const getFeaturedTour = async(req,res)=>{

    try{
        const tours = await Tour.find({featured:true}).populate("reviews").limit(8);
        res
            .status(200)
            .json({
                sucess:true,
                message:"all data found",
                data:tours,
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
//get tour count
export const getTourCount = async(req,res)=>{

    try{
        const tourCount = await Tour.estimatedDocumentCount();
        res
            .status(200)
            .json({
                sucess:true,
                data:tourCount,
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
