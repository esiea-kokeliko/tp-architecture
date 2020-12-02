const Interface = require('../Utils/Interface');
const AirportRepositoryInterface = require('../../Domain/Repository/AirportRepositoryInterface');

const Airport = require('../../Domain/Model/Airport');

/* Aucune base de données, pour le moment on renvoie du brut */
class AirportRepository {
    constructor() {
        Interface.checkImplements(this, AirportRepositoryInterface);
    }

    read(id) {
        switch (id) {
            case 1:
                return new Airport(id, 'New York', 'JFK');
            case 2:
                return new Airport(id, 'CDG Paris', 'CDG');
            case 3:
                return new Airport(id, 'Detroit', 'DTW');
        }

        // @todo exception
    }

    list() {
        return {
            1: new Airport(1, 'New York', 'JFK'),
            2: new Airport(2, 'CDG Paris', 'CDG'),
            3: new Airport(3, 'Detroit', 'DTW'),
        };
    }
}

module.exports = AirportRepository;