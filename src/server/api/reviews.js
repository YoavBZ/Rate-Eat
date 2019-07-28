const express = require('express');
const router = express.Router();

const Review = require('../model/Review');
var ObjectID = require('mongodb').ObjectID;


// @route POST api/items
// @desc register new user
// @access public

router.post('/', (req, res) => {
    const newReview = new Review({
        userID: req.body.userID,
        restaurantID: req.body.restaurantID,
        bathroomQuality: req.body.bathroomQuality,
        staffKindness: req.body.staffKindness,
        cleanliness: req.body.cleanliness,
        driveThruQuality: req.body.driveThruQuality,
        deliverySpeed: req.body.deliverySpeed,
        foodQuality: req.body.foodQuality,
        pictures: req.body.pictures,
        publishDate: Date.now()
    });
    newReview.save()
        .then(review => res.json(review))
        .catch(err => res.status(400).json({message: "you have already reviewed this restaurant"}));
});

router.put('/', (req, res) => {
    let review = req.body.review
    Review.updateOne(
        {"_id": ObjectID(req.body.review.id)},
        {
            $set: {
                "bathroomQuality": review.bathroomQuality,
                "staffKindness": review.staffKindness,
                "cleanliness": review.cleanliness,
                "driveThruQuality": review.driveThruQuality,
                "deliverySpeed": review.deliverySpeed,
                "foodQuality": review.foodQuality,
            }
        })
        .then(review => Review.find({"_id": req.body.review.id}).then(review => res.json(review[0])).catch(err => res.status(500).json({message: `Server Error`})))
        .catch(err => {console.log(err); res.status(400).json({message: "update had failed"})});
});

router.delete('/', (req, res) => {
    Review.deleteOne(
        {"_id": req.body._id})
        .then(review => res.json({message: "review had been removed successfully"}))
        .catch(err => res.status(400).json({message: "remove had failed"}));
    // TODO: remove review pictures!!
});

router.post('/getUserReviews', (req, res) => {
    let userID = req.body.userID
    Review.find(
        {"userID": userID})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json({message: "Failed to retrive reviews"}));
    // TODO: remove review pictures!!
});

router.post('/getRestaurantReviews', (req, res) => {
    let restaurantID = req.body.restaurantID
    Review.find(
        {"restaurantID": restaurantID})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json({message: "Failed to retrive reviews"}));
    // TODO: remove review pictures!!
});

module.exports = router;
