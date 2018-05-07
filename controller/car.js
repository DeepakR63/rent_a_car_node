const { App, carURL }=require('./../config/config.js');
const { Car } =require('./../model/car.js');
const { authenticate }=require('./../middleware/authenticate.js')

App.post(carURL,(req,res)=>{

    var body=req.body;
    var car=new Car(body);

    car.save().then((doc)=>{
        res.send(doc );
    }).catch((error)=>{
        console.log('Error on process:',error);
    })

})


var getCarCount=(dealer_ID,year)=>{

    return new  Promise((resolve,reject)=>{
       console.log(':::::::::::in count');
        if(year=='null')
        {
            Car.count({Dealer_ID:dealer_ID}).then((carcount)=>{
                console.log('Count::::::::::',carcount);
                resolve(carcount);
            })
            .catch((error)=>{
                reject(0);
            })
        }
        else
        {
            year=parseInt(year,10);

            Car.count({$and:[{Dealer_ID:dealer_ID},{ year:year }]}).then((carcount)=>{
                resolve(carcount);
            })
            .catch((error)=>{
                reject(0);
            })
        }
        
    });
}

//Get all cars.
App.get(carURL,(req,res)=>{

    var limit=3;
    var page=parseInt(req.params.pageindex);
    var startindex=(page-1)*limit;
    getCarCount(req.params.id,req.params.year).then((carcount)=>{
        if(req.params.year=='null')
        {

            
                Car.find({Dealer_ID:req.params.id})
                .sort({ year:'asc'})
                .limit(limit)
                .skip((startindex))
                .populate('features.fuel_Type_ID')
                .populate('Type_ID')
                .populate('Make_ID')
                .populate('Model_ID')
                .populate('Dealer_ID')
                .then((allcars) => {
                    console.log('AllCars:::::::::::',carcount);
                    return res.send({allcars,carcount});

                }, (e) => {
                    
                    res.status(400).send(e);
                })
        }
        else
        {
            req.params.year=parseInt(req.params.year,10);

        

                console.log('year',req.params.year);
                Car.find({$and:[{ Dealer_ID:req.params.id },{ year:req.params.year }]})
                .sort({ year:'asc'})
                .limit(limit)
                .skip((startindex))
                .populate('features.fuel_Type_ID')
                .populate('Type_ID')
                .populate('Make_ID')
                .populate('Model_ID')
                .populate('Dealer_ID')
                .then((allcars) => {

                    return res.send({allcars,carcount});

                }, (e) => {
                    
                    res.status(400).send(e);
                })
            
            
        }
    })
    
})