const TravelRepository = require('../../Infrastructure/Repository/TravelRepository');
const AirportRepository = require('../../Infrastructure/Repository/AirportRepository');
const TravelListView = require('../../Presentation/View/Travel/TravelListView');
const TravelView = require('../../Presentation/View/Travel/TravelView');
const AirportView = require('../../Presentation/View/Airport/AirportView');

class TravelListHandler {
    constructor() {
        this.travelRepository = new TravelRepository();
        this.airportRepository = new AirportRepository();
    }

    handle() {
        // Récupération des aéroports
        let airports = this.airportRepository.list();
        let travels = this.travelRepository.list();

        let travelsView = new TravelListView();
        Object.values(travels).forEach(travel => {
            // Création des vues des aéroports
            let startAirport = airports[travel.startAirportId];
            let endAirport = airports[travel.endAirportId];
            let startAirportView = new AirportView(startAirport.name, startAirport.code);
            let endAirportView = new AirportView(endAirport.name, endAirport.code);

            travelsView.addTravel(new TravelView(travel.id, startAirportView, endAirportView, travel.cost));
        });

        return travelsView;
    }
}

module.exports = TravelListHandler;