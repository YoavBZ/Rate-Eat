let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    id: String,
    name: String,
    location: String
});

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);