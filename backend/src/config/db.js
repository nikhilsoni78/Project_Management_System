const mongoose = require("mongoose");

const connect = async (url) => {
    console.log(url);
    const connection = await mongoose.connect(url);
    console.log("DB Connected Successfully");
        return connection;
}

module.exports = connect;   