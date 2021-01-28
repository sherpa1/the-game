const express = require('express');
const router = express.Router();
const DBClient = require('../utils/DB/DBClient');
const mysql = require('mysql');

const { v4: uuidv4 } = require('uuid');

const axios = require('axios');

router.get('/', async (req, res, next) => {
    res.json({});
});



module.exports = router;