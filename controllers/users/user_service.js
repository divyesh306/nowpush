var User = require('./user_model');

exports.login  = async function({username}){
    
}

exports.create = async function(userdata) {
    console.log("userdata : ",userdata.email);    
    if(await User.findOne({ email : userdata.email })){
        return "this email id is already registered";
    };    
    var random = parseInt(Math.random() * 1000000);
	await User.find({
		where:{
			'my_id' : random
		}
	},function(err,data){
		if (data.length == 0) {   
            var user = new User();
            user.username = userdata.username;
            user.email = userdata.email;
            user.device_token = userdata.device_token;
            user.auth_token = userdata.auth_token;
            user.my_id = random;
            user.image_url = userdata.image_url;            
            user.save();
            console.log("User : ",user)
        }
        else{
            create(userdata)
        };
    });
}

exports.update = async function(id,userdata){
    const user = User.findById(id);
    if(!user){
        throw "User Not Found";
    }
    userdata.device_token =  user.device_token.push(userdata.device_token);
    Object.assign(user,userdata)
    await user.save();
}

exports.getAll = async function(){
    return await User.find();
}

exports.getUserById = async function(id){
    return await User.findById(id);
}

exports.remove = async function(id){
    return await User.findByIdAndRemove(id);
}