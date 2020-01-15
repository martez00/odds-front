import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Matches from '../components/Matches.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/matches/:category',
    name: 'matches',
    component: Matches,
    props: true
  },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "active", 
    linkExactActiveClass: "active" 
})

export default router
