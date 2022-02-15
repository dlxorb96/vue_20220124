<template>
    <div>
        seller.vue
        <hr />
        <button @click="handleClick(1)">물품관리</button>
        <button @click="handleClick(2)">회원관리</button>
        <button @click="handleClick(3)">주문관리</button>
        <button @click="handleClick(4)">물품별 주문관리</button>
        <button @click="handleClick(5)">시간대별 주문관리</button>
        <menu-1 v-if="state.menu===1"></menu-1>
        <menu-2 v-if="state.menu===2"></menu-2>
        <menu-3 v-if="state.menu===3"></menu-3>
        <menu-4 v-if="state.menu===4"></menu-4>
        <menu-5 v-if="state.menu===5"></menu-5>
    </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import { reactive } from '@vue/reactivity'
import Menu1 from './seller/Menu1.vue'
import Menu2 from './seller/Menu2.vue'
import Menu3 from './seller/Menu3.vue'
import Menu4 from './seller/Menu4.vue'
import Menu5 from './seller/Menu5.vue'
import { onMounted } from '@vue/runtime-core'
export default {
    components:{
        Menu1, Menu2, Menu3, Menu4, Menu5
    },
    setup () {
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            menu : Number(route.query.menu)
        })
        const handleClick = (menu) =>{
            router.push({name: "Seller", query: {menu :menu}});
            state.menu = menu;
        }
        onMounted(()=>{
            if(Number.isNaN(state.menu)){
                handleClick(1)
            }
        })
        console.log(state.menu)
        return {
            state,
            handleClick 
            }
    }
}
</script>

<style lang="scss" scoped>

</style>