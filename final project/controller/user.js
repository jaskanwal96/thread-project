const services = require('../services');
const Boom = require('boom');
const jwt = require('jsonwebtoken');
let md5 = require('md5');

let registerUser = async (data)=>
{
    try {
        let checkExistingUser = await services.user_service.checkExistingUser(data.user_email);
        if(!checkExistingUser){
            let userToken = await jwt.sign(data, 'secret');
            data.user_password = await md5(data.user_password);
            let resp = await services.user_service.insertNewUser(data);
            return {statusCode: 200, message: "User Added Successfully", data : {
                access_token : userToken
            }};
        }
        return Boom.conflict("User Already Exist");
    } catch (error) { 
        console.log(error);
        throw error;
    }
}
let loginUser = async function loginUser(data)
{
    try {
        let checkExistingUser = await services.user_service.checkExistingUser(data.user_email);
        if(checkExistingUser)
        { 
           let userToken = await jwt.sign(checkExistingUser, 'secret');
           let info = {
                data : checkExistingUser,
                access_token : userToken
           }
           if(md5(data.user_password) == checkExistingUser.user_password)
           {
              return {statusCode:200,message:"Login Successful",data:info};
           }
           else
           {
              return Boom.conflict("Wrong Username or Password");
           }
        }
        else
        {
            return Boom.badRequest("Email does not exist");
        }
    } catch (error) {
        console.log(error);
        return Boom.badRequest("token not received");
    }
}


module.exports = {
    registerUser,
    loginUser
}
