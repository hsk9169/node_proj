var express = require('express');
var router = express.Router();
const { Client } = require('pg');
const assert = require('assert');

const pgClient = new Client({
    user: 'testuser',
    host: 'ec2-13-58-255-229.us-east-2.compute.amazonaws.com',
    database: 'testdb',
    password: 'testuser1!',
    port: 5432,
    query_timeout: 500,
    connectionTimeoutMillis: 2000,
});

router.get('/', (req, res) => { 

        res.json({
            success: true,
            message: 'users page'});
        console.log('GET /api/users');
});


router.get('/data',
    function(req, res, next) {
        pgClient.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })
        queryDatabase();
        queryGet()
            .then((value) => {
                res.send(value); 
            });
});

function queryDatabase() {
    const createQuery = `
        CREATE TABLE userData (id serial PRIMARY KEY, name VARCHAR(20), subtitle VARCHAR(50));
    `;
    const dropTable = `
        DROP TABLE userData;
    `;
    const insertQuery = `
        INSERT INTO userData (name, subtitle) VALUES ('Hansu Kim', 'Cloud Developer');
    `;

    pgClient
        .query(dropTable)
        .catch(err => console.log(err))
        .then(() => {
            console.log('Table deleted');
        });
    pgClient
        .query(createQuery)
        .catch(err => console.log(err))
        .then(() => {
            console.log('Table created');
        });
    pgClient
        .query(insertQuery)
        .catch(err => console.log(err))
        .then(() => { 
            console.log('Data inserted');
        });
}

async function queryGet(){
    const query = `SELECT * FROM userData`;
    let rows = {};
    console.log('Running QUERY to PostgreSQL server');

    pgClient
        .query(query)
        .catch(err => {
            console.log(err);
        })
        .then(res => {
            rows = res.rows;
            rows.map(row => {
                console.log(`READ: ${JSON.stringify(row)}`);
            });
            console.log('Finished execution');
        });
        
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(rows);
        }, 3000));
    
    return rows;
}


module.exports = router;
