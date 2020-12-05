<template>
  <v-app>
    <v-container grid-list-md fluid fill-height class="grey" v-if="isTravel">
      <v-row>
        <h2>Trajet disponible</h2>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" v-for="travel in travels" v-bind:key="travel.id">
          <v-card class="grey lighten-1">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
            <div class="text-right">
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
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
      <v-row>
      <h2>Trajet sélectionné</h2>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" v-for="travel in travelsChosen" v-bind:key="travel.id">
          <v-card class="grey lighten-1">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
            <div class="text-right">
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  v-on:click="removeTravel(travel)"
              >
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-btn
            dark
            color="indigo"
            v-on:click="reservate()"
        >
          <v-icon dark>
            Valider
          </v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-container grid-list-md fluid fill-height class="grey" v-if="!isTravel">
      <v-row>
        <h2>Trajet réservé {{ this.reservationCode[0] }}</h2>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" v-for="travel in travelsChosen" v-bind:key="travel.id">
          <v-card class="grey lighten-1">
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

export default {
  name: 'TravelList',
  components: {
  },
  data: () => {
    return {
      reservationCode: [],
      travels: [],
      travelsChosen: [],
      isTravel: true
    };
  },
  created() {
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
        this.isTravel = false;
      }
    }
  }
}
</script>

<style>
</style>
