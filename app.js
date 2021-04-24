var express    = require("express");
var bodyParser = require("body-parser");
var app        = express();
const {Client} = require("pg"); 
const port     = 3001;

const pgClient = new Client({
    host    : '',
    user    : 'testuser',
    database: 'testdb',
    password: '',
    port    : '5432',
});

app.use(
    bodyParser.json()
);
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    console.log(req.url);
    console.log(req.query);
    res.json({info: 'Node.js, Express, Postgres API'});
});

app.listen(port, () => {
    console.log("EXPRESS SERVER IS LISTENING 3001 PORT");
});

module.exports = pgClient;
