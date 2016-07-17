
// Route everything to the internal server
var express = require('express');
var router = express.Router();
router.use(function(req, res, next) {
   var url = req.protocol+'://' + req.headers.host +":"+_odataPort +req.url;		
   res.redirect(url);
  
});

module.exports = router;
