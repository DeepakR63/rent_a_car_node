const { App, carfuelURL }=require('./../config/config.js');
const { FuelModel } =require('./../model/master.js');
const { authenticate }=require('./../middleware/authenticate.js')



//Get all FuelModels.
App.get(carfuelURL,(req,res)=>{

    FuelModel.find().then((fuelmodel) => {

        res.send(fuelmodel);

    }, (e) => {
        
        res.status(400).send(e);
    })

})