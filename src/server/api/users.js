const express = require('express');
const router = express.Router();

const multer = require('multer')

const User = require('../model/User');

var upload = multer({dest: 'userUploads/'})
var cpUpload = upload.fields([{name: 'picture', maxCount: 1}])
var putPicture = upload.fields([{name: 'picture', maxCount: 1}])

// @route GET api/users/
// @desc Get all users with given name or location

router.get('/', (req, res) => {
    let username = req.body.username;
    let location = req.body.location;
    if (username !== undefined && location !== undefined) {
        User.find({"username": username, "location": location})
            .then(user => user.length !== 0 ? res.json(user) :
                res.status(404).json({message: `username ${username} does not exist in ${location}`}));
    } else if (username !== undefined) {
        User.find({"username": username})
            .then(user => user.length !== 0 ? res.json(user) :
                res.status(404).json({message: `username ${username} does not exist`}));
    } else if (location !== undefined) {
        User.find({"location": location})
            .then(user => user.length !== 0 ? res.json(user) :
                res.status(404).json({message: `no users found in ${location}`}));
    } else {
        res.status(400).json({message: "please insert a username or a location"});
    }
});

// @route GET api/users/all
// @desc Get all users in the database

router.get('/all', (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(500).json({message: "server error"}));
});

router.get('/allReview', (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(500).json({message: "server error"}));
});

// @route POST api/users/
// @desc register new user to the database

router.post('/', cpUpload, (req, res) => {
    let user = req.body;
    const newUser = new User({
        username: user.username,
        password: user.password,
        picture: req.files.picture[0].path,
        location: user.location,
        reviews: []
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "username is already taken"}));
});

// @route POST api/users/login
// @desc searce the users deatils in the database:
//       if there is a match the user will be sent back and will be logged in
//       else throw error msg to the client

router.post('/login', (req, res) => {
    let user = req.body.user;
    let username = user.username;
    let password = user.password;
    User.find({"username": username})
        .then(user => user[0].password === password ? res.json(user[0]) :
            res.status(404).json({message: "Invalid username or password"}))
        .catch(err => res.status(500).json({message: "server error"}));
});

// @route POST api/users/fbLogin
// @desc verifys a login via facebook

router.post('/fbLogin', (req, res) => {
    let username = req.body.user.username;
    User.find({"username": username})
        .then(user => res.json(user[0]))
        .catch(err => res.status(500).json({message: "server error"}));
});

router.post('/some', (req, res) => {
    let search = req.body.search;
    let username = search.search;

    User.find(
        {"username": {$regex: username}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive users"}));
});

router.post('/someLocation', (req, res) => {
    let search = req.body.search;
    let location = search.search;

    User.find(
        {"location": {$regex: location}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive users"}));
});

router.post('/someNameLocation', (req, res) => {
    let search = req.body.search;
    let username = search.search;
    let location = search.location;

    User.find(
        {"username": {$regex: username}, "location": {$regex: location}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive users"}));
});

// @route PUT api/users/
// @desc update a user deatils including his profile picture

router.put('/', putPicture, (req, res) => {
    let id = req.body.id;
    let user = {}
    user["username"] = req.body.username
    user["password"] = req.body.password
    user["location"] = req.body.location
    if (req.files.length != 0) {
        user["picture"] = req.files.picture[0].path
    }
    User.replaceOne(
        {"_id": id},
        user
    ).then(user => User.find({"_id": id}).then(user => res.json(user[0])).catch(err => res.status(500).json({message: `Server Error`})))
        .catch(err => res.status(500).json({message: `username: ${req.body.username} is already taken`}));
});

module.exports = router;
