<template>
    <div>
        <el-form-item style="width: 300px" label="Password" prop="pass">
            <el-input
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
    setup (props) {
        let state = reactive({
            PW : props.PW
        })
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>