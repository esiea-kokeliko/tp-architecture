import Axios from "axios";
import {Travel} from '../../Domain/Model/Travel';
import {Airport} from '../..//Domain/Model/Airport';

export default {
    list() {

        let travelList = {};
        Axios.get('http://localhost:3000/travels') // Récupération de nos vols
            .then(response => {
                let travels = [];
                Object.values(response.data.travels).forEach(travel => {
                    let startAirport = new Airport(travel.startAirport.name, travel.startAirport.code);
                    let endAirport = new Airport(travel.endAirport.name, travel.endAirport.code);
                    travels.push(new Travel(travel.id, startAirport, endAirport, travel.cost));
                });
                travelList['travels'] = travels;
            })
        ;
        Axios.get('https://app-air-travel.azurewebsites.net/flights') // Récupération des vols du prof
            .then(response => {
                travelList['flights'] = response.data;
            })
        ;
        return travelList;
    },

    reservate(travelsList, customer) {
        let code = '';
        let payload = {
            travels: travelsList['travels'],
        }
        Axios.post('http://localhost:3000/book', payload) // Réservation sur notre API
            .then(response => {
                code = response.data;
            })
        ;

        travelsList['flights'].forEach(flight => { // Une requête par vol
            payload = {};
            payload['flight'] = flight;
            payload['date'] = '24-12-2020'; // On ne demande pas de date à l'user
            payload['payed_price'] = flight.base_price;
            payload['customer_name'] = customer;
            payload['customer_nationality'] = 'fr';
            // payload['options'] = [{"option_type":"BonusLuggage","price":100}]; // Trop complexe
            payload['booking_source'] = 'ESIEA-Kokeliko';

            Axios.post('https://app-air-travel.azurewebsites.net/book', payload); // Réservation sur l'API du prof
        });
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