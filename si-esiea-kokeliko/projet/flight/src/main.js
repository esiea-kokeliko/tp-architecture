import Vue from 'vue'
import TravelList from './Presentation/Travel/TravelList.vue'
import vuetify from './Infrastructure/Utils/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(TravelList)
}).$mount('#app')
