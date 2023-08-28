import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AnnualRent from '@/views/AnnualRent.vue'
import RentReceipt from '@/views/RentReceipt.vue'

// Define routes that correspond to a component.
const routes = [
  { path: '/', name: 'Accueil', component: HomePage },
  { path: '/revision-annuelle', name: 'Révision annuelle', component: AnnualRent },
  { path: '/quittance-de-loyer', name: 'Quittance de loyer', component: RentReceipt },
]

// Create the router instance and pass the `routes` option.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router
