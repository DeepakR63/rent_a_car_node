
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

var App=express();

var PORT=3000;

var mongodbURI='mongodb://deepak:deepak@ds251727.mlab.com:51727/rentacar';

var employeeURL='/home/employee/:id/:name/:pageindex';
var branchURL='/home/branch/:id';
var carURL='/home/car/:id/:year/:pageindex';
var loginURL='/login';
var dealerURL='/home/dealer/:id';
var dealerprofileURL='/home/dealer/profile/:email';
var  carmakeURL='/carmake';
var carmodelURL='/carmodel';
var carfuelURL='/carfuel';
var cartypeURL='/cartype';

var access='auth';
var secretKEY='deepak@123Only';

var SENDGRID_API_KEY='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'

App.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,x-auth');
    res.header('Access-Control-Expose-Headers', 'x-auth');
    next();
});

App.use(bodyParser.json());


module.exports={ 
    mongodbURI, 

    employeeURL, 
    branchURL, 
    carURL, 
    loginURL, 
    dealerURL,
    dealerprofileURL,

    carmakeURL,
    cartypeURL,
    carmodelURL,
    carfuelURL,

    PORT,
    App,

    SENDGRID_API_KEY,
    access,
    secretKEY
};