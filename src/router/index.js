import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Ders from "../views/Ders";
import Dersler from "../views/Dersler";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/ders/:id",
    component: Ders
  },
  {path:'/dersler',component: Dersler}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
