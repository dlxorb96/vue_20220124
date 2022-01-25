<template>
    <div>
        {{state}}
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {useRoute} from 'vue-router';

export default {
    setup () {
        const route = useRoute();
        const state = reactive({
            no: route.query.no
        })        
        

        return {route, state}
    }
}
</script>

<style lang="scss" scoped>

</style>