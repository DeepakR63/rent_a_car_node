const { App, loginURL }=require('./../config/config.js');
const { Login } =require('./../model/login.js');
const bcrypt=require('bcryptjs');


var checkPassword=(logindetails,userpassword)=>{

    return new  Promise((resolve,reject)=>{
       
        bcrypt.compare(userpassword,logindetails.password,(error,result)=>{

            console.log("result",result);

            if(result===true)
            {
                resolve(true);
            }
            else
            {
                reject(false);
            }
        })
        
    });
}

function doLogin(username,password,res)
{
    Login.findOne({ username:username },'_id username password role tokens',(error,logindetails)=>{

        if(!logindetails)
        {
            res.send('invalid_username');
        }
        else
        {
            console.log(logindetails);
            checkPassword(logindetails,password).then((result)=>{
                
                console.log('Result True..')
                res.header('x-auth',logindetails.tokens[0].token).send({

                    'username':logindetails.username,
                    'userrole':logindetails.role,
                    'id':logindetails._id
                });
            
            },(invalid)=>{

                res.send('invalid_password');
            })
        }
    })
}

App.post(loginURL,(req,res)=>{
   
    var _username=req.body.username;
    var _password=req.body.password;
    doLogin(_username,_password,res);

})

