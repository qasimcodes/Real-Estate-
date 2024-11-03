import express from "express";
import morgan from "morgan";
import cors from "cors";
import {DATABASE_CLOUD} from "./config/config.js";
import mongoose  from "mongoose";

const app = express();
const port = 8080;

// DB connection
mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_CLOUD)
.then((con) => console.log(`DB conneted with ${con.connection.host}`))
.catch((err) => console.log(`connection failed ..${err.message}`));

// apply middlwares 
app.use(express.json({limit: "12mb"}));
app.use(morgan("dev"));
app.use(cors());

// import & pass in route middleware 
import authRoute from "./routes/authRoute.js";
import adsRoute from "./routes/adsRoute.js";
app.use("/api/v1", authRoute);
app.use("/api/v1", adsRoute);

app.listen(port, ()=>{
      console.log(`Express server is running on http://localhost:${port}`);
})