import { createApp } from 'vue';
import App from './App.vue';
// import '@shuimo-design/web-component/index.ts';
import './assets/style.css';
import { createMUI } from 'shuimo-ui/lib';
import style from 'shuimo-ui/lib/style.pcss';

const app = createApp(App);
app
  .use(createMUI())
  .mount('#app');
