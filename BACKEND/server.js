const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

});

const connection = mongoose.connection;
connection.once("open", () => {
   console.log("Mongodb Connection Success!"); 
})

const employeeRouter = require("./routes/employees.js");     //import employees.js file
app.use("/employee",employeeRouter);                        //frontend and backend connected link http://localhost:8070/employee

const salaryRouter = require("./routes/salary.js");     //import salary.js file
app.use("/salary",salaryRouter);                        //frontend and backend connected link http://localhost:8070/salary

const adminRouter = require("./routes/admin.js");     //import admin.js file
app.use("/admin",adminRouter);                        //frontend and backend connected link http://localhost:8070/admin


 app.listen(PORT, () => {
     console.log(`Server is up and running on port number: ${PORT}`)
 })