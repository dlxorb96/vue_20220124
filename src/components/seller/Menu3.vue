<template>
    <div>
        <h4>주문관리</h4>
        <div v-if="state.items">
            <table border="1">
                <tr>
                    <th>id</th>
                    <th>상품코드</th>
                    <th>주문수량</th>
                    <th>주문자</th>
                    <th>주문일자</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.itemCode}}</td>
                    <td>{{tmp.orderCnt}}</td>
                    <td>{{tmp.orderid}}</td>
                    <td>{{tmp.orderdate}}</td>
                </tr>
            </table>
            통계
            <table border="1">
                <thead>
                    <tr>
                        <th>상품코드</th>
                        <th>합계</th>
                    </tr>
                    <tr v-for="tmp in state.statics" :key="tmp">
                        <td>{{tmp._id}}</td>
                        <td>{{tmp.count}}</td>

                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const state = reactive({
            token: sessionStorage.getItem("TOKEN"),
        });

        //외부에서 사용하지 않음 retrun에 추가하지 않음
        const handleLoadData = async() =>{
            const url = `/seller/orderlist`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
                };
            const response = await axios.get(url, {headers})
            console.log(response)
            if(response.data.status ===200){
                state.items = response.data.result;
                let codeArr = []
                for(let i = 0; i < state.items.length; i++){
                    codeArr.push(state.items[i].itemCode);
                }
                console.log(codeArr)
                
                state.arr = codeArr.filter((val, idx) => {
                    return codeArr.indexOf(val) === idx; 
                    }); 
                console.log(state.arr)

                // const codeArr = state.items.filter((character, idx, arr)=>{
                //     return arr.findIndex((item) => item.itemCode === character.itemCode) === idx
                //     });
                // console.log(codeArr)
                // for(let i =0; i < codeArr.length; i++){
                //     state.arr.push(codeArr[i].itemCode);
                // }
                console.log(state.arr)
                console.log(typeof state.arr)
            }
        }

        

        const handleSum = async()=>{
            const url = '/shop/groupitem';
            const headers = {"Content-Type": "application/json", code: JSON.stringify(state.arr)};
            
            const response = await axios.get(url, {headers:headers})
            console.log(response)
            if(response.data.status ===200 ){
                state.statics = response.data.result;
            }
        }

        console.log("Menu3.vue")
        onMounted( async()=>{
            await handleLoadData()
            await handleSum()
        })
        return {
            state,
            }
    }
}
</script>

<style lang="scss" scoped>

</style>