var odata = require('node-odata');
var fs = require('fs');

var _server = odata('mongodb://localhost/odata-test');
var  _odataPort =3000;
var _filePath = __dirname+"/files";

var bookInfo = {
  author: String,
  description: String,
  genre: String,
  price: Number,
  publish_date: Date,
  title: String
};

var UploadFile = function(id, content){
			return {id: id, content: content}; 
};

	
_server.resource('BookSet', bookInfo)
  .action('/50off', function(req, res, next){
    _server.repository('Book').findById(req.params.id, function(err, book){
      book.price = +(book.price / 2).toFixed(2);
      book.save(function(err){
        res.jsonp(book);
      });
    });
  });
  
_server.get('/license', function(req, res, next){
  res.jsonp({license:'MIT'});
});
_server.get('/getFile',function(req, res, next){
  fs.readFile(_filePath+"/"+req.params.id+'.tmp', function (err,data) {
  if (err) return console.log(err);
  res.json(new UploadFile(id, data));
});
});
_server.put('/putFile',function(req, res, next){
  
fs.writeFile(_filePath+"/"+req.body.id+'.tmp', req.body.content, function (err) {
  if (err) return console.log(err);
  console.log('put File'+_filePath+"/"+req.body.id+'.tmp succeed');
});
});

_server.listen(_odataPort, function(){
  console.log('OData services has started, you can visit by http://localhost:'+_odataPort+'/BookSet');
});
module.exports=_server
