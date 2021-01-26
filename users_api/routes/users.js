const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const validator = require("validator");

const jwt = require('jsonwebtoken');
const jwt_duration = 3;
const jwt_expiration = 3600 * jwt_duration;//convert hour in seconds

const DBClient = require('../utils/DB/DBClient');

const mysql = require('mysql');

const fs = require("fs");

const hide_password = require('../middlewares/hide_password');
const hateoas = require('../middlewares/hateoas');


router.get('/:uuid', async (req, res, next) => {

  const { uuid } = req.params;

  const sql = `SELECT * FROM users WHERE uuid ='${uuid}'`;
  let user;

  try {

    user = await DBClient.one(sql);
    //DBClient.close();

  } catch (error) {

    console.error(error);

    throw new Error(error);

  }

  next(user);//result wil be treated by hide_password middleware

});


router.get('/', async (req, res, next) => {
  const sql = `SELECT * FROM users`;
  let users;

  try {

    users = await DBClient.all(sql);
    //DBClient.close();

  } catch (error) {

    console.error(error);

    throw new Error(error);

  }

  next(users);//result wil be treated by hide_password middleware


});

router.post('/', async (req, res, next) => {

  let { firstname, lastname, gender, email, password } = req.body;

  firstname = mysql.escape(firstname);
  lastname = mysql.escape(lastname);
  gender = mysql.escape(gender);
  email = mysql.escape(email);
  const uuid = uuidv4();
  const authorized = 1;
  const role = "player";

  await bcrypt.genSalt(saltRounds, async (err, salt) => {
    await bcrypt.hash(password, salt, async (err, hash) => {

      if (err) return res.status(500).json({ message: err.message });

      //when a value has been escaped, no need to put ''
      const sql = `INSERT INTO users (uuid, email, password, role, firstname, lastname, gender, authorized) VALUES ('${uuid}', ${email}, '${hash}', '${role}', ${firstname}, ${lastname}, ${gender}, ${authorized})`;

      try {

        const result = await DBClient.query(sql);
        //DBClient.close();

        return res.status(201).json({
          message: "User created",
          user: result.dataValues
        });

      } catch (error) {
        console.error(error);

        //si email déjà utilisé en bdd
        if (error === `ER_DUP_ENTRY: Duplicate entry '${email}' for key 'email'`)
          return res.status(500).json({ message: `User with email address "${email}" already exists` });
        else
          return res.status(500).json({ message: error.message, });
      }

    });
  });

});

router.use(hide_password);
router.use(hateoas);

module.exports = router;
