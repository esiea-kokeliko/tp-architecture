import TravelRepository from '../../Infrastructure/Repository/TravelRepository';

export default {
    handle() {
        return TravelRepository.list();
    }
}