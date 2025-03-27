const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const User = require("./models/user.js")
const cors = require('cors');
dotenv.config()
const app=express()

app.use(express.json())
app.use(cors({origin:'http://localhost:4200'}))
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to Mongo Server"))
.catch((error)=>console.log("Error in connecting Mongo server", error))

//route middleware
const authRouter=require('./routes/auth.js')
app.use('/',authRouter);

//error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send("Internal server error")
})


const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server is running on port: ", port);
})

