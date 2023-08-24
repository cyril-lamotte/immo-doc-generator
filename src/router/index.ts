import { createRouter, createWebHashHistory } from 'vue-router'
import DataForm from "@/views/DataForm.vue"
import AnnualRent from "@/views/AnnualRent.vue"

// Define routes that correspond to a component.
const routes = [
  { path: '/', name: 'Informations', component: DataForm },
  { path: '/revision-annuelle', name: 'Révision annuelle', component: AnnualRent },
]

// Create the router instance and pass the `routes` option.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router
