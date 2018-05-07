const { App, employeeURL,SENDGRID_API_KEY }=require('./../config/config.js');
const { Employee } =require('./../model/employee.js');

const sgMail = require('@sendgrid/mail');
const { Login }=require('./../model/login.js')

const { authenticate }=require('./../middleware/authenticate.js')

function sendMail(body)
{
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {

        to: body.email,
        from: 'deepak.r@experionglobal.com',
        subject: 'Invitation to Car-Port',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>Dear '+body.name+',</strong><br> You are connected to the Rent a Car<br><hr><strong>Regards,<br>Deepak R<br>Dealer, Trivandrum branch.</strong>',

    };
    sgMail.send(msg);
}

function saveLogin(body,res)
{
    var loginbody={

        username:body.email,
        password:body.password,
        role:body.role
    };

    var login=new Login(loginbody);

    login.save().then(()=>{

        sendMail(body);
        return login.generateAuthToken();

    }).then((token)=>{

        res.send(token);
        
    }).catch((error)=>{

        res.send(error);
    })

}

App.post(employeeURL,(req,res)=>{

    var body=req.body;
    var employee=new Employee(body);

    employee.save().then((doc)=>{

        saveLogin(body,res);

    }).catch((error)=>{

        res.send(error);
    })
})

var getEmployeeCount=(dealer_ID,name)=>{

    return new  Promise((resolve,reject)=>{
       console.log(':::::::::::in count');
        if(name=='null')
        {
            Employee.count({dealer_ID:dealer_ID}).then((employeecount)=>{
                console.log('Count::::::::::',employeecount);
                resolve(employeecount);
            })
            .catch((error)=>{
                reject(0);
            })
        }
        else
        {

            Employee.count({$and:[{dealer_ID:dealer_ID},{ name:name }]}).then((employeecount)=>{
                resolve(employeecount);
            })
            .catch((error)=>{
                reject(0);
            })
        }
        
    });
}
//Get all employees.
App.get(employeeURL,(req,res)=>{

    var limit=8;
    var page=parseInt(req.params.pageindex);
    var startindex=(page-1)*limit;

    getEmployeeCount(req.params.id,req.params.name).then((employeecount)=>{
        if(req.params.name=='null')
        {
            Employee.find({dealer_ID:req.params.id})
            .sort({ name:'asc'})
            .limit(limit)
            .skip((startindex))
            .then((employees)=>{

                res.send({employees, employeecount});
            
            }).catch((err)=>{

                res.send(err );
            })
        }
        else
        {
            Employee.find({$and:[{ dealer_ID:req.params.id },{ name:{ '$regex': '^'+req.params.name, '$options': 'i' } }]})
            .sort({ name:'asc'})
            .limit(limit)
            .skip((startindex))           
            .then((employees)=>{

                res.send({employees, employeecount});
            
            }).catch((err)=>{

                res.send(err );
            })
        }
    })
})