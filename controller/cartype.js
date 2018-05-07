const { App, cartypeURL }=require('./../config/config.js');
const { Cartype } =require('./../model/master.js');
const { authenticate }=require('./../middleware/authenticate.js')



//Get all Makes.
App.get(cartypeURL,(req,res)=>{

    Cartype.find().then((type) => {

        res.send(type);
        
    }, (e) => {

        res.status(400).send(e);
    })

})