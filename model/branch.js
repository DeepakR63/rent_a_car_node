
const { Schema }=require('mongoose');
const { dbConnection }=require('./../controller/dbconnection.js');


var branchSchema=new dbConnection.Schema({
    
    location:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    mobile:{
        type:Number,
        required:true,
    },

    dealer_ID:[{ type:Schema.Types.ObjectId,ref:'dealers' }]
})

var Branch=dbConnection.model('branchs',branchSchema);

module.exports = { Branch };