const friendsService = require('./friends_service');

exports.getAll = function(req,res,next){
    friendsService.getAll()
    .then(friends => res.json(friends))
    .catch(err=>next(err));
}

exports.new = function(req,res,next){
    friendsService.new(req.body)
    .then(friends => res.json(friends))
    .catch(err => next(err));
}

exports._delete = function(req,res,next){
    friendsService.remove(req.params.friedsid)
    .then(friends => res.json("this request Deleted"))
    .catch(err => next(err));
}