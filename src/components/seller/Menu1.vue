<template>
    <div style="border : 1px solid #cccccc; padding: 20px;">
        <!-- {{state}} -->
        <button @click="handlePage">일괄추가</button>
        <button>일괄삭제</button>
        <button>일괄수정</button>
        <table border="1">
            <thead>
                <tr>
                    <th>체크</th>
                    <th>물품코드</th>
                    <th>이미지</th>
                    <th>물품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>등록일</th>
                    <th>버튼</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td><input type="checkbox"></td>
                    <td>{{tmp._id}}</td>
                    <td><img :src="tmp.imageUrl" style="width:100px"></td>
                    <td>{{tmp.name}}</td>
                    <td>{{tmp.price}}</td>
                    <td>{{tmp.quantity}}</td>
                    <td>{{tmp.regdate}}</td>
                    <td><button>삭제</button><button>수정</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
export default {
    setup () {
        const router = useRouter();
        const state = reactive({
            // items : [],
            token : sessionStorage.getItem("TOKEN"),
        })

        const handlePage = ()=>{
            router.push({name: "Menu1Insert"})
        }

        onMounted(async ()=>{
            const url = `/seller/selectlist`;
            const headers = {
                "Content-Type": "application/json",
                "token" : state.token};
            const response = await axios.get(url, {headers: headers});
            console.log(response)
            if(response.data.status ===200){
                state.items = response.data.result
            }
        })

        return {handlePage, state, router}
    }
}
</script>

<style lang="scss" scoped>

</style>