const { Schema }=require('mongoose');
const validator = require('validator');
const { dbConnection }=require('./../controller/dbconnection.js');

var dealerSchema=new dbConnection.Schema({
    
    dealer_Name: {
        type: String,
        required: true
    },

    contact_Name: {
        type: String,
        required: true
    },

    created_On: {
        type: Number,
        default: null
    },

    delaer_Mobile: {
        type: Number,
        required: true,
        validate: {
            validator: validator.isMobilePhone,
            message: '{VALUE} is not a valid mobile'
        }
     
    },

    is_Active: {
        type: Boolean,
        default: true
    },

    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    is_Approved: {
        type: Boolean,
        default: false
    },

    contact_Mobile: {
        type: Number,
        required: true,
        validate: {
            validator: validator.isMobilePhone,
            message: '{VALUE} is not a valid mobile'
        }
    
    },

    address: {
        type: String,
        required: true
    },
    geoLocation: [{

        lat: {
            type: Number
        },

        lng: {
            type: Number
        }
    }],
    
    pincode: {
        type: Number,
        required: true
    },

    geoLocation: [{

        lat: {
            type: Number
        },

        lng: {
            type: Number
        }
    }]
});

var Dealer=dbConnection.model('dealers',dealerSchema);

module.exports = { Dealer };