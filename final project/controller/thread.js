const services = require('../services');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
let objectid = require('mongodb').ObjectID;

let registerThread = async (data, token)=>
{
    try {
        
        let tokenData = await jwt.verify(token, 'secret');
        console.log(tokenData.user_email)
        let getUser = await services.user_service.checkExistingUser(tokenData.user_email);
        data['username'] = objectid(getUser._id);
        data['date'] = Date.now();
        console.log("MY DAAATAAA", data);
        let resp = await services.thread_service.insertThread(data);
        return {statusCode: 200, message: "Thread Added Successfully", data: resp};
    
        } catch (error) { 
        console.log("Error", error);
        throw error;
    }
} 
let getThreads = async function(token) {
    try {
        let tokenData = await jwt.verify(token, 'secret');
        let checkExistingUser = await services.user_service.checkExistingUser(tokenData.user_email);
        let list = await services.thread_service.getThreads(checkExistingUser._id);
        console.log("lalala",list);
        return {statusCode: 200, message:"Updated Successful", data:list};
    } catch (error) {
        console.log(error);
        return Boom.badRequest("Error Fetching Thread");
    }
}

module.exports = {
    registerThread,
    getThreads
}
