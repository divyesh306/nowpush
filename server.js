const http = require("http");
const express = require("express");
const BodyParser = require("body-parser");
let mongoose = require('mongoose');
var cors = require('cors');
const apiRoutes = require('./api_routes/apiroutes');

let app =express();
const server = http.Server(app);
const io = require('socket.io')(server);
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/nowpushdb', { useNewUrlParser: true});
var db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
    
app.use('/api',apiRoutes);
const port = process.env.PORT || 4010;
var Chatmsg = require("./controllers/chat_msg/chatmsg_model");
app.post('/api/messages', (req, res) => {
    var message = new Chatmsg();
    message
    message.save((err) =>{
      if(err)
        sendStatus(500);
    //   io.emit('message', req.body);
      io.in(req.body.chat_room).emit("new message",{user:req.body.username,message:req.body.msg})
      res.sendStatus(200);
    })
  })


io.on('connection',(socket) => {
    console.log("User Connected");
    socket.on('join' ,function(data){
        socket.join(data.touser);
        console.log(data.user + " join the chat : " + data.touser);
        socket.broadcast.to(data.touser).emit("new user joined", {user:data.user, message:"Has connected. "});
    });
    
    socket.on('leave', function(data){
        console.log(data.user + " left Chat : " + data.touser);
        socket.broadcast.to(data.touser).emit("left user",{user:data.user, message:'has left'});
        socket.leave(data.touser);
    });

    socket.on('message',function(data){
      var messages = new Chatmsg();
      messages.chat_room = data.touser;
      messages.user = data.user;
      messages.message = data.message;
      messages.save((err) =>{
        if(err)
          console.log(err)
      io.in(data.touser).emit("new message",{user:data.user,message:data.message})
      })
    });
    // socket.on('message',function(data){
    //     io.in(data.touser).emit("new message",{user:data.user,message:data.message})
    // });

    socket.on("initial_data", () => {
        collection_foodItems.find({}).then(docs => {
          io.sockets.emit("get_data", docs);
        });
      });
})

server.listen(port,function(){
	console.log(`Server running at ` + port);
})