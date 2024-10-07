import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected route token based


export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(token,
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();

    } catch (error) {
        console.log(error);
    }
}


// export const requireSignIn = async (req, res, next) => {
//     try {
//         // Check if Authorization header exists
//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             return res.status(401).json({ error: "Authorization header missing" });
//         }

//         const token = authHeader.split(" ")[1]; // Expecting 'Bearer <token>'
//         if (!token) {
//             return res.status(401).json({ error: "Token missing from Authorization header" });
//         }

//         // Verify the token
//         const decoded = JWT.verify(authHeader, process.env.JWT_SECRET);
//         req.user = decoded;

//         // Proceed to the next middleware or route handler
//         next();
//         res.status(200).send({success:true,message:"ok"})

//     } catch (error) {
//         console.error("Error in requireSignIn middleware:", error);
//         res.status(400).send({success:false,message:"error in singnin"})

//         // Handle specific JWT errors

//     }
// };



// admin access


export const isAdmin = async (req, res, next) => {
    try {

        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unautorized Access"

            })

        } else {
            next()
            res.status(401).send({
                success: false, message: "Error in Admin Middleware",

            })

        }

    } catch (error) {
        console.log(error)
    }
}


