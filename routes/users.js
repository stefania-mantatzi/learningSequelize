var express = require('express');
var router = express.Router();

/* GET users listing. */
// http://localhost:4000/users/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// baseURL              appuse /list       
// http://localhost:4000/users/list
router.get('/list', function(req, res, next) {
  res.send("This is the list of the users");
})

module.exports = router;
