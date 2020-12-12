import Axios from "axios";
import {Travel} from '../../Domain/Model/Travel';
import {Airport} from '../..//Domain/Model/Airport';

export default {
    list() {
        let travels = [];
        Axios.get('http://localhost:3000/travels')
            .then(response => {
                Object.values(response.data.travels).forEach(travel => {
                    let startAirport = new Airport(travel.startAirport.name, travel.startAirport.code);
                    let endAirport = new Airport(travel.endAirport.name, travel.endAirport.code);
                    travels.push(new Travel(travel.id, startAirport, endAirport, travel.cost));
                });
            })
        ;
        return travels;
    },

    reservate(travelsList) {
        let code = '';
        let payload = {
            travels: travelsList,
        }
        Axios.post('http://localhost:3000/book', payload)
            .then(response => {
                code = response.data;
            })
        ;
        return code;
    },

    reservation(email) {
        let reservations = [];
        Axios.get('http://localhost:3000/user/' + email)
            .then(response => {
                response.data.forEach(travelList => {
                    Object.values(travelList).forEach(travels => {
                        let travelsView = [];
                        Object.values(travels).forEach(travel => {
                            let startAirport = new Airport(travel.startAirport.name, travel.startAirport.code);
                            let endAirport = new Airport(travel.endAirport.name, travel.endAirport.code);
                            travelsView.push(new Travel(travel.id, startAirport, endAirport, travel.cost));
                        });
                        reservations.push(travelsView);
                    });
                })
            })
        ;
        return reservations;
    }
}