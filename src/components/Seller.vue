<template>
    <div>
        seller.vue
        <hr />
        <button @click="handleClick(1)">물품관리</button>
        <button @click="handleClick(2)">회원관리</button>
        <button @click="handleClick(3)">주문관리</button>
        <menu-1 v-if="state.menu===1"></menu-1>
        <menu-2 v-if="state.menu===2"></menu-2>
        <menu-3 v-if="state.menu===3"></menu-3>
    </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import { reactive } from '@vue/reactivity'
import Menu1 from './seller/Menu1.vue'
import Menu2 from './seller/Menu2.vue'
import Menu3 from './seller/Menu3.vue'
import { onMounted } from '@vue/runtime-core'
export default {
    components:{
        Menu1, Menu2, Menu3
    },
    setup () {
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            menu : Number(route.query.menu)
        })
        const handleClick = (menu) =>{
            state.menu = menu
            router.push({name: "Seller", query: {menu :menu}})
        }
        onMounted(()=>{
            if(Number.isNaN(state.menu)){
                handleClick(1)
            }
            // if(typeof state.menu ===NaN){
                
            // }
        })
        console.log(state.menu)
        return {state,
        handleClick }
    }
}
</script>

<style lang="scss" scoped>

</style>