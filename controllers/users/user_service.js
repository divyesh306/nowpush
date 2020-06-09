var User = require('./user_model');

exports.create = async function(userdata) {
    try {
        var userf = await User.findOne({ email : userdata.email });
        if(userf != null){
            var user = await User.findById(userf._id,function(err,users){
                if (err)
                    return err;

                users.username = userdata.username;
                users.device_token = userdata.device_token;
                users.auth_token = userdata.auth_token;
                users.image_url = userdata.image_url;            
                users.save();
            });    
            var res = {
                msg : "Login Success",
                data : user
            }
            return await res;
        };
        if(userf == null){
        var random = parseInt(Math.random() * 1000000);
        let randomfind = await User.findOne({my_id : random});
            if (randomfind == null) {
                var user = new User();
                user.username = userdata.username;
                user.email = userdata.email;
                user.device_token = userdata.device_token;
                user.auth_token = userdata.auth_token;
                user.my_id = random;
                user.image_url = userdata.image_url;            
                user.save();
                var res = {
                    msg : "Register Success",
                    data : user
                }
                return await res;
            }
            else{
                create(userdata)
            }
        }
    } catch (error) {
        return error;
    }    
}

exports.getAll = async function(){
    try {
        return await User.find();
    } catch (error) {
        return error;
    }   
}

exports.getUserById = async function(id){
    try {
        return await User.findById(id);
    } catch (error) {
        return error;
    }   
}

exports.remove = async function(id){
    try {
        return await User.findByIdAndRemove(id);        
    } catch (error) {
        return error;
    }
}