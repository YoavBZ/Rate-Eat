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
                "pictures": req.body.pictures,
                "publishDate": Date.now(),
                "publishDateTime": Date.now(),
                "AVG": sum
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
    let sum = req.body.bathroomQuality + req.body.staffKindness + req.body.cleanliness +
    req.body.driveThruQuality + req.body.deliverySpeed + req.body.foodQuality;
    if( ( req.body.driveThruQuality > 0 ) && ( req.body.deliverySpeed > 0 ) )
        sum /= 6;
    else if( ( req.body.driveThruQuality > 0 ) || ( req.body.deliverySpeed > 0 ) )
        sum /= 5;
    else
        sum /= 4;

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
        .catch(err => {console.log(err); res.status(400).json({message: "update had failed"})});
});




module.exports = router;
