const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const initModels = require('../model');
const dbName = 'thread_db';

let mongo_conn = function (){
    MongoClient.connect(url, (err, client)=>{
        if(err)throw err;
        console.log("Server Connected");
        global.db = client.db(dbName);
        initModels.user_schema();
        initModels.thread_schema();
    });
} 

module.exports = mongo_conn;