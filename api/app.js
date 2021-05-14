// Require packages and set the port
//const https = require('http');

//const setTZ = require('set-tz')
//setTZ('Europe/Madrid')

const express = require('express');
const port = 3001;
const app = express();
const bodyParser= require('body-parser');
const routes = require('./routes/routes');

// Use Node.js body parsing middleware
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

routes(app);


// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});

//const server=https.createServer(app).listen(port);
