const Chat = require('./chat_model');

exports.createRoom = async function(chatdata){
   try {    
    var searchchatroom = await Chat.find({$or :[{sender_id : chatdata.sender_id , reciver_id : chatdata.reciver_id},{sender_id : chatdata.reciver_id , reciver_id : chatdata.sender_id}]});

    if(searchchatroom == null || searchchatroom == undefined || searchchatroom.length <= 0){
        var random = parseInt(Math.random() * 100000000);
        var randomfind = await Chat.findOne({chat_room : random});
        if(!randomfind){
            var chat = new Chat();
            chat.sender_id = chatdata.sender_id;
            chat.reciver_id =chatdata.reciver_id;
            chat.chat_room = random; 
            chat.save();
            return await chat;
        }
        else{
            createRoom(chatdata);
        }  
    }  
    return await searchchatroom; 
    
   } catch (error) {
       return error;
   }
}

exports._delete = async function(id){
    return await Chat.findByIdAndRemove(id);
}