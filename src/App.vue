<template>
    <div>
        <!-- ElMenu.vue -->
        <!-- Props로 default-active값을 전달 -->
        <!-- Props로 router True값을 전달 -->
        <!-- 자식컴포넌트 emit를 통해서 select 이벤트 -->
        <el-menu
            :default-active="state.activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
            @select="handleSelect"
        >
        <!-- boolean, Number값은 :router이렇게 보내지 않으면 문자가 날아감. -->
            <el-menu-item index="/">Home</el-menu-item>
            <el-menu-item v-if="!logged" index="/login">Login</el-menu-item>
            <el-menu-item v-if="logged" index="/logout">Logout</el-menu-item>
            <el-menu-item index="/board">Board</el-menu-item>
            <el-menu-item index="/admin">Admin</el-menu-item>
            <el-menu-item index="/join">Join</el-menu-item>
            <el-menu-item index="/seller">Seller</el-menu-item>
            <el-menu-item index="/chart">Chart</el-menu-item>
            <el-menu-item index="/boardWrite">BoardWrite</el-menu-item>
            <el-menu-item index="/mdeditor">Mdeditor</el-menu-item>
            <el-menu-item index="/boardUpdate">BoardUpdate</el-menu-item>
            <el-menu-item index="/mypage">Mypage</el-menu-item>
            <el-menu-item index="/test">Test</el-menu-item>
        </el-menu>
        <!-- 자식이 부모쪽에 메소드를 호출할 수 있게 된 경우 -->
        <div v-if="logged">{{uname}}님환영합니다</div>

        {{menu}}{{logged}}
        <hr />
        <router-view></router-view>

        
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, reactive, onMounted} from 'vue';

// import {reactive} from 'vue';
export default {
    //ver 3.0
    setup () {

        onMounted( async()=>{ //F5 새로고침
            //저장소에 있는 TOKEN값을 읽어서 존재 유무
            // TOKEN을 추가하는 시점 로그인이 완료되었을 때
            // TOKEN의 값을 제거하는 시점 로그아웃이 되었을 때
            if(sessionStorage.getItem("TOKEN") ===null){
                store.commit("setLogged", false)
            }
            else{
                //mutation을 호출하는 경우
                store.commit("setLogged", true);

                //actions를 호출하는 경우
                store.dispatch("handleData", {}); //뒤쪽은 payload자리
            }
            
        })
        // console.log(sessionStorage.getItem("TOKEN"))
        
        const store = useStore();
        
        const menu = computed(()=>{
            return store.getters.getmenu
        })
        //store의 logged값 실시간으로 확인
        const logged = computed(()=>{
            return store.getters.getLogged
        })
        const uid = computed(()=>{
            return store.getters.getUid
        })
        const uname = computed(()=>{
            return store.getters.getUname
        })
        const state = reactive({
            activeIndex : menu
        })

        //메뉴를 클릭했을 때
        // store값 변경하기
        const handleSelect= (idx)=>{
            console.log(idx)
            
            store.commit("setmenu", idx)
        }

        //실시간 감지
        //vue2에선 필요했는데 vue3에서는 computed를 사용해서
        // 필요가 없음
        // store.subscribe((mutation, state) => {
        //     console.log('store.subscribe', mutation, state);
        // })
        
        


        return {
            onMounted,
            menu, 
            state, 
            logged, 
            uid,
            uname,
            handleSelect}
    },
    // state변수 ver2.0
   
}
</script>

<style lang="scss" scoped>

</style>