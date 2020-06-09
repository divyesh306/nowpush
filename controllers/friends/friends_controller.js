const friendsService = require('./friends_service');

/* ------------------------ Get Friens List  -------------*/
exports.getAll = function(req,res,next){
    friendsService.getAll()
    .then(friends => res.json(friends))
    .catch(err=>next({err : err}));
}

exports.findSingeldata = function(req,res,next){  
    friendsService.getSingeluser(req.params.friedsid)
    .then(friends => friends ? res.json(friends) : res.json({msg : "Friends Not Found"}))
    .catch(err=>next({err : err}));
}

/*------------------------------------- Add update Friend List ----------------*/
exports.new = function(req,res,next){
    friendsService.new(req.body)
    .then(friends => res.json(friends))
    .catch(err => next({err : err}));
}

exports.update = function(req,res,next){
    friendsService.updateStatus(req.params.friedsid,req.body)
    .then(friends => res.json(friends))
    .catch(err=>next({err:err}));
}

/* ----------------- Get StatusWise List ---------------*/
exports.getPendingList = function(req,res,next){
    friendsService.getpendinglist(req.params.friedsid)
    .then(friends => friends ? res.json(friends) : res.json({msg : "No Requested Found"}))
    .catch(err=>next({err:err}));
}

exports.getAcceptList = function(req,res,next){
    friendsService.getacceptlist(req.params.friedsid)
    .then(friends => friends ? res.json(friends) : res.json({msg : "No Requested Found"}))
    .catch(err=>next({err:err}));
}

/* ------------ Delete Request  -----------------------*/
exports._delete = function(req,res,next){
    friendsService.remove(req.params.friedsid)
    .then(friends => res.json({msg : "this request Deleted"}))
    .catch(err => next({err : err}));
}