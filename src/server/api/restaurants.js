const express = require('express');
const router = express.Router();

const Restaurant = require('../model/Restaurant');
const Review = require('../model/Review');

// @route GET api/items
// @desc Get all users with given name or location
// @access public
router.get('/', (req, res) => {
    let name = req.body.name;
    let location = req.body.location;
    if (name !== undefined && location !== undefined) {
        Restaurant.find({"name": name, "location": location})
            .then(restaurant => {
                restaurant.length !== 0 ? res.json(restaurant) :
                    res.status(404).json({message: `${name} does not exist in ${location}`});
            });
    } else if (name !== undefined) {
        Restaurant.find({"name": name})
            .then(restaurant => {
                restaurant.length !== 0 ? res.json(restaurant) :
                    res.status(404).json({message: `${name} does not exist`});
            });
    } else if (location !== undefined) {
        Restaurant.find({"location": location})
            .then(restaurant => {
                restaurant.length !== 0 ? res.json(restaurant) :
                    res.status(404).json({message: `no restaurants found in ${location}`});
            });
    } else {
        res.status(400).json({message: "please insert a restaurant name or a location"});
    }
});

router.get('/all', (req, res) => {
    Restaurant.find()
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(500).json({message: "server error"}));
});

// @route POST api/items
// @desc register new user
// @access public
router.post('/', (req, res) => {
    const newRestaurant = new Restaurant({
        id: req.body.id,
        name: req.body.name,
        location: req.body.location
    });
    newRestaurant.save()
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json({message: "restaurant is already exist"}));
});

module.exports = router;

