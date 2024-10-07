import express from "express";
import { loginController, registerController, testController, forgotPasswordController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

//router object
const router = express.Router()

//registerr route
router.post("/register", registerController)

//login route
router.post("/login", loginController)

//forget password route
router.post('/forgot-password', forgotPasswordController)

// test route
router.get("/test", requireSignIn, isAdmin, testController)

//protected rotue
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})


// proteced damin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})



export default router