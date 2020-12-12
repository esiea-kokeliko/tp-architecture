import TravelRepository from '../../Infrastructure/Repository/TravelRepository';

export default {
    handle(travels, customer) {
        return TravelRepository.reservate(travels, customer);
    }
}