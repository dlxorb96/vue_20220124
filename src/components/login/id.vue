<template>
    <div>
        <el-form-item style="width: 300px" label="ID">
            <el-input v-model="state.ID"></el-input>
        </el-form-item>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        ID: String
    },

    setup (props) {
        let state = reactive({
            ID : props.ID
        })
        console.log(props)
        
        return {props, state }
    }
}
</script>

<style lang="scss" scoped>

</style>