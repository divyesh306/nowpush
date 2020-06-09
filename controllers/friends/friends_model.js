const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reciver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type:String,
        required:true
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

var Friends = module.exports = mongoose.model('Friends',schema);

module.exports.get = function(callback,limit){
    Friends.find(callback).limit(limit);
}