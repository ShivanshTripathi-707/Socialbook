require("dotenv").config()
const express = require("express");
const app = express()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db")

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["POST", "GET", "DELETE"],
    credentials : true
}))
app.use(cookieParser())
connectDB()

app.get("/", (req,res)=>{
    res.send("hello from backend")
})

app.use("/api", require("./routes/authApp"))
app.use("/images", express.static("uploads"));

const port = process.env.PORT || 4000
app.listen(port, ()=> {
    console.log("server started at " + port);
})