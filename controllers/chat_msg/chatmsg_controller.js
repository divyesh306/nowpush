var chatmsgService = require('./chatmsg_service');

exports.getChatroom = function(req,res,next){
    chatmsgService.getchatmsg(req.params.chatroomid)
        .then(chatmsg => res.json(chatmsg))
        .catch(err => next(err));
}

exports.addChat = function(req,res,next){
    chatmsgService.addMsg(req.body)
        .then(chatmsg => res.json(chatmsg))
        .catch(err => next(err));
}