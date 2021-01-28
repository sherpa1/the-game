const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Player = require("../models/Player");

const axios = require('axios');

router.get('/', async (req, res, next) => {

    let players = [];

    await Player.create({ user_uuid: uuidv4() });

    try {

        players = await Player.find();

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.json(players);

});


router.get('/:user_uuid', async (req, res, next) => {

    let player = {};
    let { user_uuid } = req.params;

    try {
        player = await Player.findOne({ user_uuid: user_uuid });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.json(player);

});

router.put('/:user_uuid', async (req, res, next) => {

    let player = req.body;

    try {
        await Player.findOneAndUpdate({ user_uuid: player.user_uuid });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.sendStatus(200);

});

router.delete('/:user_uuid', async (req, res, next) => {

    const { user_uuid } = req.params;

    try {
        await Player.findOneAndDelete({ user_uuid: user_uuid });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    res.sendStatus(200);

});

router.get('/:user_uuid/user', async (req, res, next) => {

    let { user_uuid } = req.params;
    let player, user, player_user = {};

    try {

        player = await Player.findOne({ user_uuid: user_uuid });

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }

    const USERS_API = process.env.USERS_API;

    if (player != undefined && player != null) {
        try {
            result = await axios.get(`${USERS_API}/users/${player.user_uuid}`);
            if (result.data) user = result.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    try {
        if (player != undefined && player != null && user != undefined && user != null) {
            player_user = {
                score: player.score,
                wins: player.wins,
                defeats: player.defeats,
                user: {
                    uuid: user.uuid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    gender: user.gender,
                    email: user.email,
                    authorized: user.authorized,
                }
            };
        }
    } catch (error) {
        throw new Error(error);
    }

    res.json(player_user);

});

module.exports = router;