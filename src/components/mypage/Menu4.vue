<template>
    <div v-if="state.items">
        {{state}}
        <table border="1">
            <button @click="handleOrderDeleteAction">삭제</button>
            <tr>
                <th>체크</th>
                <th>주문번호</th>
                <th>물품명</th>
                <th>물품가격</th>
                <th>주문수량</th>
                <th>주문일자</th>
                <th>합계 (수량 *가격)</th>
            </tr>
            
            <tr v-for="item in state.items" :key="item">
                <td><input type="checkbox" v-model="state.chk" :value="item._id"></td>
                <td>{{item._id}}</td>
                <td>{{item.itemName}}</td>
                <td>{{item.itemPrice}}</td>
                <td>{{item.orderCnt}}</td>
                <td>{{item.orderdate}}</td>
                <td>{{item.total}}</td>
            </tr>

            <tr>
                <td colspan="6">합계</td>
                <td>{{state.pricetotal}}</td>
            </tr>
            {{state.chk}}

        </table>
        menu4


    </div>
</template>

<script>
import axios from 'axios';
// import {useRoute} from 'vue-router';
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        // const route = useRoute()
        const state = reactive({
            chk: [],
            token : sessionStorage.getItem("TOKEN"),
            pricetotal : 0
        })

        onMounted(async()=>{
            await handleLoadData()
        })

        const handleLoadData = async ()=>{
            const url = `/shop/orderlist`;
            const headers = {"Content-Type": "application/json",
            "token" : state.token};
            const response = await axios.get(url,{headers})
            console.log(response)
            if(response.data.status ===200 ){
                state.items = response.data.result;

                for(let i =0; i < state.items.length; i++){
                    state.items[i]['total'] = Number(state.items[i]['itemPrice'])*
                    Number(state.items[i]['orderCnt'])
                    state.pricetotal += state.items[i]['total']
                    console.log(state.items[i]['total'])
                    console.log(state.pricetotal)
                }
            }
        }

        const handleOrderDeleteAction = async()=>{
            if(state.chk.length ===0){
                return false;
            }
            if(confirm("정말 삭제?")){
                const url = `/shop/orderdelete`;
                const headers = {"Content-Type":"application/json",
                "token": state.token};
                const body = {
                    code : state.chk
                }
                const response = await axios.delete(url, {headers:headers, data:body})
                console.log(response)
                if(response.data.status ===200){
                    alert("삭제완료");
                    await handleLoadData()
                }
            }

        }

        return {
            state,
            handleLoadData,
            handleOrderDeleteAction
            }
    }
}
</script>

<style lang="scss" scoped>

</style>