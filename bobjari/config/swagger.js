const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc'); 

let url;
const env = process.argv[2];

if(env == 'ec2') {
    url = 'http://ec2-3-138-140-195.us-east-2.compute.amazonaws.com:8000';
} else {
    url = 'http://localhost:8000';
}

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: '밥자리 API', 
        version: '1.0.1',
        description: '밥자리 API with Express',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: url,
            description: 'Dev Server',
        },
    ],
};
        
const options = { 
    customCss: '.swagger-ui .topbar { background-color: blue }',
    swaggerDefinition, 
    apis: [
        './swagger/users/*.yaml',
        './swagger/auths/*.yaml',
        './swagger/sign/*.yaml',
    ], 
};

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };

