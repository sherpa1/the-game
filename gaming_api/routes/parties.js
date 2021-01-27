const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Party = require("../models/Party");
const bcrypt = require('bcryptjs');

const Base64 = require('../utils/Base64');
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("qd21#*CZy", salt);

const Tokenizer = require('../utils/Tokenizer');

const axios = require('axios');

const cryptoRandomString = require('crypto-random-string');

const UWebtoken = require('../utils/UWebtoken');

router.post('/', async (req, res, next) => {

    const uwt = await UWebtoken.create();

    let parties = [];

    let a_party;

    try {

        a_party = await Party.create({ token: uwt });

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    try {

        parties = await Party.find();

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.json(parties);

});

router.get('/', async (req, res, next) => {

    let parties = [];

    try {

        parties = await Party.find();

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.json(parties);

});

router.get('/:token', async (req, res, next) => {

    let party = {};
    let { token } = req.params;

    try {
        party = await Party.findOne({ token: user_uuid });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.json(party);

});

router.put('/:token', async (req, res, next) => {

    let party = req.body;

    try {
        await Party.findOneAndUpdate({ token: party.token });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.sendStatus(200);

});

router.delete('/:token', async (req, res, next) => {

    const { token } = req.params;

    try {
        await Party.findOneAndDelete({ token: token });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.sendStatus(200);

});

module.exports = router;