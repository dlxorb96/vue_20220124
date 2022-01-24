<template>
    <div>
        <el-form :model="form" label-width="120px">
        <ID @inputEvent="inputEvent" :ID="form.ID"></ID>
        <PW @inputPassword="inputPassword" :PW="form.PW"></PW>
        <BTN @handelClick="handelClick"></BTN>
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
        let form = reactive({
            ID: '',
            PW: ''
        })
        const inputEvent = (ID) =>{
            form.ID = ID
        }

        const inputPassword = (PW) =>{
            form.PW = PW
        } 

        const handelClick = () =>{
            console.log(form)
        }

        
        return {form, handelClick, inputEvent, inputPassword}
    }
}
</script>

<style lang="scss" scoped>

</style>