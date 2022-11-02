const mongoose = require('mongoose');
let NurseSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:String,
    lastname:String,
    CNIC:String,
    phone:String,
    age:String,
    gender:String,
    dob:Date
});
module.exports = mongoose.model('nurse',NurseSchema);