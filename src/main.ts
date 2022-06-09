import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createWUI } from "../lib";
import { MPrinter } from "../lib";
import { MConfirm } from "../lib";
import PrismCode from './components/code/PrismCode.vue'
import ButtonDrawer from './components/code/ButtonDrawer.vue'
// import WUI from "../dist/shuimo-ui.es.js";
// import {MMessage} from "../dist/shuimo-ui.es.js";
import './style.scss'

const app = createApp(App);
const WUI = createWUI();
app.use(router)
  .use(WUI)
  .component('PrismCode', PrismCode)
  .component('ButtonDrawer', ButtonDrawer)
  .mount('#app');

app.config.globalProperties.$confirm = MConfirm;
app.config.globalProperties.$print = MPrinter('水墨测试');
