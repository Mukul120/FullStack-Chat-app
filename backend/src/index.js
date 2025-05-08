import express from "express"
import dotenv from "dotenv"
import authrouter from "../src/Routes/auth.routes.js"
import messagerouter from "../src/Routes/message.routes.js"
import Conection from "./lib/db.js";
import cookieparser from "cookie-parser"
import cors from "cors"
import path from "path";
import EventEmitter from "events";
import { app, server } from "./lib/socket.js";
dotenv.config();


EventEmitter.defaultMaxListeners = 15; // Increase limit



Conection()

const port = process.env.PORT
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use("/api/auth", authrouter)
app.use("/api/message", messagerouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "/dist", "index.html"))
    })

}


server.listen(port, () => {
    console.log(`server is runnig on port ${port}`);

})
