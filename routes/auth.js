let mysql = require("mysql2");
var express = require('express');
var router = express.Router();
let connected = false;

/* GET login page. */
router.get('/login', function(req, res, next) {
  if(connected) {
    res.send("You're connected!");
  } else {
    res.render('login', { title: 'Express 002 - Login page', message: "Login Page" });
  }
});

/* POST login page */
router.post('/login', async function(req, res, next) {
    let loginResult = await checkLoginDetails(req.body.username, req.body.password);
    if (loginResult) {
        connected = true;
        res.send(`Hello World από την Πανεπιστημίου 39! - ${req.body.username} - ${req.body.password}, result = ${loginResult}`);
    } else {
        res.send("Get out of here!");
    }
});

router.get('/logout', function(req, res) {
  connected = false;
  res.send(`You've logged out!`);
});

// this is the business login of the login procedure
async function checkLoginDetails(username, password) {
  try {
      let dbResult = await dbLogin(username, password);
      // correct credentials
      if (dbResult) {
          return (true);
      }
      // wrong credentials
      // where is the else part??????
  } 
  // in case of errors, e.g. wrong configDetails, wrong sql query, db server is not responding
  catch (error) {
      return (false);
  }
}

// the actual login code
async function dbLogin(username, password) {
  const poolConfigDetails = {
      connectionLimit: 1,
      host: 'ra1.anystream.eu',
      port: '5420',
      user: 'cb12ptjs',
      password: 'cb12ptjs',
      database: 'cb12ptjs'
  };
  const pool = mysql.createPool(poolConfigDetails);
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  
  // let result = pool.execute().then(resolve => {}, reject => {});
  // return(result);
  
  return (new Promise(
      (resolve, reject) => {
          pool.execute(sql, [username, password], (error, rows) => {
              if (error) {
                  pool.end();
                  return (reject(error));
              } else {
                  if (rows.length == 1) {
                      pool.end();
                      return (resolve(true));
                  } 
                  // rows.length != 1
                  else {
                      pool.end();
                      return (resolve(false));
                  }
              }
          })
      }
  ));
}

module.exports = router;