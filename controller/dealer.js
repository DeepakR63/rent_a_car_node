const { App, dealerURL, dealerprofileURL }=require('./../config/config.js');
const { Dealer } =require('./../model/dealer.js');
const { authenticate }=require('./../middleware/authenticate.js');


// Get Logined dealer profile
App.get(dealerprofileURL,(req,res)=>{

    Dealer.findOne({email:req.params.email}).then((dealer) => {
       
        res.send(dealer);

    }, (e) => {

        res.status(400).send(e);
    })
})