const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { cookieParser } = require('cookie-parser');
const pool = require('./units/db');
import { userRegistrationSchema } from './schemas/user.schema';
require("dotenv").config();

const bcrypt = require('bcrypt');

const app = express();

const PATH_TO_FRONTEND = path.join(__dirname, '../frontend/HomeMarker/dist/');
const PORT = process.env.PORT;

app.use('/assets', express.static(path.join(PATH_TO_FRONTEND, 'assets/')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(PATH_TO_FRONTEND, 'index.html'));
});

const apiRouter = require('./routes/App.route');
app.use('/', apiRouter);

app.listen(PORT, (err) => {
    if(err) {
        console.error("Error: Server not run. Check port or your code.");
        return;
    }

    console.log("Server run");
});