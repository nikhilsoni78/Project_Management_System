require('dotenv').config()
const express = require('express');
//Express App
const app = express();

//Imports
const connect = require('./src/config/db')
const authRouter = require('./src/routes/authRoutes')
const projectRouter = require('./src/routes/projectRoutes')
const authentication = require('./src/middlewares/authentication')
const cors = require('cors')
const globalErrorHandler = require('./src/middlewares/GlobalErrorHandler')


//Middlewares
app.use(express.json());
app.use(cors())


//Routing Middlewares
app.use('/api/v1', authRouter);
app.use('/api/v1',authentication,projectRouter)

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