<template>
    <div>
        <h3>src/components/admin/menu-2.vue</h3>
        {{props.title}}
    </div>
</template>

<script>
export default {
    props:{
        title: String
    },

    setup (props,) {
        console.log(props.title)

        return {props}
    }
}
</script>

<style lang="scss" scoped>

</style>