var chatService = require('./chat_service');

exports.createRoom = function(req,res,next){
    chatService.createRoom(req.body)
    .then(room => res.json(room))
    .catch(err => next(err));
}

exports._delete = function(req,res,next){
    chatService._delete(req.params.chatroomid)
    .then(room => res.json(room))
    .catch(err => next(err));
}