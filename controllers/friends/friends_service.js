const Friends = require('./friends_model');

exports.getAll = async function(){
    var data  = await Friends
    .find()
    .populate('User','username')
    .select('sender_id reciver_id');

    console.log("Friends : " ,data);

    //  Friends.find();
}

exports.new = async function (friendsdata){
    if(await Friends.findOne({sender_id : friendsdata.sender_id , reciver_id:friendsdata.reciver_id})){
        return await "You Both Are Already Friend"
    }
    else if(await Friends.findOne({sender_id : friendsdata.reciver_id , reciver_id:friendsdata.sender_id})){
      return await "You Both Are Already Friend"
    }

    var friends = new Friends();
    friends.sender_id = friendsdata.sender_id;
    friends.reciver_id = friendsdata.reciver_id;
    return await friends.save();
}

exports.remove = async function(id){
    return await Friends.findByIdAndRemove(id);
}