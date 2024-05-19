const express = require("express");
const { port } = require('./config/config.js');
const PORT = port || 9092;
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
var cors = require("cors");
app.use(cors());


var debug = require('debug')('bsis-api:server');
var http = require('http');
var https = require('https');
const fs = require('fs');
console.log("starting service");

let pKeyPath = '/etc/letsencrypt/live/bookyourapps.com/privkey.pem';
let cPath = '/etc/letsencrypt/live/bookyourapps.com/fullchain.pem';
/**
 * Get port from environment and store in Express.
 */

var prt = normalizePort(port || '9092');
app.set('port', prt);

/**
 * Create HTTP server.
 */
console.log("fs.existsSync(pKeyPath)", fs.existsSync(pKeyPath))
if (fs.existsSync(pKeyPath) && fs.existsSync(cPath)) {
    var options = {
        key: fs.readFileSync(pKeyPath),
        cert: fs.readFileSync(cPath),
    };
    var httpsServer = https.createServer(options, app);
    httpsServer.listen(prt);
    httpsServer.on('error', onError);
    httpsServer.on('listening', onListeninghttps);
} else {
    var server = http.createServer(app);
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(prt);
    server.on('error', onError);
    server.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var prt = parseInt(val, 10);

    if (isNaN(prt)) {
        // named pipe
        return val;
    }

    if (prt >= 0) {
        // port number
        return prt;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof prt === 'string'
        ? 'Pipe ' + prt
        : 'Port ' + prt;
    // handle specific listen errors with friendly messages
    console.log('error.code ' + error.code);

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    console.log("addr", addr);
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('HTTP Listening on ' + bind);
}

function onListeninghttps() {
    var addr_https = httpsServer.address();
    console.log("addr_https", addr_https);
    var bind_https = typeof addr_https === 'string'
        ? 'pipe ' + addr_https
        : 'port ' + addr_https.port;
    debug('HTTPS Listening on ' + bind_https);
    console.log('HTTPS Listening on ' + bind_https);
}

app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});

app.use("/api/v1", require("./src/routes"));

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

// app.listen(PORT, () => {
//     console.log("Server listening on port " + PORT);
// });