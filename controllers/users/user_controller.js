const userService= require('./user_service');

exports.getuser = function(req,res,next){
    userService.getAll()
        .then(user => res.json(user))
        .catch(err => next(err));
}

exports.getbyid = function(req,res,next){
    userService.getUserById(req.params.user_id)
        .then(user => user ? res.json(user) : res.json("User Not Found"))
        .catch(err=>next(err));
}

exports._delete = function(req,res,next){
    userService.remove(req.params.user_id)
        .then(user => res.json("User Deleted"))
        .catch(err => next(err));
}

exports.create = function(req,res,next){
    userService.create(req.body)
        .then(data => {res.json(data)})
        .catch(err => next(err));
}