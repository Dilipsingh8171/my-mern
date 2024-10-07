import mongoose from "mongoose"
import colors from 'colors';

const DBconnect = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URL)
         console.log(`Conntected To Mongodb Database ${conn.connection.host}`)

        console.log("database connected")
    } catch (error) {

        console.log(`error in mongodb ${error}`.bgRed.white)
    }

}

export default DBconnect