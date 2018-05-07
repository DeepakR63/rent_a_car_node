const { Schema }=require('mongoose');
const { dbConnection }=require('./../controller/dbconnection.js');
const { access, secretKEY }=require('./../config/config.js');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const validator=require('validator');

var loginSchema=new dbConnection.Schema({

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    role:{
        type:String,
        required:true
    },

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
   
})

loginSchema.methods.generateAuthToken=function(){

    var login=this;
    var access='auth';
    var token=jwt.sign({_id:login._id.toHexString(),access },secretKEY).toString();

    login.tokens=login.tokens.concat([{access,token}]);
   return login.save().then(()=>{
        return token;
    })
}

loginSchema.pre('save', function (next) {
    var login = this;

    if (login.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(login.password, salt, (err, hash) => {

                login.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});

loginSchema.statics.findByToken=function(token){
    var user=this;
    var decode;

    console.log('infindbytoken');
    try
    {
        decode=jwt.verify(token,secretKEY);
    }
    catch(error)
    {
        return Promise.reject();
    }

    return user.findOne({
        
        '_id':decode._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
}

var Login=dbConnection.model('Login',loginSchema);

module.exports = { Login };