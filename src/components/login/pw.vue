<template>
    <div>
        <el-form-item style="width: 300px" label="Password" prop="pass">
            <el-input
            @input="inputPassword"
                v-model="state.PW"
                type="password"
                autocomplete="off"/>
        </el-form-item>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        PW : String
    }
    ,
    setup (props, {emit}) {
        let state = reactive({
            PW : props.PW
        })

        const inputPassword = () =>{
            emit('inputPassword', state.PW);
        }
        

        return {state, inputPassword}
    }
}
</script>

<style lang="scss" scoped>

</style>