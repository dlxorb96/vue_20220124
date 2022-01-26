<template>
    <div>
        <h3>Board.vue</h3>
        <router-link to="/BoardWrite">글쓰기</router-link>
        <table border="1">
            
            <thead>
                <tr>
                    <th>no</th>
                    <th>title</th>
                    <th>writer</th>
                    <th>hit</th>
                    <th>등록날짜</th>
                    <th>내용</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp in state.items.result" :key="tmp">
                   <td @click="handleBoardContent(tmp._id)">{{tmp._id}}</td> 
                   <td>{{tmp.title}}</td> 
                   <td>{{tmp.writer}}</td> 
                   <td>{{tmp.hit}}</td> 
                   <td>{{tmp.regdate}}</td> 
                   <td>{{tmp.content}}</td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        //set up 자체가 created임
        const router = useRouter();

        const state = reactive({
            items: {},
            page : 1,
            text : ''
        });
        
        //생명 주기 onMounted() 원래 mounted
        onMounted( async()=>{
            const url = `/board/select?page=${state.page}&text=${state.text}`
            const headers = {"Content-Type": "application/json"}
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status ===200){
                state.items.result = response.data.rows
                // state.items.result.content = response.data.rows.content
                console.log(state.items.result[0].content)
            }

            
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