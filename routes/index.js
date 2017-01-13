var express = require('express');
var router = express.Router();
var demoRouter = require('./demo');
var statistics = require('./statistics');

/* GET home page. */
router.get('*', function(req, res, next) {
	res.render('manage');
});

// // 配置子路由
router.use(demoRouter);

// router.use(statistics);

module.exports = router;
