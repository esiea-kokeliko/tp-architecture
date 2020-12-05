let express = require('express');
let router = express.Router();

const TravelReservateHandler = require('../../Application/Travel/TravelReservateHandler');

router.post('/book', function(req, res, next) {
    let handler = new TravelReservateHandler();

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(handler.handle(req.body)));
});

module.exports = router;
