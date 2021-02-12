const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now 
    },
    modified_at : {
        type : Date,
        default : Date.now
    },
    isChecked : {
        type : Boolean,
        default : false
    }
},{timestamps: true});

const  Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;