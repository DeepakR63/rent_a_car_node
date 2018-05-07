require('./../controller/branch.js');
require('./../controller/employee.js');
require('./../controller/dealer.js');
require('./../controller/car.js');
require('./../controller/login.js');
require('./../controller/carmodel.js');
require('./../controller/fuelmodel.js');
require('./../controller/carmake.js');
require('./../controller/cartype.js');

const { PORT, App }=require('./../config/config.js');





App.listen(PORT,()=>{
    console.log('Connection established on the PORT : ',PORT);
    
});