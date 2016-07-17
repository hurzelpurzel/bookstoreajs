/*------------------------------------*/
var express =require('express'),
    app = express(),
    compression = require('compression'),
    open = require('open'),
    serveIndex = require('serve-index'),
    port = process.env.PORT || 8888,
    publicPath = '/public',
    directory = __dirname + publicPath,
    launchUrl = 'http://localhost:' + port + '/BookStore/webapp',
    year = 60 * 60 * 24 * 365 * 1000;
    

var odata = require('./routes/odata');    
	
// use compress middleware to gzip content
app.use(compression());

// set default mime type to xml for ".library" files
express.static.mime.default_type = "text/xml";

// serve up content directory showing hidden (leading dot) files
app.use(express.static(directory, { maxAge: year, hidden: true }));
app.use("/odata",odata);



// enable directory listing
//app.use("/", serveIndex(__dirname, {'icons': true}))


// start server
app.listen(port, function(){
  require('./service/odataserver');
  // log to server console
  console.log("OpenUI5 SDK server running at\n  => " + launchUrl + " \nCTRL + C to shutdown");
});

// launch uri in default browser
open('http://localhost:' + port + '/BookStoreAjs');

module.exports = app;
