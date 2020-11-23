import { createApp } from 'vue'
import App from './App.vue'
import WUI from "../components";
import './style.scss'
import '../components/style.scss'


createApp(App)
    .use(WUI)
    .mount('#app')
