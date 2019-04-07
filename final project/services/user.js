let checkExistingUser = async function (user_email) {
    try {
        const collection = db.collection('user');
        let resp = await collection.findOne({ user_email: user_email });
        console.log("Response", resp);
        return resp;
    }
    catch (err) {
        return err;
    }
}


let insertNewUser = async function (data) {
    try {
        const collection = db.collection('user');

        let response = await collection.insertOne(data);
        return response;
    }
    catch (err) {
        console.log("Err", err);
        return err;
    }
}

module.exports = {
    checkExistingUser,
    insertNewUser
}