const { App, carmakeURL }=require('./../config/config.js');
const { Carmake } =require('./../model/master.js');
const { authenticate }=require('./../middleware/authenticate.js')



//Get all Makes.
App.get(carmakeURL,(req,res)=>{

    Carmake.find().then((make) => {

        res.send(make);

    }, (e) => {
        
        res.status(400).send(e);
    })

})