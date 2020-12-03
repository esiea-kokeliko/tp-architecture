const TravelRepository = require('../../Infrastructure/Repository/TravelRepository');
const User = require("../../Domain/Model/User");
const Reservation = require("../../Domain/Model/Reservation");
const Ticket = require("../../Domain/Model/Ticket");

class TravelReservateHandler {
    constructor() {
        this.travelRepository = new TravelRepository();
    }

    handle(data) {
        let travels = data.travels;

        /* @todo insertion avec repository */
        let user = new User(1, 'ABC');
        let reservation = new Reservation(1, user.id);

        let count = 0;
        travels.forEach(travel => {
            let ticket = new Ticket(count, travel.id, reservation.id);
            count++;
        });

        return user.code;
    }
}

module.exports = TravelReservateHandler;