<template>
    <div>
        seller.vue
        <hr />
        <button @click="state.idx = 1">물품관리</button>
        <button @click="state.idx = 2">회원관리</button>
        <button @click="state.idx = 3">주문관리</button>
        <menu-1 v-if="state.idx===1"></menu-1>
        <menu-2 v-if="state.idx===2"></menu-2>
        <menu-3 v-if="state.idx===3"></menu-3>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Menu1 from './seller/Menu1.vue'
import Menu2 from './seller/Menu2.vue'
import Menu3 from './seller/Menu3.vue'
export default {
    components:{
        Menu1, Menu2, Menu3
    },
    setup () {
        const state = reactive({
            idx : 1
        })
        // const handleClick = (idx) =>{
        //     state.idx = idx
        // }

        return {state, }
    }
}
</script>

<style lang="scss" scoped>

</style>