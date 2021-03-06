const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const validator = require("validator");

const DBClient = require('../utils/DB/DBClient');

const mysql = require('mysql');

const hide_password = require('../middlewares/hide_password');
const hateoas = require('../middlewares/hateoas');

const is_authorized_by_basic_auth = require("../middlewares/BasicAuthChecker");
const is_authorized_by_bearer_token = require("../middlewares/BearerChecker");

const Token = require('../utils/Tokenizer');

let token;

router.post('/signin', is_authorized_by_basic_auth, async (user, req, res, next) => {

  //if is_authorized_by_basic_auth
  try {
    token = await Token.create({ uuid: user.uuid });
  } catch (error) {
    throw new Error(error);
  }

  return res.status(200).json({
    message: `Success`,
    result: "Authorized",
    token: token,
  });

});

router.post('/authenticate', is_authorized_by_bearer_token, async (token_payload, req, res, next) => {

  //if is_authorized_by_bearer_token
  return res.status(200).json({
    message: `Success`,
    result: "Authorized",
  });

});

router.post('/extend-token', is_authorized_by_bearer_token, async (token_payload, req, res, next) => {

  //if is_authorized_by_bearer_token
  try {
    token = await Token.create();
  } catch (error) {
    throw new Error(error);
  }

  return res.status(200).json({
    message: `Success`,
    result: "Authorized",
    token: token,
  });

});

router.get('/:uuid', is_authorized_by_bearer_token, async (req, res, next) => {

  //if is_authorized_by_bearer_token
  const { uuid } = req.params;

  const sql = `SELECT * FROM users WHERE uuid =?`;
  const values = [uuid];
  let user;

  try {

    user = await DBClient.one(sql, values);
    //DBClient.close();

  } catch (error) {

    console.error(error);

    throw new Error(error);

  }

  next(user);//result wil be treated by hide_password middleware

});


router.get('/', is_authorized_by_bearer_token, async (req, res, next) => {

  //if is_authorized_by_bearer_token
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

router.post('/', is_authorized_by_bearer_token, async (req, res, next) => {

  //if is_authorized_by_bearer_token
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
      const sql = `INSERT INTO users (uuid, email, password, role, firstname, lastname, gender, authorized) VALUES (?,?,?,?,?,?,?,?)`;

      const values = [uuid, email, hash, role, firstname, lastname, gender, authorized];

      try {

        const result = await DBClient.query(sql, values);

        return res.status(201).json({
          message: "User created",
          user: result.dataValues,
          password: password
        });

      } catch (error) {
        console.error(error);

        //if email already exists in DB
        if (error === `ER_DUP_ENTRY: Duplicate entry '${email}' for key 'email'`)
          return res.status(409).json({ message: `User with email address "${email}" already exists` });
        else
          return res.status(500).json({ message: error.message, });
      }

    });
  });

});

router.post('/signup', is_authorized_by_bearer_token, async (req, res, next) => {

  //if is_authorized_by_bearer_token
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
      //const sql = `INSERT INTO users (uuid, email, password, role, firstname, lastname, gender, authorized) VALUES ('${uuid}', ${email}, '${hash}', '${role}', ${firstname}, ${lastname}, ${gender}, ${authorized})`;
      const sql = `INSERT INTO users (uuid, email, password, role, firstname, lastname, gender, authorized) VALUES (?,?,?,?,?,?,?,?)`;
      const values = [uuid, email, hash, role, firstname, lastname, gender, authorized];

      try {

        const result = await DBClient.query(sql, values);

        return res.status(201).json({
          message: "User created",
          user: result.dataValues,
          password: password
        });

      } catch (error) {
        console.error(error);

        //si email déjà utilisé en bdd
        if (error === `ER_DUP_ENTRY: Duplicate entry '${email}' for key 'email'`)
          return res.status(409).json({ message: `User with email address "${email}" already exists` });
        else
          return res.status(500).json({ message: error.message, });
      }

    });
  });

});




router.use(hide_password);
router.use(hateoas);

module.exports = router;
