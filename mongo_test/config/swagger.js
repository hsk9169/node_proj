const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc'); 

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Test API', 
        version: '1.0.0',
        description: 'Test API with express',
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
            url: 'http://ec2-3-16-107-134.us-east-2.compute.amazonaws.com:8000',
            description: 'Dev server',
        },
    ],
    //basePath:'/'
};
        
const options = { 
    swaggerDefinition, 
    apis: ['./routes/*.js', './models/*.js'], 
};

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };

