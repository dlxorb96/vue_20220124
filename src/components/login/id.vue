<template>
    <div>
        <el-form-item style="width: 300px" label="ID">
            <el-input @input="inputEvent" v-model="state.ID"></el-input>
        </el-form-item>
        {{state.ID}}
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    props:{
        ID: String
    },

    setup (props, {emit}) {
        let state = reactive({
            ID : props.ID
        })
        console.log(state.ID)
        const inputEvent = () => {
            emit('inputEvent', state.ID);
        }
        
        
        return {props, state, inputEvent }
    }
}
</script>

<style lang="scss" scoped>

</style>