const express = require('express');
const router = express.Router();

const AuthUser = require('./Auth.route');

router.use("/auth", AuthUser);

module.exports = router;