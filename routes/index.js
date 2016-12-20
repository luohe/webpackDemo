var express = require('express');
var router = express.Router();
var demoRouter = require('./demo');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home');
});



//配置子路由
router.use(demoRouter);

module.exports = router;
