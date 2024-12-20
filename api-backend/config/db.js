const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.set('strictQuery')
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectDB