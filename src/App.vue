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
            <el-menu-item index="/login">Login</el-menu-item>
            <el-menu-item index="/board">Board</el-menu-item>
            <el-menu-item index="/admin">Admin</el-menu-item>
        </el-menu>
        <!-- 자식이 부모쪽에 메소드를 호출할 수 있게 된 경우 -->
        
        {{menu}}{{logged}}
        <hr />
        <router-view></router-view>

        
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';

// import {reactive} from 'vue';
export default {
    //ver 3.0
    setup () {
        
        const store = useStore();
        
        const menu = computed(()=>{
            return store.getters.getmenu
        })
        const logged = computed(()=>{
            return store.getters.getLogged
        })
        const state = reactive({
            activeIndex : menu
        })

        const handleSelect= (idx)=>{
            console.log(idx)
            store.commit("setmenu", idx)
        }

        //실시간 감지
        store.subscribe((mutation, state) => {
            console.log('store.subscribe', mutation, state);
        })
        
        


        return {menu, state, logged, handleSelect}
    },
    // state변수 ver2.0
   
}
</script>

<style lang="scss" scoped>

</style>