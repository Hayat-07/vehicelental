import express from "express";
import initDB from "./config/db";


const app = express();
const port = process.env.PORT || 3000;



initDB();
/////////////////////////////////////////////


app.get("/", (req, res) => {
    res.send("Hello, World!");
});





//////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});