<template>
    <div>
        <button @click="handleData">클릭</button>

    </div>
</template>

<script>
import axios from 'axios'
// import { onMounted } from '@vue/runtime-core'
export default {
    setup () {


        
        
        
        const handleData = async()=>{
            
        //     const ADMIN_KEY = "f331537f379b9a877dc4765ab6a40d11"

        //     const url = "/v1/payment/ready"
        
        //     const headers = {
        //     Authorization: "KakaoAK " + ADMIN_KEY,
        //     "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        // }

        //     const params = {
        //     'cid': "TC0ONETIME",                     //가맹점 코드
        //     'partner_order_id': '1',                 //가맹점 주문번호
        //     'partner_user_id': 'TG',                 //가맹점 회원 id
        //     'item_name': '051커피 아메리카노',        //상품명
        //     'quantity': 1,                           //상품 수량
        //     'total_amount': 1,                       //상품 총액
        //     'tax_free_amount': 1,                    //상품 비과세 금액
        //     'approval_url': 'http://localhost:8080', //결제 성공 시 redirect url
        //     'fail_url': 'http://localhost:8080',     //결제 취소 시 redirect url
        //     'cancel_url': 'http://localhost:8080',   //결제 실패 시 redirect url
        // }

            // const response = await axios.post(url, {headers}, {params});
            // console.log(response)
            const url = `kakao/accout`
            const headers = {"Content-Type": "application/json"};
            const body = {
                amount : 10
            }
            const response = await axios.post(url, body, {headers})
            console.log(response)
        }

        return {
            handleData,
            
            }
    }
}
</script>

<style lang="scss" scoped>

</style>