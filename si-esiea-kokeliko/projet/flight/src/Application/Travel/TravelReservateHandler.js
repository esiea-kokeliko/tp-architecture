import TravelRepository from '../../Infrastructure/Repository/TravelRepository';

export default {
    handle(travels) {
        return TravelRepository.reservate(travels);
    }
}