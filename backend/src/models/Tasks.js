const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is Required"],
         trim: true,
        minlength: 3
    },
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    dueDate: {
        type: Date,
        required: [true, "DueDate is required"]
    },
    assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Assigned user is required"]
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"projects",
        required:[true, "project id is required"]
    }
}, { timestamps: true })

TaskSchema.index({ projectId: 1 });

module.exports = mongoose.model('Tasks',TaskSchema)