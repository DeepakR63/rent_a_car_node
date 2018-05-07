
const { Schema }=require('mongoose');
const validator=require('validator');
const { dbConnection }=require('./../controller/dbconnection.js');


var carSchema=new dbConnection.Schema({
    
    kilometers:{
        type:Number,
        required:true
    },

    is_Active:{
        type: Boolean,
        default: false
    },

    is_Rented:{
        type: Boolean,
        default: false
    },

    mileage: {
        type: Number,
        required: true,
    },

    year:{
        type:Number,
        required:true
    },

    features: [{

        exterior_Colour: {
            type: String
        },

        interior_Colour: {
            type: String
        },

        price:{
            type:Number
        },

        seater:{
            type:Number
        },

        is_AC:{
            type:Boolean
        },

        has_ABS:{
            type:Boolean
        },

        has_EBD:{
            type:Boolean
        },

        engine:{
            type:String
        },

        fuel_Type_ID: [{ type: Schema.Types.ObjectId, ref: 'fueltypes' }],
    }],

    Type_ID: [{ type: Schema.Types.ObjectId, ref: 'cartypes' }],
    Make_ID: [{ type: Schema.Types.ObjectId, ref: 'carmakes' }],
    Model_ID: [{ type: Schema.Types.ObjectId, ref: 'carmodels' }],
    Dealer_ID: [{ type: Schema.Types.ObjectId, ref: 'dealers' }]
})

var Car=dbConnection.model('cars',carSchema);

module.exports = { Car };