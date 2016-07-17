var odata = require('node-odata');

var _server = odata('mongodb://localhost/odata-test');
var  _odataPort =3000;

var bookInfo = {
  author: String,
  description: String,
  genre: String,
  price: Number,
  publish_date: Date,
  title: String
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
_server.listen(_odataPort, function(){
  console.log('OData services has started, you can visit by http://localhost:'+_odataPort+'/BookSet');
});
module.exports=_server
