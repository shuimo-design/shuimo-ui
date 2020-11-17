import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { WInput } from "../components";

createApp(App)
    .component('WInput', WInput)
    .mount('#app')
