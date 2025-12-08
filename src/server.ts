import express from "express";
import initDB from "./config/db";
// import { usersRoutes } from "./modules/users/users.routes";
import {authRoutes} from "./modules/auth/auth.routes"
import { usersRoutes } from "./modules/users/users.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

initDB();
/////////////////////////////////////////////


app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// app.use("/users", usersRoutes);
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/users",usersRoutes)
app.use("/api/v1/vehicles",vehiclesRoutes)





//////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});