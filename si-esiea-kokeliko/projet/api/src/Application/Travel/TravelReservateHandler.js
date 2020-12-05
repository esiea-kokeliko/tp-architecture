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
        let email = data.email;
        let user = null;
        if (userRepository.read()) {
            /* @todo insertion avec repository */
            user = new User(1, 'abc@email.com');
        }

        let reservation = new Reservation(1, user.id);

        let count = 0;
        travels.forEach(travel => {
            let ticket = new Ticket(count, travel.id, reservation.id);
            count++;
        });
    }
}

module.exports = TravelReservateHandler;