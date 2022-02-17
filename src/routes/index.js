//npm install vue-router@next --save
//파일명: src/routes/index.js
import { createWebHashHistory, createRouter } from "vue-router";
import Home from '@/components/Home.vue';
import Board from '@/components/Board.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Admin from '@/components/Admin.vue';
import Join from '@/components/Join.vue';
import Boardcontent from '@/components/Boardcontent.vue';
import Chart from '@/components/Chart.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import Mdeditor from '@/components/Mdeditor.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';
import Mypage from '@/components/Mypage.vue';
import Test from '@/components/Test.vue';
import Seller from '@/components/Seller.vue';
import Menu1Insert from '@/components/seller/Menu1Insert.vue';
import Menu1Detail from '@/components/seller/Menu1Detail.vue';
import Productdetail from '@/components/Productdetail.vue';
import Order from '@/components/Order.vue';
import Cart from '@/components/Cart.vue';



//라우트 설정하기
const routes = [
    {path: '/', name: "Home", component:Home},
    {path: '/board', name: "Board", component:Board},
    {path: '/login', name: "Login", component:Login},
    {path: '/logout', name: "Logout", component:Logout},
    {path: '/admin', name: "Admin", component:Admin},
    {path: '/join', name: "Join", component:Join},
    {path: '/boardcontent', name: "Boardcontent", component:Boardcontent},
    {path: '/chart', name: "Chart", component:Chart},
    {path: '/boardWrite', name: "BoardWrite", component:BoardWrite},
    {path: '/mdeditor', name: "Mdeditor", component:Mdeditor},
    {path: '/boardUpdate', name: "BoardUpdate", component:BoardUpdate},
    {path: '/mypage', name: "Mypage", component:Mypage},
    {path: '/test', name: "Test", component:Test},
    {path: '/seller', name: "Seller", component:Seller},
    {path: '/menu1Insert', name: "Menu1Insert", component:Menu1Insert},
    {path: '/menu1Detail', name: "Menu1Detail", component:Menu1Detail},
    {path: '/productdetail', name: "Productdetail", component:Productdetail},
    {path: '/order', name: "Order", component:Order},
    {path: '/cart', name: "Cart", component:Cart},
]

//라우터 생성(주소표기방식, 라우터설정변수)
const router = createRouter({
    history : createWebHashHistory(), //127.0.0.1:8080/#/login webhistory는 우리가 익숙한 방식
    routes  : routes //위에 routes설정한거랑 같은 이름
})

//라우터 이동경로 확인(이동하는 페이지, 이동전페이지, 다음페이지로 이동)
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    console.log('이동하는 페이지 :', to);
    
    //저장소에 보관하기
    // sessionStorage.setItem("CURL", to.name);
    console.log('이동 전 페이지 :', from);

    const token = sessionStorage.getItem("TOKEN");
    // console.log(token)


    //추가)토큰이 유효한 상태인지를 주기적 확인 후에 페이지 진입
    // axios 를 이용해서 벡엔드연동 할 예정

    //로그인이 되어야만 이동하는 페이지의 조건
    // ex)주문페이지, 회원용게시판의 글쓰기
    if(to.name === "Order"|| to.name === "BoardWrite"){
        if(token === null){
            //로그인 성공하고 이동하고 페이지를 알려주는. 역할
            //로그인 CURL을 꺼내서 원하는 페이지로 이동
            sessionStorage.setItem("CURL", to.name);

            //sessionStorage는 object자체를 보관할 수 없음
            //방법은 object -> string으로 변환해서 보관함
            sessionStorage.setItem("CURL_QUERY", JSON.stringify(to.query))
            sessionStorage.setItem("CURL_PARAMS", JSON.stringify(to.params))
            return next({name: "Login"}); //로그인 페이지로 이동
        }
    }

    // if(from.name === "Order"||from.name === "BoardWrite" &&to.name === "Login"){

    // }
    

    if(to.name !=="Login"){
        sessionStorage.removeItem("CURL")
        sessionStorage.removeItem("CURL_QUERY")
        sessionStorage.removeItem("CURL_PARAMS")
    }
    next()
})

export default router;