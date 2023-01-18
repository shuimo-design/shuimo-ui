import { createApp } from 'vue';
import App from './App.vue';

import './assets/style.css';

const app = createApp(App);

const { MODE } = import.meta.env;
if (MODE === 'web-component') {
  import('../loader/web-component');
}

if (MODE === 'vue') {
  const { createMUI } = await import( 'shuimo-ui/lib');
  app.use(createMUI());
}

app.mount('#app');
