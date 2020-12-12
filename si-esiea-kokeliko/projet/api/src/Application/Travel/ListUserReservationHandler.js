const ReservationRepository = require('../../Infrastructure/Repository/ReservationRepository');
const TravelListView = require("../../Presentation/View/Travel/TravelListView");
const TravelView = require("../../Presentation/View/Travel/TravelView");
const AirportView = require("../../Presentation/View/Airport/AirportView");
const UserRepository = require("../../Infrastructure/Repository/UserRepository");
const AirportRepository = require("../../Infrastructure/Repository/AirportRepository");

class ListUserReservationHandler {
    constructor() {
        this.userRepository = new UserRepository();
        this.airportRepository = new AirportRepository();
        this.reservationRepository = new ReservationRepository();
    }

    handle(email) {
        if (email != 'abc@gmail.com') {
            return [];
        }
        let user = null;
        if (this.userRepository.read(email) == null) {
            // levé d'exception en théorie (mais pas de base de données donc on fait semblant qu'il existe)
        }

        let airports = this.airportRepository.list();
        let reservations = this.reservationRepository.list(user);

        let reservationsView = [];
        Object.values(reservations).forEach(travelsList => {
            Object.values(travelsList).forEach(travels => {
                let travelsView = new TravelListView();
                Object.values(travels).forEach(travel => {
                    // Création des vues des aéroports
                    let startAirport = airports[travel.startAirportId];
                    let endAirport = airports[travel.endAirportId];
                    let startAirportView = new AirportView(startAirport.name, startAirport.code);
                    let endAirportView = new AirportView(endAirport.name, endAirport.code);

                    travelsView.addTravel(new TravelView(travel.id, startAirportView, endAirportView, travel.cost));
                });
                reservationsView.push(travelsView);
            });
        });

        return reservationsView;
    }
}

module.exports = ListUserReservationHandler;