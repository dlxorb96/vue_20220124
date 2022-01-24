//npm install vue-router@next --save
//파일명: src/routes/index.js
import { createWebHashHistory, createRouter } from "vue-router";
import Home from '@/components/Home.vue';
import Board from '@/components/Board.vue';
import Login from '@/components/Login.vue';
import Admin from '@/components/Admin.vue';



//라우트 설정하기
const routes = [
    {path: '/', name: "Home", component:Home},
    {path: '/board', name: "Board", component:Board},
    {path: '/login', name: "Login", component:Login},
    {path: '/admin', name: "Admin", component:Admin},
]

//라우터 생성(주소표기방식, 라우터설정변수)
const router = createRouter({
    history : createWebHashHistory(), //127.0.0.1:8080/#/login webhistory는 우리가 익숙한 방식
    routes  : routes //위에 routes설정한거랑 같은 이름
})

//라우터 이동경로 확인(이동하는 페이지, 이동전페이지, 다음페이지로 이동)
router.beforeEach((to, from, next) => {
    console.log('이동하는 페이지 :', to.path);
    
    //저장소에 보관하기
    sessionStorage.setItem("CURL", to.path);
    console.log('이동 전 페이지 :', from);
    next(); //다음페이지로 이동
})

export default router;