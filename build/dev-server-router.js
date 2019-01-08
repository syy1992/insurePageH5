var express = require("express");
var router = express.Router();
var path = require("path");

var routerMap = {
    '/insurance/exhibition/apply': "exhibitionquery"
}

router.all("*", function(req, res, next) {
    console.log(req.path);
    if (routerMap[req.path]) {
        var resData = require(path.join(__dirname, "../mockdata/", routerMap[req.path]));
        res.json(resData);
    } else {
        next();
    }
})

module.exports = router;