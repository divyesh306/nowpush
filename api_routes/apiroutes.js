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

router.post('/addfriends',friendsController.new); // Add Friend 
router.get('/listfriends',friendsController.getAll); //List Of all friends List
router.get('/pendinglist/:friedsid',friendsController.getPendingList); // Particular user pending request List
router.get('/acceptlist/:friedsid',friendsController.getAcceptList); // Particular user accept request list
router.put('/updatestatus/:friedsid',friendsController.update); // Request status update 
router.delete('/deletefriends/:friedsid',friendsController._delete); // Delete Request  
router.get('/friendsList/:friedsid',friendsController.findSingeldata) // Particular User All request 

module.exports = router;