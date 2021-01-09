import {createApp} from 'vue';
import App from './App.vue';
import WUI from "../lib";
import './style.scss'
import {WMessage} from "../lib";


const app = createApp(App);

app.use(WUI).mount('#app');

app.config.globalProperties.$message = WMessage;
