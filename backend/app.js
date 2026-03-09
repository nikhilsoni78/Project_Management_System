require('dotenv').config()
const express = require('express');
const app = express();


const connect = require('./src/config/db')

app.use(express.json());


const PORT = process.env.PORT || 3000
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




