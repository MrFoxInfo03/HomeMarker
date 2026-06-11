const express = require('express');
const path = require('path');
const pool = require('./units/db');
require("dotenv").config();

const bcrypt = require('bcrypt');

const app = express();

const PATH_TO_FRONTEND = path.join(__dirname, '../frontend/HomeMarker/dist/');
const PORT = process.env.PORT;

app.use('/assets', express.static(path.join(PATH_TO_FRONTEND, 'assets/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(PATH_TO_FRONTEND, 'index.html'));
});

app.post("/auth/add_new_user", (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const password = req.body.password;

    const password_hash = bcrypt.hash(password, 10);

    return 0;
});

app.listen(PORT, (err) => {
    if(err) {
        console.error("Error: Server not run. Check port or your code.");
        return;
    }

    console.log("Server run");
});