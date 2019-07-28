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

router.post('/updateScore' , (req, res) => {

    let sum = req.body.review.bathroomQuality + req.body.review.staffKindness + req.body.review.cleanliness +
        req.body.review.driveThruQuality + req.body.review.deliverySpeed + req.body.review.foodQuality;
    if( ( req.body.review.driveThruQuality > 0 ) && ( req.body.review.deliverySpeed > 0 ))
        sum = sum / 6;
    else if( ( req.body.review.driveThruQuality > 0 ) || ( req.body.review.deliverySpeed > 0 ))
        sum = sum / 5;
    else
        sum = sum / 4;


    let name = req.body.review.restaurant._id;
    let oldScore = req.body.review.restaurant.score;
    let scoreNum = req.body.review.restaurant.scoreNumber;

    let newScore = oldScore * scoreNum ;
    newScore += sum;
    scoreNum += 1;

    newScore /= scoreNum;


    Restaurant.updateOne(
        {"_id": name},
        {
            $set: {
                "score": newScore,
                "scoreNumber": scoreNum
            }
        }).then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json({message: "Cannot update restaurant score"}));

});


router.post('/some', (req, res) => {
    let search = req.body.search;
    let name = search.search;

    Restaurant.find(
        {"name": {$regex : name}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/someLocation', (req, res) => {
    let search = req.body.search;
    let location = search.search;

    Restaurant.find(
        {"location": {$regex : location}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/someAVG', (req, res) => {
    let search = req.body.search;
    let avg = search.search;

    Restaurant.find(
        {"score": { $gte: avg }})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/someAll', (req, res) => {
    let search = req.body.search;
    let name = search.search;
    let location = search.location;
    let avg = search.avg;

    Restaurant.find(
        {"name": {$regex : name}, "location": {$regex : location}, "score": { $gte: avg } })
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

module.exports = router;

