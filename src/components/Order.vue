<template>
    <div>
        <h3>order.vue</h3>
        {{state}}
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import {useRoute,useRouter} from 'vue-router'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
export default {
    setup () {
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            code : route.query.code,
            cnt : route.query.cnt,
            token: sessionStorage.getItem("TOKEN")
        })

        const handleOrderAction = async() =>{
            const url = `shop/order`;
            const headers = {
                "Content-Type": "application/json",
                "token" : state.token,
            }
            const body = {
                itemCode: state.code,
                orderCnt : state.cnt
            }
            const response = await axios.post(url, body,{headers})
            console.log(response)
            if(response.data.status ===200){
                router.push({name: "Mypage", query:{menu:4}})
            }
            //마이페이지 주문내역으로 이동
        }

        onMounted( async ()=>{
            await handleOrderAction()
        })

        return {
            state,
            handleOrderAction
        }
    }
}
</script>

<style lang="scss" scoped>

</style>