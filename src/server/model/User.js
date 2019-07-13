let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    picture: String,
    location: String,
    reviews: [String]
});

module.exports = User = mongoose.model('user', UserSchema);
