const express = require('express');
const router = express.Router();


router.get('/ping-protected',
    (req, res) => {
        res.status(200).json({ message: "OK-PROTECTED" });
    })


module.exports = router;