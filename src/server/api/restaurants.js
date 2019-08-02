const express = require('express');
const router = express.Router();

const Restaurant = require('../model/Restaurant');
const Review = require('../model/Review');
var ObjectID = require('mongodb').ObjectID;

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
    let newBathroomQuality =
        req.body.review.bathroomQuality + ( req.body.review.restaurant.bathroomQuality * scoreNum );
    let newStaffKindness =
        req.body.review.staffKindness + ( req.body.review.restaurant.staffKindness * scoreNum );
    let newCleanliness =
        req.body.review.cleanliness + ( req.body.review.restaurant.cleanliness * scoreNum );
    let newDriveThruQuality =
        req.body.review.driveThruQuality + ( req.body.review.restaurant.driveThruQuality * scoreNum );
    let newDeliverySpeed =
        req.body.review.deliverySpeed + ( req.body.review.restaurant.deliverySpeed * scoreNum );
    let newFoodQuality =
        req.body.review.foodQuality + ( req.body.review.restaurant.foodQuality * scoreNum );

    newScore += sum;
    scoreNum += 1;

    newScore /= scoreNum;
    newBathroomQuality /= scoreNum;
    newStaffKindness /= scoreNum;
    newCleanliness /= scoreNum;

    if( req.body.review.driveThruQuality > 0 )
        newDriveThruQuality /= scoreNum;
    else
        newDriveThruQuality /= ( scoreNum - 1 );
    if( req.body.review.deliverySpeed > 0 )
        newDeliverySpeed /= scoreNum;
    else
        newDeliverySpeed /= ( scoreNum - 1 );

    newFoodQuality /= scoreNum;

    Restaurant.updateOne(
        {"_id": name},
        {
            $set: {
                "score": newScore,
                "bathroomQuality": newBathroomQuality,
                "staffKindness": newStaffKindness,
                "cleanliness": newCleanliness,
                "driveThruQuality": newDriveThruQuality,
                "deliverySpeed": newDeliverySpeed,
                "foodQuality": newFoodQuality,
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
    let key = search.key;

    if(key === 'score'){
        Restaurant.find(
            { "score" : { $gte: avg }})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    }
    else if(key === 'bathroomQuality'){
        Restaurant.find(
            { "bathroomQuality" : { $gte: avg }})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    }
    else if(key === 'StaffKindness'){
        Restaurant.find(
            { "StaffKindness" : { $gte: avg }})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    }
    else if(key === 'cleanliness'){
        Restaurant.find(
            { "cleanliness" : { $gte: avg }})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    }
    else if(key === 'driveThruQuality'){
        Restaurant.find(
            { "driveThruQuality" : { $gte: avg }})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    }
    else if(key === 'deliverySpeed'){
        Restaurant.find(
            { "deliverySpeed" : { $gte: avg }})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    }
    else
    Restaurant.find(
        { "foodQuality" : { $gte: avg }})
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


router.post('/getName', (req, res) => {
    Restaurant.find({"_id": req.body.id})
    .then(restaurant => res.json({name: restaurant[0].name}))
    .catch(err => res.status(400).json({message: "Server Error"}))
});



router.post('/updateRestaurantScore' , (req, res) => {
    console.log(req.body.oldReview)
    console.log(req.body.newReview)

    let oldReview = req.body.oldReview;
    let newReview = req.body.newReview;
    let newSum = newReview.bathroomQuality + newReview.staffKindness + newReview.cleanliness +
    newReview.driveThruQuality + newReview.deliverySpeed + newReview.foodQuality;
    if( ( newReview.driveThruQuality > 0 ) && ( newReview.deliverySpeed > 0 ))
        sum = sum / 6;
    else if( ( newReview.driveThruQuality > 0 ) || ( newReview.deliverySpeed > 0 ))
        sum = sum / 5;
    else
        sum = sum / 4;
    Restaurant.find({"_id":newReview.restaurantID})
    .then(restaurant => {
        let oldScore = restaurant.score;
        let scoreNum = restaurant.scoreNumber;
        let newScore = ((oldScore * scoreNum) - oldScore + sum)/scoreNum ;
        let newBathroomQuality =
            ( restaurant.bathroomQuality * scoreNum - oldReview.bathroomQuality + newReview.bathroomQuality )/scoreNum;
        let newStaffKindness =
            ( restaurant.staffKindness * scoreNum - oldReview.staffKindness + newReview.staffKindness )/scoreNum;
        let newCleanliness =
           ( restaurant.cleanliness * scoreNum - oldReview.cleanliness + newReview.cleanliness )/scoreNum;
        let newDriveThruQuality =
            ( restaurant.driveThruQuality * scoreNum - oldReview.driveThruQuality + newReview.driveThruQuality );
        let newDeliverySpeed =
            ( restaurant.deliverySpeed * scoreNum - oldReview.deliverySpeed + newReview.deliverySpeed );
        let newFoodQuality =
            ( restaurant.foodQuality * scoreNum - oldReview.foodQuality + newReview.foodQuality )/scoreNum;

            
        if( req.body.review.driveThruQuality > 0 )
            newDriveThruQuality /= scoreNum;
        else
            newDriveThruQuality /= ( scoreNum - 1 );
        if( req.body.review.deliverySpeed > 0 )
            newDeliverySpeed /= scoreNum;
        else
            newDeliverySpeed /= ( scoreNum - 1 );
            let name = req.body.review.restaurant._id;

        Restaurant.updateOne(
            {"_id": name},
            {
                $set: {
                    "score": newScore,
                    "bathroomQuality": newBathroomQuality,
                    "staffKindness": newStaffKindness,
                    "cleanliness": newCleanliness,
                    "driveThruQuality": newDriveThruQuality,
                    "deliverySpeed": newDeliverySpeed,
                    "foodQuality": newFoodQuality,
                }
            }).then(restaurant => res.json(restaurant))
            .catch(err => res.status(400).json({message: "Cannot update restaurant score"}));
    })

    .catch(err => res.status(400).json({message: "Cannot update restaurant score"}))
    

});

module.exports = router;

