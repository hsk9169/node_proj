var client = require('../pgClient');

client.connect(err => {
    if(err) console.error('PGDB connection error', err.stck);
    else console.log('PGDB connected');
});

var getUsers = (req, res) => {
    client.query('SELECT * FROM users ORDER BY id ASC',
        (err, res) =>
        if (err) throw err;
        console.log(res);
        client.end();
    );
});

module.exports = getUsers;
