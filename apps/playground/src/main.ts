import { createApp } from 'vue';
import App from './App.vue';

import './assets/style.css';
import { createMUI } from 'shuimo-ui/lib';
const app = createApp(App);

const { MODE } = import.meta.env;
if (MODE === 'web-component') {
  import('../loader/web-component');
}

if (MODE === 'vue') {
  app.use(createMUI())
}

app.mount('#app');
