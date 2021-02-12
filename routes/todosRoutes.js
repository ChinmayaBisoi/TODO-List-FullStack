const express = require("express");
const todosRouter = express.Router();
const Todo = require('../models/todo.js');

todosRouter.get("/todo", (req, res) => {
    Todo.find().sort({createdAt : -1})
        .then((result)=>{
            res.render("indextodo", {todos: result});


        })
        .catch((err=>{
            console.log(err);
            
        }))
    
});

module.exports = todosRouter;