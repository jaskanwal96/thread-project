let objectid = require('mongodb').ObjectID;

let getThreads = async function(user_id){
    try{
        console.log(user_id);
        const collection = db.collection('thread');
        let response = null;
        response = await collection.find({username : objectid(user_id)}).toArray();
        return response;
    }
    catch(err){
        console.log("Error",err);
        return err;
    }

}

let insertThread = async function(data){
    try{
        const collection = db.collection('thread');
        let response = await collection.insertOne(data);
        return response;
    }
    catch(err){
        console.log("Error",err);
        return err;
    }
}

module.exports = {
    insertThread,
    getThreads
}