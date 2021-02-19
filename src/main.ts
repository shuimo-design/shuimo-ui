import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import WUI from "../lib";
import { WMessage } from "../lib";
import { WPrinter } from "../lib";
// import WUI from "../dist/wash-painting-ui.es.js";
// import {WMessage} from "../dist/wash-painting-ui.es.js";
import './style.scss'


const app = createApp(App);

app.use(router)
  .use(WUI)
  .mount('#app');

app.config.globalProperties.$message = WMessage;
app.config.globalProperties.print = WPrinter('水墨测试');
