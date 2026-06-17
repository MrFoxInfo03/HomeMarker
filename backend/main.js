const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const pool = require('./units/db');
const schedulerRun = require('./units/scheduler.js');

const { userRegistrationSchema } = require('./schemas/user.schema');
require("dotenv").config();

const runDimriaCollector = require('./collectors/dimria/dimria.collector.js');

const app = express();

const PATH_TO_FRONTEND = path.join(__dirname, '../frontend/HomeMarker/dist/');
const PORT = process.env.PORT;
const HOUR_SCHEDULER = 8;

app.use('/assets', express.static(path.join(PATH_TO_FRONTEND, 'assets/')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(PATH_TO_FRONTEND, 'index.html'));
});

const apiRouter = require('./routes/App.route');
app.use('/', apiRouter);


async function checkDimriaCollector() {
    const TIME_RUN = 60 * 1000;

    try {
        if(await shouldRun("dimria_collector", TIME_RUN)) {

            await dimriaCollector();

            await updateLastRun("dimria_collector");
        }

    } catch(err) {
        console.error("Collector error:", err);
    }
}

app.listen(PORT, async (err) => {
    if(err) {
        console.error("Error: Server not run. Check port or your code.");
        return;
    }

    setInterval(schedulerRun(
        "Dimria Collector", HOUR_SCHEDULER, runDimriaCollector), 
        HOUR_SCHEDULER * 60 * 60 * 1000
    );

    console.log("Server run");
});