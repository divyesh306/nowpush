const Chatmsg = require("./chatmsg_model");

exports.getchatmsg = async function(chatroomid){
    try {
        const chatlist =await Chatmsg.find({chat_room:chatroomid});
        return await ({ chat : chatlist })  
    } catch (error) {
        return error;
    }   
}

exports.addMsg = async function(chatdata){
    try {
        var chatmsg =new Chatmsg(chatdata);
        chatmsg.save();
        return await chatmsg;
    } catch (error) {
        return error;
    }
}