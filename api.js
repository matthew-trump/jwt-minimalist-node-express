const express = require('express');
const router = express.Router();


router.get('/protected',
    (req, res) => {
        res.status(200).json({ message: "OK" });
    })


module.exports = router;