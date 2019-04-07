let createUserModel = function(){
    db.createCollection( "user", {
        validator: { $jsonSchema: {
           bsonType: "object",
           required: [ "user_email", "user_password" ],
           properties: {
              user_password: {
                 bsonType: "string",
                 description: "Password must be a string and is required"
              },
              user_email: {
                 bsonType : "string",
                 description: "Email must be a string and match the regular expression pattern"
              }
           }
        } }
     } )
     console.log("User Model added successfully");
}

module.exports = createUserModel;