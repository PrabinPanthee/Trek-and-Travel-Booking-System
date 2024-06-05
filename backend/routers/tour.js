import express from 'express';
import { createTour, getTourCount } from '../controllers/tourController.js';
import { updateTour } from '../controllers/tourController.js';
import { deleteTour } from '../controllers/tourController.js';
import { getSingleTour } from '../controllers/tourController.js';
import { getAllTour } from '../controllers/tourController.js';
import { getTourBySearch } from '../controllers/tourController.js';
import { getFeaturedTour } from '../controllers/tourController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            return cb(new Error('This file type is not supported'));
        }
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage });

const router = express.Router();

router.post("/", upload.single('photo'), verifyAdmin, createTour);
router.put("/:id", upload.single('photo'),verifyAdmin, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);
router.get("/:id", getSingleTour);
router.get("/", getAllTour);
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTour', getFeaturedTour);
router.get('/search/getTourCount', getTourCount);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

export default router;
