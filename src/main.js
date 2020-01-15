import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './scss/material-dashboard.scss';
import VueMoment from 'vue-moment'
import App from './App.vue'

Vue.use(VueMoment);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'https://api.the-odds-api.com/v3';

Vue.config.productionTip = false;

Vue.router = router;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
