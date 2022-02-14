<template>
{{state.item}}
    <div class="f_container" v-if="state.item" >
        <!-- 이미지 부분 -->
        <div class="img_container">
            <img :src="state.item.imageUrl" style="width:100%">
        </div>
        <!-- 설명 부분 -->
        <div>
            <h2>{{state.item.name}}</h2>
            <hr />
            <p><b class="price" style="">{{state.item.price}}</b>판매가</p>
            <p style="color: red;"><b class="s_price">{{state.item.s_price}}</b> {{state.item.randomdiscount}}%할인가</p>
            <el-input-number v-model="state.num" :min="1" :max="state.item.quantity" size="small"
                controls-position="right" @change="handleChange"/>
            <p>가격 {{state.item.s_price * state.num}}</p>
            <el-button>장바구니</el-button>
            <el-button @click="handleOrderAction" type="primary">바로구매</el-button>
        </div>


    </div>
</template>

<script>
import axios from 'axios';

import { useRoute, useRouter } from 'vue-router'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
    setup () {
        const router = useRouter()
        const route = useRoute()
        const state = reactive({
            num : 1,
            code : route.query.code,
        })

        const handleOrderAction = ()=>{
            console.log("handleOrderAction")
            router.push({
                name: "Order",
                query : {code: state.code, cnt: state.num},
                params: {code: state.code, cnt: state.num}})
        }

        const handleChange = ()=>{

        }

        const handleData= async ()=>{
            const url = `/shop/selectone?code=${state.code}`;
            const headers = {"Content-type": "application/json"};
            const response = await axios.get(url, {headers});
            if(response.data.status ===200){
                state.item = response.data.result;
                state.item.randomdiscount = Math.floor(Math.random() * 10 * Math.random() *10 )
                state.item.s_price = state.item.price / 100 * (100 - state.item.randomdiscount)
            }
            
        }
        

        onMounted(async()=>{
            await handleData()
        })
        return {
            
            handleChange,
            handleOrderAction,
            state,route, axios}
    }
}
</script>

<style lang="scss" scoped>

.f_container{
    display: flex; 
    justify-content: center;
    margin-top: 50px;   
}

.img_container{
    max-width: 40%;
    margin-right : 100px
}

.price{
    font-size: 25px; 
    margin-right: 10px; 
    text-decoration: line-through;
}

.s_price{
    font-size: 25px;
    margin-right: 10px;
}

</style>