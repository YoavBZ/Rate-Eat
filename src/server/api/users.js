const express = require('express');
const router = express.Router();

const User = require('../model/User');

// @route GET api/items
// @desc Get all users with given name or location
// @access public
router.get('/', (req, res) => {
    username = req.body.username
    location = req.body.location
    if (username != undefined && location != undefined) {
        User.find({"username": username, "location": location})
            .then(user => user.length != 0 ? res.json(user) : res.status(404).json({message: `username ${username} does not exist in ${location}`}))
    } else if (username != undefined) {
        User.find({"username": username})
            .then(user => user.length != 0 ? res.json(user) : res.status(404).json({message: `username ${username} does not exist`}))
    } else if (location != undefined) {
        User.find({"location": location})
            .then(user => user.length != 0 ? res.json(user) : res.status(404).json({message: `no users found in ${location}`}))
    } else {
        res.status(400).json({message: "please insert a username or a location"})
    }
});

// @route POST api/items
// @desc register new user
// @access public

router.post('/', (req, res) => {
    console.log("got to server");
    console.log(req.body);
    user = req.body.user
    const newUser = new User({
        username: user.username,
        password: user.password,
        picture: user.picture,
        location: user.location,
        reviews: []
    })
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "username is already taken"}))
})

router.post('/login', (req, res) => {
    user = req.body.user
    username = user.username;
    password = user.password
    User.find({"username": username})
        .then(user => user[0].password == password ? res.json(user[0]) : res.status(404).json({message: "Invalid username or password"}))
        .catch(err => res.status(500).json({message: "server error"}))

});


router.put('/', (req, res) => {
    console.log(req.body)
    user = req.body.user
    username = user.username;
    password = user.password;
    location = user.location;
    picture = user.picture;
    User.updateOne({$set:{"username": username,
                "password": password,
                "location": location,
                "picture": picture }})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({message: "server error"}))

});

module.exports = router;

