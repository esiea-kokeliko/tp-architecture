const Interface = require('../Utils/Interface');
const UserRepositoryInterface = require('../../Domain/Repository/UserRepositoryInterface');

const User = require("../../Domain/Model/User");

/* Aucune base de données, pour le moment on renvoie du brut */
class UserRepository {
    constructor() {
        Interface.checkImplements(this, UserRepositoryInterface);
    }

    read(email) {
        if (email == 'abc@gmail.com') {
            return new User(1, 'abc@gmail.com');
        }
        return null;
    }

    create(user) {
        //insert en base en théorie
    }
}

module.exports = UserRepository;