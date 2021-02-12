const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require("constants");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require('./models/todo.js');
const bodyParser = require('body-parser');
const todosRouter = require("./routes/todosRoutes.js");

const morgan = require("morgan");

mongoose.set("useFindAndModify", false);

const dbURI = "USE MongoAtlas database URI"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db");

        //listening for requests on port 3000
        app.listen(3000, () => {
            console.log("listening on port 3000");
        });

    })
    .catch((err)=>{
        console.log(err);
    })

app.set("view engine", "ejs");

//middleware and static files
app.use(morgan("dev"))
// app.use(express.urlencoded({ extended: true }) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));





todosRouter.get("/", (req, res) => {
    Todo.find().sort({createdAt : -1})
        .then((result)=>{
            res.render("indextodo", {todos: result});


        })
        .catch((err=>{
            console.log(err);
            
        }))
    
});



todosRouter.post("/createTodo", async(req,res)=>{
    console.log(req.body.content)
    const todoTask = new Todo({
        content: req.body.content
        });
        try {
        await todoTask.save();
        // res.sendStatus(200);
        res.redirect("/todo");
        } catch (err) {
            console.log(err)
        res.redirect("/todo");
        }
    // res.sendStatus(200);

});

todosRouter.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    Todo.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/todo");
    });
    });



//sandbox routes / testing routes
// app.get(("/add-todo"),(req,res)=>{
//     const todo = new Todo({
//         content : "heloo chinu"
//     });

//     todo.save()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// });

//todos requests
app.use(todosRouter);



app.use((req, res) => {
    res.status(404).render("404");
});