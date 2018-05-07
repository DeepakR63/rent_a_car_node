
const { App, branchURL }=require('./../config/config.js');
const { Branch } =require('./../model/branch.js');
const { authenticate }=require('./../middleware/authenticate.js')


App.post(branchURL,(req,res)=>{

    var body=req.body;
    var branch=new Branch(body);

    branch.save().then((doc)=>{
        res.send('saved '+ doc );
    }).catch((error)=>{
        console.log('Error on process:',error);
    })



})

//Get all branches.
App.get(branchURL,authenticate,(req,res)=>{

    Branch.find().then((allbranches) => {

        var _selectedbranches=allbranches.branch.filter((branch)=>branch.dealer_ID===req.params.id);
        res.send(_selectedbranches);

    }, (e) => {
        
        res.status(400).send(e);
    })



})


