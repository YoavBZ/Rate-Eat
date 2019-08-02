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

router.post('/updateScore', (req, res) => {

    let divider = 4;

    let sum = parseInt(req.body.review.bathroomQuality) + parseInt(req.body.review.staffKindness) +
        parseInt(req.body.review.cleanliness) + parseInt(req.body.review.foodQuality);

    if (req.body.review.driveThruQuality !== null) {
        sum += parseInt(req.body.review.driveThruQuality);
        divider++;
    }

    if (req.body.review.deliverySpeed !== null) {
        sum += parseInt(req.body.review.deliverySpeed);
        divider++;
    }

    sum /= divider;

    let name = req.body.review.restaurant._id;
    let oldScore = parseInt(req.body.review.restaurant.score);
    let scoreNum = parseInt(req.body.review.restaurant.scoreNumber);

    let newScore = oldScore * scoreNum;
    let newBathroomQuality = parseInt(req.body.review.bathroomQuality) +
        (parseInt(req.body.review.restaurant.bathroomQuality) * scoreNum);
    let newStaffKindness = parseInt(req.body.review.staffKindness) +
        (parseInt(req.body.review.restaurant.staffKindness) * scoreNum);
    let newCleanliness = parseInt(req.body.review.cleanliness) +
        (parseInt(req.body.review.restaurant.cleanliness) * scoreNum);
    let newFoodQuality = parseInt(req.body.review.foodQuality) +
        (parseInt(req.body.review.restaurant.foodQuality) * scoreNum);

    let newDriveThruQuality = (parseInt(req.body.review.restaurant.driveThruQuality) * scoreNum);
    let newDeliverySpeed = (parseInt(req.body.review.restaurant.deliverySpeed) * scoreNum);

    if (req.body.review.driveThruQuality !== null)
        newDriveThruQuality += parseInt(req.body.review.driveThruQuality);

    if (req.body.review.deliverySpeed !== null)
        newDeliverySpeed += parseInt(req.body.review.deliverySpeed);

    newScore += sum;
    scoreNum += 1;

    newScore /= scoreNum;
    newBathroomQuality /= scoreNum;
    newStaffKindness /= scoreNum;
    newCleanliness /= scoreNum;
    newFoodQuality /= scoreNum;

    if (req.body.review.driveThruQuality !== null)
        newDriveThruQuality /= scoreNum;
    else {
        if (scoreNum !== 1)
            newDriveThruQuality /= (scoreNum - 1);

    }
    if (req.body.review.deliverySpeed !== null)
        newDeliverySpeed /= scoreNum;
    else {
        if (scoreNum !== 1)
            newDeliverySpeed /= (scoreNum - 1);

    }
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
        {"name": {$regex: name}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/someLocation', (req, res) => {
    let search = req.body.search;
    let location = search.search;

    Restaurant.find(
        {"location": {$regex: location}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/someAVG', (req, res) => {
    let search = req.body.search;
    let avg = search.search;
    let key = search.key;

    if (key === 'score') {
        Restaurant.find(
            {"score": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    } else if (key === 'bathroomQuality') {
        Restaurant.find(
            {"bathroomQuality": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    } else if (key === 'StaffKindness') {
        Restaurant.find(
            {"StaffKindness": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    } else if (key === 'cleanliness') {
        Restaurant.find(
            {"cleanliness": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    } else if (key === 'driveThruQuality') {
        Restaurant.find(
            {"driveThruQuality": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    } else if (key === 'deliverySpeed') {
        Restaurant.find(
            {"deliverySpeed": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
    } else
        Restaurant.find(
            {"foodQuality": {$gte: avg}})
            .then(user => res.json(user))
            .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/someAll', (req, res) => {
    let search = req.body.search;
    let name = search.search;
    let location = search.location;
    let avg = search.avg;

    Restaurant.find(
        {"name": {$regex: name}, "location": {$regex: location}, "score": {$gte: avg}})
        .then(user => res.json(user))
        .catch(err => res.status(400).json({message: "Failed to retrive restaurant"}));
});

router.post('/getName', (req, res) => {
    Restaurant.find({"_id": req.body.id})
        .then(restaurant => res.json({name: restaurant[0].name}))
        .catch(err => res.status(400).json({message: "Server Error"}))
});



router.post('/updateRestaurantScore' , (req, res) => {
    let oldReview = req.body.oldReview;
    let newReview = req.body.newReview;

    let divider = 4;
    let newSum = (newReview.bathroomQuality + newReview.staffKindness + newReview.cleanliness + newReview.foodQuality);

    if( newReview.driveThruQuality != 0 ){
        newSum += parseInt(newReview.driveThruQuality);
        divider++;
    }

    if( newReview.deliverySpeed != 0 ) {
        newSum += parseInt(newReview.deliverySpeed);
        divider++;
    }

    newSum /= divider;

    Restaurant.find({"_id":ObjectID(oldReview.restaurantID)})
    .then(restaurant => {
        restaurant = restaurant[0]
        let oldScore = restaurant.score;
        let scoreNum = restaurant.scoreNumber;
        let newScore = ((oldScore * scoreNum) - oldReview.AVG + newSum)/scoreNum ;
        let newBathroomQuality =
            ( restaurant.bathroomQuality * scoreNum - oldReview.bathroomQuality + newReview.bathroomQuality )/scoreNum;
        let newStaffKindness =
            ( restaurant.staffKindness * scoreNum - oldReview.staffKindness + newReview.staffKindness )/scoreNum;
        let newCleanliness =
           ( restaurant.cleanliness * scoreNum - oldReview.cleanliness + newReview.cleanliness )/scoreNum;
        let newFoodQuality =
            ( restaurant.foodQuality * scoreNum - oldReview.foodQuality + newReview.foodQuality )/scoreNum;


        let newDriveThruQuality = (parseInt(restaurant.driveThruQuality) * scoreNum );
        let newDeliverySpeed = (parseInt(restaurant.deliverySpeed) * scoreNum );

        if( newReview.driveThruQuality !== null )
            newDriveThruQuality += parseInt(newReview.driveThruQuality);

        if( newReview.deliverySpeed !== null )
            newDeliverySpeed += parseInt(newReview.deliverySpeed);

        if( newReview.driveThruQuality !== null )
            newDriveThruQuality /= scoreNum;
        else {
            if( scoreNum !== 1 )
                newDriveThruQuality /= (scoreNum - 1);
    
        }
        if( newReview.deliverySpeed !== null )
            newDeliverySpeed /= scoreNum;
        else {
            if( scoreNum !== 1 )
                newDeliverySpeed /= (scoreNum - 1);
    
        }
        
        Restaurant.updateOne(
            {"_id": ObjectID(restaurant._id)},
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
            }).then(restaurant =>  res.json(restaurant))
            .catch(err =>res.status(400).json({message: "Cannot update restaurant score"}));
    })

    .catch(err => res.status(400).json({message: "Cannot update restaurant score"}))
    

});

module.exports = router;

