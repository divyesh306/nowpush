var express = require('express');
let router = express.Router();

let auth = require('../config/middelware');

let userController = require('../controllers/users/user_controller');
let friendsController = require('../controllers/friends/friends_controller');

router.post('/register',userController.create); // User Register and Login
router.get('/getuser',userController.getuser); // Full User List 
router.route('/user/:user_id')
    .get(userController.getbyid)   // Perticular User Data
    .delete(userController._delete); //  Delete User

router.post('/addfriends',friendsController.new); // Add Friend 
router.get('/listfriends',friendsController.getAll); //List Of all friends List
router.get('/pendinglist/:friedsid',friendsController.getPendingList); // Particular sender user pending request List
router.get('/fetchpendinglist/:friedsid',friendsController.fetchpendinglist); // Particular user Fetch pending request List
router.get('/acceptlist/:friedsid',friendsController.getAcceptList); // Particular user accept request list
router.put('/updatestatus/:friedsid',friendsController.update); // Request status update 
router.delete('/deletefriends/:friedsid',friendsController._delete); // Delete Request  
router.get('/friendsList/:friedsid',friendsController.findSingeldata) // Particular User All request 

module.exports = router;