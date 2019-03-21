const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require('fs');

const router = express.Router();

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/jwtRS256.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./keys/jwtRS256.key.pub');

const HTTP_UNAUTHORIZED = 401;
const EXPIRES_IN_SECONDS = 3600 * 24 * 30;

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    errorOnFailedAuth: false
});

const handleUnauthorizedError = (err, req, res, next) => {

    if (err.status == HTTP_UNAUTHORIZED) {
        return res.status(HTTP_UNAUTHORIZED).json({ error: "Invalid or missing Authorization key" });
    }
    next();
};


router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (validateEmailAndPassword(email, password)) {
        const userId = findUserIdForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: EXPIRES_IN_SECONDS,
            subject: userId
        });
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: EXPIRES_IN_SECONDS,
            subject: userId,
            username: email
        });
    } else {
        res.status(401).json({ message: "LOGIN FAILED" });
    }

});

const validateEmailAndPassword = function (email, password) {
    return password === "spiritus-sanctus";
}
const findUserIdForEmail = function (email) {
    return "1001";
}
router.get('/ping',
    (req, res) => {
        res.status(200).json({ message: "OK" });
    })

router.get('/protected',
    checkIfAuthenticated,
    handleUnauthorizedError,
    (req, res) => {
        res.status(200).json({ message: "OK" });
    })


module.exports = router;