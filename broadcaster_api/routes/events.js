const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    res.json({ message: "to do !" });

});

module.exports = router;