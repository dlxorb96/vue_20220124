<template>
    <div>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">LogIn</el-button>
        </el-form-item>
    </div>
</template>

<script>
export default {
    props:{

    },
    
    setup (props, {emit}) {
        const onSubmit = ()=>{
            emit('handelClick', {});
            console.log(111)
        }

        return {onSubmit}
    }
}
</script>

<style lang="scss" scoped>

</style>