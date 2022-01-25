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
                   <td @click="handleBoardContent(tmp.no)">{{tmp.no}}</td> 
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
import { useRouter } from 'vue-router';
export default {
    setup () {
        //set up 자체가 created임
        const router = useRouter();

        const state = reactive({
            items: {},
        });
        
        //생명 주기 onMounted() 원래 mounted
        onMounted(()=>{
            state.items.result = [
                {no:1, title:'가나다', writer: 'b', hit: 4 },
                {no:2, title:'난다라요', writer: '산다라박', hit: 111 },
                {no:3, title:'미움받을용가리', writer: '정현두', hit: 6 },
            ];
        })

        const handleBoardContent = (no) =>{
            console.log(no)
            router.push({name: "Boardcontent", query: {no: no}})
            // this.router.push
            // 기존에는 이렇게 했음 import router해야함
        }

        return {state, handleBoardContent}
    }
}
</script>

<style lang="scss" scoped>

</style>