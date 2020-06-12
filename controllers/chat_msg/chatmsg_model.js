const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    chat_room:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    msg_at:{
        type:Date,
        default:Date.now
    }
});

var Chatmsg = module.exports = mongoose.model('Chatmsg',schema);

module.exports.get = function(callback,limit){
    Chatmsg.find(callback).limit(limit);
}