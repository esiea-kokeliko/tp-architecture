const Interface = require('../Utils/Interface');
const TravelRepositoryInterface = require('../../Domain/Repository/TravelRepositoryInterface');

const Travel = require('../../Domain/Model/Travel');

/* Aucune base de données, pour le moment on renvoie du brut */
class TravelRepository {
    constructor() {
        Interface.checkImplements(this, TravelRepositoryInterface);
    }

    list() {
        return {
            1: new Travel(1, 1, 2),
            2: new Travel(2, 1, 3),
            3: new Travel(3, 2, 1),
            4: new Travel(4, 2, 3),
            5: new Travel(5, 3, 1),
            6: new Travel(6, 3, 2),
        };
    }
}

module.exports = TravelRepository;