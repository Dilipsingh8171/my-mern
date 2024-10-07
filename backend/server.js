import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
import DBconnect from './config/db.js';
import authroutes from "./routes/authRoutes.js";
import CategoryRoutes from './routes/categoryRoutes.js';
import morgan from 'morgan';
import colors from 'colors'
import Stripe from 'stripe'

//configuration;
dotenv.config()

const stripe = Stripe(process.env.SECRET_STRIPE_KEY)

//database config
DBconnect()

//rest object
let app = express();

//middlewares
app.use(cors({origin:"http://localhost:8082"}))
app.use(express.json())
app.use(morgan('dev'))

// sub routes
app.use('/api/v1/auth', authroutes)
app.use('api/v1/category', CategoryRoutes)

app.get('/', (req, res) => {
    res.send("<h2>Server is Running </h2>")
})

app.post('/checkout', async (req, res) => {
    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
        
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: (item.price) * 100
                    },
                    quantity: item.quantity

                }
            }),
            success_url: 'http://localhost:8082/success',
            cancel_url: "http://localhost:8082/cancel"
        })

        res.json({ url: session.url })
    } catch (error) {

        res.status(500).send({ error: error.message })
    }
})
//server port
const PORT = process.env.PORT || 8082
app.listen(8082, () => {
    console.log(`server is running on ${process.env.DEV_MODE} port ${PORT}`.bgRed.white)
})