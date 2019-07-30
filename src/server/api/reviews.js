const express = require('express');
const router = express.Router();

const multer  = require('multer')
var upload = multer({ dest: 'reviewUploads/' })
var cpUpload = upload.fields([{ name: 'files[]'}])

const Review = require('../model/Review');
var ObjectID = require('mongodb').ObjectID;


// @route POST api/items
// @desc register new user
// @access public

router.post('/', cpUpload, (req, res) => {
    let pictures = req.files['files[]'].map(file => file.path)
    const newReview = new Review({
        userID: req.body.userID,
        restaurantID: req.body.restaurantID,
        bathroomQuality: req.body.bathroomQuality,
        staffKindness: req.body.staffKindness,
        cleanliness: req.body.cleanliness,
        driveThruQuality: req.body.driveThruQuality,
        deliverySpeed: req.body.deliverySpeed,
        foodQuality: req.body.foodQuality,
        pictures: pictures,
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
        {"_id": ObjectID(req.body.id)})
        .then(review => res.json({message: "review had been removed successfully", id:req.body.id}))
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



router.put('/updateWithPictures', cpUpload, (req, res) => {
    console.log(req.body)
    console.log(req.files)
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
                "pictures": pictures
            }
        })
        .then(review => Review.find({"_id": req.body.id}).then(review => res.json(review[0])).catch(err => res.status(500).json({message: `Server Error`})))
        .catch(err => {console.log(err); res.status(400).json({message: "update had failed"})});
});




module.exports = router;
