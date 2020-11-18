import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { WInput, WButton } from "../components";

createApp(App)
    .component('WInput', WInput)
    .component('WButton', WButton)
    .mount('#app')
