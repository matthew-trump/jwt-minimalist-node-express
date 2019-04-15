const express = require('express');
const router = express.Router();


router.get('/ping-unprotected',
    (req, res) => {
        res.status(200).json({ message: "OK-UNPROTECTED" });
    })


module.exports = router;