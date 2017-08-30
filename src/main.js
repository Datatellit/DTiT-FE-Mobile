// Import Vue
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Import F7
import 'framework7'
// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'
// Import F7 iOS Theme Styles
import 'framework7/dist/css/framework7.ios.min.css'
import 'framework7/dist/css/framework7.ios.colors.min.css'
import routes from './routes'
import 'animate.css'
// Import App Custom Styles
import './css/app.css'
// Import App Component
import App from './App'
import dtitjs from 'dtitjs'
import config from './config'

Vue.use(VueAxios, axios)
// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.prototype.$d = dtitjs
Vue.prototype.$hub = new Vue()
Vue.prototype.$config = config

/* eslint-disable */
new Vue({
  el: '#app',
  template: '<app :title.sync="title"/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes
  },
  // Register App Component
  components: {
    app: App
  },
  data: {
    title: 'APP Demo'
  }
})
