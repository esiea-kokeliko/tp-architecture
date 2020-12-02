let express = require('express');
let router = express.Router();

const TravelListHandler = require('../../Application/Travel/TravelListHandler');

router.get('/travel', function(req, res, next) {
    let handler = new TravelListHandler();

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(handler.handle()));
});

module.exports = router;
