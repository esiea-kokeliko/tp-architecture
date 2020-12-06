const TravelRepository = require('../../Infrastructure/Repository/TravelRepository');
const UserRepository = require('../../Infrastructure/Repository/UserRepository');
const User = require("../../Domain/Model/User");
const Reservation = require("../../Domain/Model/Reservation");
const Ticket = require("../../Domain/Model/Ticket");

class TravelReservateHandler {
    constructor() {
        this.travelRepository = new TravelRepository();
        this.userRepository = new UserRepository();
    }

    handle(data) {
        let travels = data.travels;
        let email = data.email;
        let user = null;
        if (this.userRepository.read(email) == null) {
            user = new User(1, email);
            this.userRepository.create(user);
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