const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');

router.post('/user/signup', (req, res) => {
    console.log(req.body.password)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'New User Created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Invalid authentification credential!'
                    });
                });
        });

});

router.post('/user/login', (req, res) => {
    console.log(req.body)
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid authentification credential!'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    maessage: 'Auth failed'
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_this_shoud_be_longer', {
                expiresIn: '1h'
            });
            res.status(200).json({
                token: token,
                userEmail: fetchedUser.email,
                expiresIn: 3600
            });
        })
        .catch(err => {
            return res.status(401).json({
                maessage: 'Auth failed'
            });
        });
});



module.exports = router;