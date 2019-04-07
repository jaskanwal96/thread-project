const controller = require('../controller');
const joi = require('joi');
const boom = require('boom');

const handleError = function (request, h, err) {

    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const invalidItem = err.details[0];
        console.log(err.details);
        return boom.conflict(err.details[0].message)
    }

    return h.response(err)
        .takeover()
};  
let user_API = (server)=>{
    server.route(
        {
            method: 'POST',
            path: '/user/register',
            handler: function (req,res)
            { 
                return controller.user_controller.registerUser(req.payload);
            },
            config:
            {
                description:'User Register',
                tags:['api'],
                validate:
                {
                    payload:
                    {
                        user_email : joi.string().email(), 
                        user_password : joi.string().min(4)
                    },
                    failAction: handleError
                }
            }
        });
        server.route({
            method: 'POST',
            path: '/user/login',
            
            handler: function(req,res){
                return controller.user_controller.loginUser(req.payload);
            },
            config: {
                description: "User Login",
                tags: ["api"],
                validate: {
                    payload: {
                        user_email: joi.string().email(),
                        user_password: joi.string().min(4)
                    },
                    failAction: handleError
                }
            }
             
        });
 

    }

    module.exports  = user_API;