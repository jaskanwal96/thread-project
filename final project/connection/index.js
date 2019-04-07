
const model_init = require('../model');
const mongoconn = require('./mongo_connection');
const boom = require('boom');
 let connection = async function ()
 {
     try {
        await mongoconn(); 
        await model_init.thread_schema();
        await model_init.user_schema; 
     } catch (error) {
         boom.badImplementation('database error');
     }
 }
 module.exports = connection;