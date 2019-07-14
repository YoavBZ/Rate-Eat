let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    id: String,
    userID: String,
    restaurantID: String,
    bathroomQuality: Number,
    staffKindness: Number,
    cleanliness: Number,
    driveThruQuality: Number,
    deliverySpeed: Number,
    foodQuality: Number,
    pictures: [String],
    publishDate: Date
});

module.exports = Review = mongoose.model('review', ReviewSchema);
