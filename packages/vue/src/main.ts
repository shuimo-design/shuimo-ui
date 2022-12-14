import { createApp } from 'vue';
import App from './App.vue';
import { createMUI } from '../lib';
import { MPrinter } from '../lib';
import { MConfirm } from '../lib';
import './style.scss';

const app = createApp(App);
const MUI = createMUI();
app.use(MUI).mount('#app');

app.config.globalProperties.$confirm = MConfirm;
app.config.globalProperties.$print = MPrinter('水墨测试');
