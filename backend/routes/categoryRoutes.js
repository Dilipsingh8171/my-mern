import express from 'express'
import { categoryConteoller, } from '../controllers/categoryController.js'


const router = express.Router()

//routes

router.post('/create-category', categoryConteoller)

export default router