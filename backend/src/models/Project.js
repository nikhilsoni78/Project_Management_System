const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        minlength: [3, "minimum 3 character Requried in Name"]
    },

    description: {
        type: String,
        required: [true,"Description is Required"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required:[true, "User is Required"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Projects', ProjectSchema);