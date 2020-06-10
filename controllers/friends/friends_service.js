const Friends = require('./friends_model');
const User = require('../users/user_model');

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
        var data = await Friends.find({sender_id:id , status : 'Pending'})
        .populate('reciver_id',['username','email','image_url'])
        .exec();
        return await data; 
    } catch (error) {
        return error;
    }
}

exports.fetchpendinglist = async function(id){
    try {
        var data = await Friends.find({reciver_id:id , status : 'Pending'})
        .populate('sender_id',['username','email','image_url'])
        .exec();
        return await data; 
    } catch (error) {
        return error;
    }
}

exports.searchFriends = async function(friendsdata){
    try {
        var userdata = await User.findOne({email:friendsdata.email});
        if(userdata != null)
            var friends = await Friends.findOne({sender_id:friendsdata.sender_id , reciver_id:userdata._id});
             if(friends == null)
                return await "Friends not found";

            return await friends;
        
    } catch (error) {
        return error;
    }
}
exports.getacceptlist = async function(id){
    try {
        var data ={
            sender_data :{},
            reciver_data :{}
        };
        var sender_datas = await Friends.find({sender_id:id , status : 'Accept'})
        .populate('sender_id',['username','email','image_url'])
        .populate('reciver_id',['username','email','image_url'])
        .exec();
        data.sender_data = sender_datas;
        var reciver_datas = await Friends.find({reciver_id:id , status : 'Accept'})
        .populate('sender_id',['username','email','image_url'])
        .populate('reciver_id',['username','email','image_url'])
        .exec();
        data.reciver_data = reciver_datas;

        // var datad = await Friends.find({ $or: [ { sender_id:id , status : 'Accept' }, { reciver_id:id , status : 'Accept' } ] })
        // .populate('sender_id',['username','email','image_url'])
        // .populate('reciver_id',['username','email','image_url'])
        // .exec();
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

exports.updateStatus = async function (friendsdata){
    try {
        var findfriends = await Friends.findById(friendsdata._id);
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