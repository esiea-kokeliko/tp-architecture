let express = require('express');
let router = express.Router();

const ListUserReservationHandler = require('../../Application/Travel/ListUserReservationHandler');

router.get('/user/:email', function(req, res, next) {
    let handler = new ListUserReservationHandler();

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(handler.handle(req.params.email)));
});

module.exports = router;
