<template>
    <div>
        <button @click="handleMenu(1)">정보수정</button>
        <button @click="handleMenu(2)">암호변경</button>
        <button @click="handleMenu(3)">회원탈퇴</button>
        <button @click="handleMenu(4)">주문내역</button>
        <button @click="handleMenu(5)">주소관리</button>
        
        <!-- <component :is="Menu1"></component> -->
        <menu-1 v-if="state.menu ===1"></menu-1>
        <menu-2 v-if="state.menu ===2"></menu-2>
        <menu-3 v-if="state.menu ===3"></menu-3>
        <menu-4 v-if="state.menu ===4"></menu-4>
        <menu-5 v-if="state.menu ===5"></menu-5>
    </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {useRouter} from 'vue-router'
import { reactive } from '@vue/reactivity'
import Menu1 from './mypage/Menu1.vue'
import Menu2 from './mypage/Menu2.vue'
import Menu3 from './mypage/Menu3.vue'
import Menu4 from './mypage/Menu4.vue'
import Menu5 from './mypage/Menu5.vue'
import { onMounted } from '@vue/runtime-core'
export default {
    components:{
        Menu1, Menu2 , Menu3, Menu4, Menu5
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        
        const state = reactive({
            menu : Number(route.query.menu),
            
        })

        onMounted(()=>{
            if(typeof route.query.menu ==='undefined'){
                handleMenu(1)
            }
        })

        console.log(state.menu)

        const handleMenu = (idx) =>{
            router.push({name:"Mypage", query: {menu:idx}})
            state.menu = idx
        }

        return {state,
        handleMenu}
    }
}
</script>

<style lang="scss" scoped>

</style>