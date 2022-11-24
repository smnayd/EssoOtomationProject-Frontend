import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
const instance = axios.create({
    baseURL: "https://localhost:5001/api"
})
// axios.defaults.baseURL="https://localhost:5001"
app.config.globalProperties.$ajax = instance;
app.use(router)
app.use(VueAxios,axios)
app.mount('#app')


