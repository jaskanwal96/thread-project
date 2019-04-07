let createThreadModel = function(){
    db.createCollection( "thread", {
        validator: { $jsonSchema: {
           bsonType: "object",
           required: [ "email" ],
           properties: {
              title: {
                 bsonType: "string",
                 description: "Title must be a string"
              },
              description: {
                 bsonType: "string",
                 description: "Description must be a string"
              },
              tags: {
                bsonType: "array",
                description: "Tags must be an array"
              },
              date: {
                bsonType: "date",
                description: "Proper Formatted Date"
              },
              username: {
                bsonType: "objectId",
                description: "Username must be a reference to User"
              }
           }
        } }
     } )
     console.log("Thread Schema added successfully");
}

module.exports = createThreadModel;