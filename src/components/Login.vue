<template>
    <div>
        <el-form :model="form" label-width="120px">
        <ID :ID="form.ID"></ID>
        <PW :PW="form.PW"></PW>
        <BTN></BTN>
        </el-form>
    </div>
</template>

<script>
import ID from './login/id.vue'
import PW from './login/pw.vue'
import BTN from './login/btn.vue'
import { reactive } from '@vue/reactivity'
export default {
    components:{
        ID, PW, BTN
    },
    setup () {
        const form = reactive({
            ID: '',
            PW: ''
        })
        return {form}
    }
}
</script>

<style lang="scss" scoped>

</style>