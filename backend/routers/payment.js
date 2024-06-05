import express from 'express'
import { initiateKhalti, verifyPidx } from '../controllers/paymentController.js';
import { verifyUser } from '../utils/verifyToken.js';



const router = express.Router()

router.post('/initiatekhalti',verifyUser,initiateKhalti )
router.post('/verifypidx',verifyUser,verifyPidx)


export default router;