var express = require('express');
let router = express.Router();

let auth = require('../config/middelware');

let userController = require('../controllers/users/user_controller');
let friendsController = require('../controllers/friends/friends_controller');

router.post('/register',userController.create);
router.get('/getuser',userController.getuser);
router.route('/user/:user_id')
    .get(userController.getbyid)
    .delete(userController._delete);

router.post('/addfriends',friendsController.new);
router.get('/listfriends',friendsController.getAll);
router.delete('/deletefriends',friendsController._delete)

module.exports = router;