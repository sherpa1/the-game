const express = require('express');
const router = express.Router();
const DBClient = require('../utils/DB/DBClient');
const mysql = require('mysql');

const { v4: uuidv4 } = require('uuid');

const axios = require('axios');

const multer = require('multer');
const root = "/app/api/";
const upload_dir = "public/uploads/";
const max_upload_size = 100 * 1000000;
const upload = multer({ dest: upload_dir, limits: { fileSize: max_upload_size } });

const fs = require("fs");

router.post('/', upload.single("file"), async (req, res, next) => {

    if (req.file == undefined || req.file == null) {
        return res.status(400).json({ message: "File is missing" });
    }

    let path = upload_dir + req.file.filename;

    try {


    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.json(players);

});

module.exports = router;