const http = require('http')
const https = require('https')
const express = require('express')
const app = express()
const port = 8888
const cors = require('cors')
const path = require('path')
//const compression = require('compression')



app.use(cors())
//app.use(compression())
const distDir = path.resolve(__dirname, './public')
app.get('/fetchUrl', function(req, res) {
	console.log(req.query);
	let resData = 'default';
	let httpClient = req.query.url.startsWith('https') ? https : http;
    httpClient.get(req.query.url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
            resData = data;
            res.send(resData);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        resData = err.message;
        res.send(resData);
    });
    
})
app.use(express.static(distDir))

http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port)
})