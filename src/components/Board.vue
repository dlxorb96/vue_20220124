<template>
    <div>
        <h3>Board.vue</h3>
        {{state}}
        <table border="1">
            <thead>
                <tr>
                    <th>no</th>
                    <th>title</th>
                    <th>writer</th>
                    <th>hit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp in state.items.result" :key="tmp">
                   <td>{{tmp.no}}</td> 
                   <td>{{tmp.title}}</td> 
                   <td>{{tmp.writer}}</td> 
                   <td>{{tmp.hit}}</td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
export default {
    setup () {
        //set up 자체가 created임
        const state = reactive({
            items: {},
        })

        console.log(1)

        const aa = () =>{
            console.log(1);
            console.log(state);
        }
        aa()
        
        //생명 주기 onMounted() 원래 mounted
        onMounted(()=>{
            state.items.result = [
                {no:1, title:'가나다', writer: 'b', hit: 4 },
                {no:2, title:'난다라요', writer: '산다라박', hit: 111 },
                {no:3, title:'미움받을용가리', writer: '정현두', hit: 6 },
                
            ];
            console.log(state)
            
        })

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>