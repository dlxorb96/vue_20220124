import { createApp } from 'vue'
import App from './App.vue'

//router 설정
import routes from './routes/index.js';

//stores 설정
import stores from './stores/index.js';

//element-plus 설정
import 'element-plus/theme-chalk/index.css';
import ElementPlus from 'element-plus';


//1 객체 생성
const app = createApp(App);


//2. 여기에 필요한 라이브러리 설정하기
app.use(routes)
app.use(ElementPlus)
app.use(stores)


//3. 마운트
app.mount('#app')


