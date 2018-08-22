require('../node_modules/vuetify/src/stylus/app.styl')

import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VSubheader,
  VAvatar,
  VMenu,
  VSwitch
} from 'vuetify'

import { routes } from './routes'
import App from './App.vue'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VSubheader,
    VAvatar,
    VMenu,
    VSwitch
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  el: '#app',
  render: h => h(App),
  router
})
