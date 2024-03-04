import express from "express";
import dotenv from 'dotenv';
import routerUser from "./routers/users-router.js";
import routerStudent from "./routers/students-rouuter.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));
app.use(routerUser);
app.use(routerStudent);

const PORT = process.env.PORT || 3000; // Menambahkan default port 3000 jika PORT tidak tersedia di environment variable

app.listen(PORT, () => console.log(`server berjalan di di port ${PORT}`));