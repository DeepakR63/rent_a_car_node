const { App, carmodelURL }=require('./../config/config.js');
const { Carmodel } =require('./../model/master.js');
const { authenticate }=require('./../middleware/authenticate.js')



//Get all Makes.
App.get(carmodelURL,(req,res)=>{

    Carmodel.find().then((model) => {

        res.send(model);

    }, (e) => {
        
        res.status(400).send(e);
    })

})