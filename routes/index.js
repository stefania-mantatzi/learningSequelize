var express = require('express');
var router = express.Router();

/* GET home page. */
// http://localhost:4000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express 002 - Index Page', 
                        message: "Hello World message from the backend!",
                        koukou: "Koukouroukou"
                      });
});

// router.post('/') // <--- accepts e.g. from form the data

module.exports = router;
