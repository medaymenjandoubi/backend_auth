import express from 'express'
import cors from 'cors'
import {readdirSync} from 'fs'
import mongoose from 'mongoose';

const morgan = require('morgan');
require ('dotenv').config();


// create express app
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));//for logging
// app.use((req,res,next) => {
//     console.log("this is my own middleware for test")
//     next();
// });


// routes 
readdirSync("./routes").map((r) => 
    app.use("/api", require(`./routes/${r}`))
);


//port 
const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`Server is running on port ${port}`))

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("**DB Successfully connected**"))
  .catch((err) => console.log("DB Error => ", err));