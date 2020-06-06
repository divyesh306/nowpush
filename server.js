const http = require("http");
const express = require("express");
const BodyParser = require("body-parser");
let mongoose = require('mongoose');
var cors = require('cors');
const apiRoutes = require('./api_routes/apiroutes');

let app =express();
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

app.listen(port,function(){
	console.log(`Server running at ` + port);
})