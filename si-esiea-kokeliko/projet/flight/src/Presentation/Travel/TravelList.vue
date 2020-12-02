<template>
  <v-app>
    <v-container grid-list-md fluid fill-height class="grey">
      <v-layout row>
        <v-col cols="12" sm="4" v-for="travel in travels" v-bind:key="travel.id">
          <v-card class="grey lighten-1">
            <v-card-title>{{ travel.startAirport.name }} {{ travel.startAirport.code }} to {{ travel.endAirport.name }} {{ travel.endAirport.code }}</v-card-title>
            <v-card-subtitle>{{ travel.cost }} €</v-card-subtitle>
            <v-btn></v-btn>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import TravelListHandler from "@/Application/Travel/TravelListHandler";

export default {
  name: 'TravelList',
  components: {
  },
  data: () => {
    return {
      travels: [],
      travelsChosen: []
    };
  },
  created() {
    this.travels = TravelListHandler.handle();
  }
}
</script>

<style>
</style>
