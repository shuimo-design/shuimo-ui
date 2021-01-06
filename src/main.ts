import {createApp} from 'vue';
import App from './App.vue';
import WUI from "../lib";
import './style.scss'


createApp(App)
  .use(WUI)
  .mount('#app')
