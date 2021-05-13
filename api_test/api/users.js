var express = require('express');
var router = express.Router();
const { Client } = require('pg');

const pgClient = new Client({
    user: 'testuser',
    host: 'ec2-13-58-255-229.us-east-2.compute.amazonaws.com',
    database: 'testdb',
    password: 'testuser1!',
    port: 5432,
    query_timeout: 500,
    connectionTimeoutMillis: 2000,
});

router.get('/',
    function(req, res, next){
        res.json({
            success: true,
            message: 'users page'});
        console.log('GET /api/users');
});


router.get('/data', 
    function(req, res) {
        var ret = {};

        pgClient
            .connect()
            .then(() => {
                console.log('DB connected');
                //queryDatabase();
                var rows = await queryGet();
                console.log('Received data');
                console.log(rows);
            })
            .catch(err => console.error('DB connection error', err.stack));

        res.send(ret);
        //res.json({
        //    success: true});
        //console.log('GET /api/users/data');
});

function queryDatabase() {
    const createQuery = `
        CREATE TABLE userData (id serial PRIMARY KEY, name VARCHAR(20), subtitle VARCHAR(50));
    `;
    const insertQuery = `
        INSERT INTO userData (name, subtitle) VALUES ('Hansu Kim', 'Cloud Developer');
        INSERT INTO userData (name, subtitle) VALUES ('Hansu Kim', 'Cloud Developer');
        INSERT INTO userData (name, subtitle) VALUES ('Hansu Kim', 'Cloud Developer');
    `;

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
    var rows = {};
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
        
    return rows;
}

module.exports = router;
