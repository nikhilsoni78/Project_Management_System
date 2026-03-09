require('dotenv').config()
const express = require('express');
//Express App
const app = express();

//Imports
const authRouter = require('./src/routes/authRoute')
const connect = require('./src/config/db')
const globalErrorHandler = require('./src/middlewares/GlobalErrorHandler')
const authentication = require('./src/middlewares/authentication')


//Middlewares
app.use(express.json());

//Routing Middlewares
app.use('/api/v1', authRouter);

//Global Error Middlware
app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000

//main Function
const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is Running on Port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()