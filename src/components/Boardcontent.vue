<template>
    <div>
        {{state}}

        <img :src="`/board/image?_id=${state.no}`" 
                style="width:100px;height:100px"/>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {useRoute} from 'vue-router';
// import { onMounted } from '@vue/runtime-core';
// import axios from 'axios'

export default {
    setup () {
        const route = useRoute();
        const state = reactive({
            no: route.query.no
        })        

        // onMounted( async () => {
        //     const url = `/board`
        // })
        

        return {route, state}
    }
}
</script>

<style lang="scss" scoped>

</style>