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

let thread_API = (server) => {
    server.route(
        {
            method: 'POST',
            path: '/thread/add',
            handler: function (req) {
                return controller.thread_controller.registerThread(req.payload, req.headers.authorization);
            },
            config:
            {
                description: 'New Thread',
                tags: ['api'],
                validate:
                {
                    headers: joi.object({ "authorization": joi.string().required() }).unknown(),
                    payload:
                    {
                        title: joi.string().required(),
                        description: joi.string().required(),
                        tags: joi.array().required()
                    },
                    failAction: handleError
                }
            }
        });
    
    server.route({
        method: 'GET',
        path: '/thread/list',
        handler: function (req, res) {
            return controller.thread_controller.getThreads(req.headers.authorization);
        },
        config: {
            description: "Thread List",
            tags: ["api"],
            validate: {
                headers: joi.object({ "authorization": joi.string().required() }).unknown(),
            },
            
        }

    });
}

module.exports = thread_API;