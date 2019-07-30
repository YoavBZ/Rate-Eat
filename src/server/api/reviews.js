const express = require('express');
const router = express.Router();

const Review = require('../model/Review');

// @route POST api/items
// @desc register new user
// @access public

router.post('/', (req, res) => {
    let sum = req.body.bathroomQuality + req.body.staffKindness + req.body.cleanliness +
        req.body.driveThruQuality + req.body.deliverySpeed + req.body.foodQuality;
    if( ( req.body.driveThruQuality > 0 ) && ( req.body.deliverySpeed > 0 ) )
        sum /= 6;
    else if( ( req.body.driveThruQuality > 0 ) || ( req.body.deliverySpeed > 0 ) )
        sum /= 5;
    else
        sum /= 4;

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
        publishDate: Date.now(),
        publishDateTime: Date.now(),
        AVG: sum
    });
    newReview.save()
        .then(review => res.json(review))
        .catch(err => res.status(400).json({message: "you have already reviewed this restaurant"}));
});

router.put('/', (req, res) => {
    let sum = req.body.bathroomQuality + req.body.staffKindness + req.body.cleanliness +
              req.body.driveThruQuality + req.body.deliverySpeed + req.body.foodQuality;
    if( ( req.body.driveThruQuality > 0 ) && ( req.body.deliverySpeed > 0 ) )
        sum /= 6;
    else if( ( req.body.driveThruQuality > 0 ) || ( req.body.deliverySpeed > 0 ) )
        sum /= 5;
    else
        sum /= 4;
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
                "publishDate": Date.now(),
                "publishDateTime": Date.now(),
                "AVG": sum
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

router.post('/someAvg', (req, res) => {
    let restaurantID = req.body.restaurantID.restaurantID;
    let search = req.body.restaurantID.search;
    Review.find(
        {"restaurantID": restaurantID})
        .then( reviews => {

            let newReviews =  reviews.filter( a => {
                let sum = a.bathroomQuality + a.staffKindness + a.cleanliness +
                          a.driveThruQuality + a.deliverySpeed + a.foodQuality;
                if(( a.driveThruQuality > 0 ) && ( a.deliverySpeed > 0 ))
                    sum /= 6;
                else if(( a.driveThruQuality > 0 ) || ( a.deliverySpeed > 0 ))
                    sum /= 5;
                else
                    sum /= 4;

                return (sum >= search );
            } );

            res.json(newReviews);
        })
        .catch(err => res.status(400).json({message: "Failed to retrive reviews"}));
    // TODO: remove review pictures!!
});

module.exports = router;
