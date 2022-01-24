<template>
    <div>
        <h3>src/components/admin/menu-3.vue</h3>
        {{props}}

        <button @click="handleCount">부모메소드 호출 후 값 증가시키기</button>

    </div>
</template>

<script>
// import { computed, reactive } from '@vue/runtime-core';
export default {
    
    props:{
        title: Number,
        aaaa : String
    },
    setup (props, {emit}) {
            console.log("menu-3.vue",props.title);


        const handleCount = () =>{
            //부모의 @handleCount= "실제 호출 메소드"가 반응
            
            emit('handleCount', {});
            console.log("menu-3.vue",props.title);
        };
        
        
        return {props,handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>