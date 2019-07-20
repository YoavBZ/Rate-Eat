const express = require('express');
const router = express.Router();

const Review = require('../model/Review');

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
    Review.updateOne(
        {"_id": req.body._id},
        {
            $set: {
                "bathroomQuality": req.body.bathroomQuality,
                "staffKindness": req.body.staffKindness,
                "cleanliness": req.body.cleanliness,
                "driveThruQuality": req.body.driveThruQuality,
                "deliverySpeed": req.body.deliverySpeed,
                "foodQuality": req.body.foodQuality,
                "pictures": req.body.pictures,
                "publishDate": Date.now()
            }
        })
        .then(review => res.json({message: "update had completed successfully"}))
        .catch(err => res.status(400).json({message: "update had failed"}));
});

router.delete('/', (req, res) => {
    Review.deleteOne(
        {"_id": req.body._id})
        .then(review => res.json({message: "review had been removed successfully"}))
        .catch(err => res.status(400).json({message: "remove had failed"}));
    // TODO: remove review pictures!!
});

router.post('/getUserReviews', (req, res) => {
    userID = req.body.userID
    Review.find(
        {"userID": userID})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json({message: "Failed to retrive reviews"}));
    // TODO: remove review pictures!!
});

module.exports = router;