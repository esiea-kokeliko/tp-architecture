<template>
  <v-app>
    <v-img class="mr-3" src="../../../public/logo.png" text-center width="10%" v-if="!page==0"></v-img>
    <v-container v-if="page==0" class="light" >
      <v-img class="mr-3" src="../../../public/logo.png" text-center width="10%"></v-img>
      <br>
      <h1 text-center >Entrez votre adresse e-mail pour réserver un vol :</h1>
      <v-container grid-list-md fluid fill-height class="light" >
        <v-text-field
        v-model="email"
        required
        label="E-mail"
        ></v-text-field>
        <v-btn
        class="mx-10"
        fab
        dark
        color="blue darken-4"
        v-on:click="validEmail(email)"
        >
          <v-icon dark>
          mdi-check-bold
          </v-icon>
        </v-btn>
      </v-container>
    </v-container>

    <v-container grid-list-md fluid fill-height class="light" v-if="page==1">
      <h2>Bonjour {{this.email}}</h2>
      <v-row no-gutters>
        <h2>Trajet disponible</h2>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3" v-for="travel in travels" v-bind:key="travel.id">
          <v-card class="grey lighten-3">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
            <div class="text-right">
              <v-btn
                  class="mx-1"
                  fab
                  dark
                  color="light-green darken-1"
                  v-on:click="addTravel(travel)"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <h2>Trajet sélectionné</h2>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3" v-for="travel in travelsChosen" v-bind:key="travel.id">
          <v-card class="grey lighten-3">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
            <div class="text-right">
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="deep-orange accent-4"
                  v-on:click="removeTravel(travel)"
              >
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-btn
            dark
            color="blue darken-2"
            v-on:click="reservate()"
            rounded
          >
          Valider
        </v-btn>
      </v-row>
    </v-container>
    <v-container grid-list-md fluid fill-height class="light" v-if="page==2">
      <h2>Bonjour {{this.email}}</h2>
      <v-row no-gutters>
        <h2>Trajet réservé</h2>
        <h2> {{ this.reservationCode[0] }}</h2>
        <v-spacer></v-spacer>
        <v-btn
            dark
            color="blue darken-2"
            v-on:click="goToReservePage()"
            rounded
        >
          Voir les réservations possibles
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" v-for="travel in travelsChosen" v-bind:key="travel.id">
          <v-card class="grey lighten-3">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-for="(reservation, key) in reservations" v-bind:key="key">
        <h3>Réservation numéro {{ key + 1 }}</h3>
        <v-col cols="12" sm="4" v-for="travel in reservation" v-bind:key="travel.id">
          <v-card class="grey lighten-3">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import TravelListHandler from "@/Application/Travel/TravelListHandler";
import TravelReservateHandler from "@/Application/Travel/TravelReservateHandler";
import TravelReservationHandler from "@/Application/Travel/TravelReservationHandler";

export default {
  name: 'TravelList',
  components: {
  },
  data: () => {
    return {
      reservationCode: [],
      travels: [],
      travelsChosen: [],
      reservations: [],
      page: 0,
      email: ""
    };
  },
  created() {
    alert('Le seul compte utilisateur ayant des réservations enregistrées (car pas de base de données) est "abc@gmail.com"')
    this.travels = TravelListHandler.handle();
  },
  methods: {
    addTravel(travel) {
      this.travelsChosen.push(travel);
      this.removeTravelFromList(travel);
    },
    removeTravel(travel) {
      this.removeTravelChoosenFromList(travel);
      this.travels.push(travel);
    },
    removeTravelFromList(travelToRemove) {
      let tmp = [];
      this.travels.forEach(travel => {
        if (travel.id != travelToRemove.id) {
          tmp.push(travel);
        }
      });
      this.travels = tmp;
    },
    removeTravelChoosenFromList(travelToRemove) {
      let tmp = [];
      this.travelsChosen.forEach(travel => {
        if (travel.id != travelToRemove.id) {
          tmp.push(travel);
        }
      });
      this.travelsChosen = tmp;
    },
    reservate() {
      if (this.travelsChosen.length == 0) {
        alert('Vous devez chosir un ou plusieurs voyages pour passer à l\'étape suivante.');
      } else {
        this.reservationCode.push(TravelReservateHandler.handle(this.travelsChosen));
        this.page = 2;
      }
    },
    validEmail(label){
      if (label.length == 0) {
        alert('Vous devez enregistrer une adresse email.');
      } else {
        this.reservations = TravelReservationHandler.handle(label);
        this.email = label;
        this.page = 2;
      }
    },
    goToReservePage() {
      this.page = 1;
    }
  }
}
</script>

<style>
</style>
