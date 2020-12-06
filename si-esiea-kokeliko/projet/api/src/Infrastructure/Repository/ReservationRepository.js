const Interface = require('../Utils/Interface');
const ReservationRepositoryInterface = require('../../Domain/Repository/ReservationRepositoryInterface');

const Travel = require("../../Domain/Model/Travel");

/* Aucune base de données, pour le moment on renvoie du brut */
class UserRepository {
    constructor() {
        Interface.checkImplements(this, ReservationRepositoryInterface);
    }

    list(user) {
        return {
            "reservations": {
                "travels1": {
                    1: new Travel(1, 1, 2, 150),
                    2: new Travel(3, 2, 1, 300),
                },
                "travels2": {
                    1: new Travel(1, 1, 2, 150),
                },
            }
        };
    }
}

module.exports = UserRepository;