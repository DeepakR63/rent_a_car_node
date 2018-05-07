const mongoose=require('mongoose');
const { mongodbURI }=require('./../config/config.js');

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI);

console.log("::::::::::::::::"+mongodbURI);
var dbConnection=mongoose

module.exports={ dbConnection };
