const multer  = require('multer')

const express = require('express');
const router = express.Router();


const User = require('../model/User');

var upload = multer({ dest: 'userUploads/' })
var cpUpload = upload.fields([{ name: 'picture', maxCount: 1 }])

// @route GET api/items
// @desc Get all users with given name or location
// @access public
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

// @route POST api/items
// @desc register new user
// @access public
router.post('/', cpUpload, (req, res) => {
    console.log("got to server");
    console.log(req.body);
    console.log(req.files.picture[0].path);
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

router.post('/login', (req, res) => {
    let user = req.body.user;
    let username = user.username;
    let password = user.password;
    User.find({"username": username})
        .then(user => user[0].password === password ? res.json(user[0]) :
            res.status(404).json({message: "Invalid username or password"}))
        .catch(err => res.status(500).json({message: "server error"}));
});

router.post('/some', (req, res) => {
    let search = req.body.search;
    let username = search.search;

    User.find(
        {"username": username})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive users"}));
});

router.post('/someLocation', (req, res) => {
    let search = req.body.search;
    let location = search.search;

    User.find(
        {"location": location})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive users"}));
});

router.put('/', (req, res) => {
    console.log(req.body.user);
    let user = req.body.user;
    let username = user.username;
    let password = user.password;
    let location = user.location;
    let picture = user.picture;
    User.updateOne({
        $set: {
            "username": username,
            "password": password,
            "location": location,
            "picture": picture
        }
    }).then(user => res.json(user))
        .catch(err => res.status(500).json({message: `username: ${username} is already taken`}));
});

module.exports = router;
