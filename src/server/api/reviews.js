const express = require('express');
const router = express.Router();

const multer  = require('multer')
var upload = multer({ dest: 'reviewUploads/' })
var cpUpload = upload.fields([{ name: 'files[]'}])

const Review = require('../model/Review');
const Restaurant = require('../model/Restaurant');
var ObjectID = require('mongodb').ObjectID;


// @route POST api/items
// @desc register new user
// @access public

router.post('/', cpUpload, (req, res) => {
    let pictures = req.files['files[]'].map(file => file.path)
    let divider = 4;

    let sum = parseInt(req.body.bathroomQuality) + parseInt(req.body.staffKindness) +
              parseInt(req.body.cleanliness) + parseInt(req.body.foodQuality);


    if( req.body.driveThruQuality !== 'null' ){
        sum += parseInt(req.body.driveThruQuality);
        divider++;
    }

    if( req.body.deliverySpeed !== 'null' ) {
        sum += parseInt(req.body.deliverySpeed);
        divider++;
    }

    sum /= divider;


    const newReview = new Review({
        userID: req.body.userID,
        restaurantID: req.body.restaurantID,
        bathroomQuality: parseInt(req.body.bathroomQuality),
        staffKindness: parseInt(req.body.staffKindness),
        cleanliness: parseInt(req.body.cleanliness),
        driveThruQuality: (req.body.driveThruQuality !== 'null' ? parseInt(req.body.driveThruQuality) : 0 ),
        deliverySpeed: (req.body.deliverySpeed !== 'null' ? parseInt(req.body.deliverySpeed) : 0 ),
        foodQuality: parseInt(req.body.foodQuality),
        pictures: pictures,
        publishDate: Date.now(),
        publishDateTime: Date.now(),
        AVG: sum
    });
    newReview.save()
        .then(review => res.json(review))
        .catch(err => res.status(400).json({message: "you have already reviewed this restaurant"}));
});

router.put('/', (req, res) => {
    let review = req.body.review

    let divider = 4;

    let sum = review.bathroomQuality + review.staffKindness +
        review.cleanliness + review.foodQuality


    if( review.driveThruQuality != 0 ){
        sum += review.driveThruQuality;
        divider++;
    }

    if( review.deliverySpeed != 0 ) {
        sum += review.deliverySpeed;
        divider++;
    }

    sum /= divider;
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
                "publishDate": Date.now(),
                "publishDateTime": Date.now(),
                "AVG": sum
            }
        })
        .then(review => Review.find({"_id": req.body.review.id}).then(review =>res.json(review[0])).catch(err => res.status(500).json({message: `Server Error`})))
        .catch(err => res.status(400).json({message: "update had failed"}));
});

router.delete('/', (req, res) => {
    // console.log(req.body)
    let review = req.body.review
    console.log(review.restaurantID)
    Restaurant.find(
        {"_id": ObjectID(review.restaurantID)})
        .then(restaurant =>{
            restaurant = restaurant[0]
            console.log(restaurant)
            let oldScore = restaurant.score;
            let scoreNum = restaurant.scoreNumber;
            let updateRestaurant = undefined
            if(scoreNum == 1){
                updateRestaurant = {
                    "bathroomQuality": 0,
                    "staffKindness": 0,
                    "cleanliness": 0,
                    "driveThruQuality": 0,
                    "deliverySpeed": 0,
                    "foodQuality": 0,
                    "score": 0,
                    "scoreNumber":0
                }
            }else{
                let newScoreNum = restaurant.scoreNumber -1;
                let newScore = ((oldScore * scoreNum) - review.AVG)/newScoreNum ;
                let newBathroomQuality =
                    ( restaurant.bathroomQuality * scoreNum - review.bathroomQuality)/newScoreNum;
                let newStaffKindness =
                    ( restaurant.staffKindness * scoreNum - review.staffKindness)/newScoreNum;
                let newCleanliness =
                    ( restaurant.cleanliness * scoreNum - review.cleanliness)/newScoreNum;
                let newDriveThruQuality =
                    ( restaurant.driveThruQuality * scoreNum - review.driveThruQuality )/newScore;
                let newDeliverySpeed =
                    ( restaurant.deliverySpeed * scoreNum - review.deliverySpeed )/newScore;
                let newFoodQuality =
                    ( restaurant.foodQuality * scoreNum - review.foodQuality)/newScoreNum;

                updateRestaurant = {
                    "bathroomQuality": newBathroomQuality,
                    "staffKindness": newStaffKindness,
                    "cleanliness": newCleanliness,
                    "driveThruQuality": newDriveThruQuality,
                    "deliverySpeed": newDeliverySpeed,
                    "foodQuality": newFoodQuality,
                    "score": newScore,
                    "scoreNumber":newScoreNum
                }
            }
            Restaurant.updateOne(
                {"_id": ObjectID(restaurant._id)},
                {$set: updateRestaurant})
                .then(data => Review.deleteOne({"_id": ObjectID(review._id)}))
                    .then(deleteAck => res.json({message: "review had been removed successfully", id:review._id}))
                    .catch(err => res.status(400).json({message: "remove had failed"}))
                .catch(err =>{console.log(err); res.status(400).json({message: "remove had failed"})})
        })
        .catch(err => res.status(400).json({message: "remove had failed"}))
    // Review.deleteOne(
    //     {"_id": ObjectID(req.body.id)})
    //     .then(review => res.json({message: "review had been removed successfully", id:req.body.id}))
    //     .catch(err => res.status(400).json({message: "remove had failed"}));
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



router.post('/someDate', (req, res) => {
    let restaurantID = req.body.restaurantID;
    let search = req.body.search;
    Review.find(
        {"restaurantID": restaurantID})
        .then( reviews => {

            let newReviews =  reviews.filter( a => {
                let nowValue = Date.now();
                return ( nowValue - a.publishDateTime ) < search;
            } );

            res.json(newReviews);
        })
        .catch(err => res.status(400).json({message: "Failed to retrive reviews"}));
    // TODO: remove review pictures!!
});



router.put('/updateWithPictures', cpUpload, (req, res) => {
    let review = req.body

    let divider = 4;

    let sum = review.bathroomQuality + review.staffKindness +
        review.cleanliness + review.foodQuality


    if( req.body.driveThruQuality != 0 ){
        sum += review.driveThruQuality;
        divider++;
    }

    if( req.body.deliverySpeed != 0 ) {
        sum += review.deliverySpeed;
        divider++;
    }

    sum /= divider;

    let pictures = req.files['files[]'].map(file => file.path)
    Review.updateOne(
        {"_id": ObjectID(req.body.id)},
        {
            $set: {
                "bathroomQuality": req.body.bathroomQuality,
                "staffKindness": req.body.staffKindness,
                "cleanliness": req.body.cleanliness,
                "driveThruQuality": req.body.driveThruQuality,
                "deliverySpeed": req.body.deliverySpeed,
                "foodQuality": req.body.foodQuality,
                "pictures": pictures,
                "AVG": sum
            }
        })
        .then(review => Review.find({"_id": req.body.id}).then(review => res.json(review[0])).catch(err => res.status(500).json({message: `Server Error`})))
        .catch(err => res.status(400).json({message: "update had failed"}));
});




module.exports = router;
