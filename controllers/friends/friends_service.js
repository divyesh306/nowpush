const Friends = require('./friends_model');

exports.getAll = async function(){
    try {
         var data  = await Friends.find({})
        .populate('sender_id',['username','email'])
        .populate('reciver_id',['username','email'])
        .exec();
        return await data;
    } catch (error) {
        return error;
    }   
}
exports.getSingeluser =async function(id){
    try {
        var data = await Friends.find({sender_id:id})
        .populate('reciver_id',['username','email','image_url'])
        .exec();
        return await data;   
    } catch (error) {
        return (error);
    }
}

exports.getpendinglist = async function(id){
    try {
        var data = await Friends.find({sender_id:id , status : 'pending'})
        .populate('reciver_id',['username','email','image_url'])
        .exec();
        return await data; 
    } catch (error) {
        return error;
    }
}
exports.getacceptlist = async function(id){
    try {
        var data = await Friends.find({sender_id:id , status : 'accept'})
        .populate('reciver_id',['username','email','image_url'])
        .exec();
        return await data; 
    } catch (error) {
        return error;
    }
}

exports.new = async function (friendsdata){
    try {
        if(await Friends.findOne({sender_id : friendsdata.sender_id , reciver_id:friendsdata.reciver_id})){
            return await "You Both Are Already Friend"
        }
        else if(await Friends.findOne({sender_id : friendsdata.reciver_id , reciver_id:friendsdata.sender_id})){
            return await "You Both Are Already Friend"
        }

        var friends = new Friends();
        friends.sender_id = friendsdata.sender_id;
        friends.reciver_id = friendsdata.reciver_id;
        friends.status = friendsdata.status;
        return await friends.save();
    } catch (error) {
        return error;
    }
   
}

exports.updateStatus = async function (id,friendsdata){
    try {
        var findfriends = await Friends.findById(id);
        if(findfriends.status == friendsdata.status){
            return await "You Both Are Already Friend"
        };
        
        findfriends.status = friendsdata.status;
        findfriends.save();
        return await findfriends;
    } catch (error) {
        return error;
    }   
}

exports.remove = async function(id){
    try {
         return await Friends.findByIdAndRemove(id);
    } catch (error) {
        return error;
    }   
}