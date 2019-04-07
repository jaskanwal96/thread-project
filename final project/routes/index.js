const user_API = require('./user');
const thread_API = require('./thread');

let routes = (server)=>
 {
    user_API(server);
    thread_API(server);
 }
 module.exports = routes;
