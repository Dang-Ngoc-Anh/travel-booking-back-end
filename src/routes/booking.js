import express from 'express'
import { createBooking, getAllBooking, getBooking } from '../controller/BookingCotroller.js';
import { verifyAdmin, verifyUser } from '../utils/VerifyToken.js';

const router = express.Router();

router.post('/' ,verifyUser, createBooking)
router.get('/' ,verifyAdmin, getAllBooking)
router.get('/:id' ,verifyUser, getBooking)
export default router