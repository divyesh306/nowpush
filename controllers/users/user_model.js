const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username :{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    device_token:{
        type:Array,
        required:true
    },
    auth_token:{
        type:Array,
        required:true
    },
    my_id:{
        type:String,
        required:true
    },
    image_url:{
        type:String
    },
    create_at:{
        type:Date,
        default :Date.now
    }
});

var User = module.exports = mongoose.model('User',schema);

module.exports.get = function(callback,limit){
    User.find(callback).limit(limit);
}