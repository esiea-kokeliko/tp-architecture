import TravelRepository from '../../Infrastructure/Repository/TravelRepository';

export default {
    handle(email) {
        return TravelRepository.reservation(email);
    }
}