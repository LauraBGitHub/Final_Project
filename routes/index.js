const express = require('express');
const router = express.Router();
// Serve static files
router.use(express.static('public'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.post('/', function(req, res, next) {

  res.render('index', { title: 'Welcome to Web3 BootStrap App', name:req.body.name });
});

router.get('/Performance', function(req, res, next) {
  res.render('Performance', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.get('/Trading', function(req, res, next) {
  res.render('Trading', { title: 'Welcome to Web3 BootStrap App', name:null });
});


module.exports = router;
