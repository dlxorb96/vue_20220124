<template>
    <div>
        <h3>src/components/admin/menu-1.vue</h3>
        {{props.title}}
            <el-button type="primary">Primary</el-button>

    </div>
</template>

<script>
export default {
    //부모 컴포넌트에서 전달되는 값을 보관
    props: {
        title : String
    },

    setup (props) {
        console.log(props.title)
        
        return {props}
    }
}
</script>

<style lang="scss" scoped>

</style>