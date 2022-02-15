<template>
    <div>
        <h4>회원관리</h4>
        <table border="1">
            <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>가입일자</th>
                </tr>
                
            </thead>
            <tbody>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.name}}</td>
                    <td>{{tmp.regdate}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const state = reactive({
            token: sessionStorage.getItem("TOKEN")
        })
        const handleData = async()=>{
            const url = 'seller/memberlist';
            const headers = {"Content-Type": "application/json",
            "token": state.token};
            const response = await axios.get(url, {headers});
            console.log(response)
            if(response.data.status ===200){
                state.items =response.data.result
            }
        }

        onMounted(async()=>{
            await handleData()
        })

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>