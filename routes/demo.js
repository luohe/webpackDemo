var express = require('express');
var router = express.Router();

/* 正在排版页面 */
router.get('/demo', function (req, res) {
  res.render('demo');
});

router.get('/homePage', function (req, res) {
  res.render('homePage');
});

module.exports = router;