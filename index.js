const express = require("express");
const app = express();
const port = 8000;

const db = require('./config/mongoose');

// middle for parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", require("./routes/index"));

app.listen(port, (err) =>{
    if(err){
        console.log("");
    }
    console.log("server is running on port 8000");
    });
