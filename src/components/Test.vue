<template>
    <div>
        <button @click="handleData">클릭</button>
        <!-- <a v-if="state.next_redirect_pc_url" :href="state.next_redirect_pc_url">123</a> -->
    </div>
</template>

<script>
import axios from 'axios'
// import useRouter from 'vue-router';
import { reactive } from '@vue/reactivity'
// import { onMounted } from '@vue/runtime-core'
export default {
    setup () {
        // const router = useRouter()
        const state = reactive({
            redirectUrl : ''
        })

        // onMounted(async()=>{
        //     await handleData()
        // })
        
        
        const handleData = async()=>{
            const url = `kakao/accout`
            const headers = {"Content-Type": "application/json"};
            const body = {
                amount : 10
            }
            const response = await axios.post(url, body, {headers})
            console.log(response)
            if(response.data.status === 200){
                state.redirectUrl = response.data.result.next_redirect_pc_url
                console.log(state.redirectUrl)
                window.location.href = state.redirectUrl;
            }
        }

        return {
            handleData,
            state
            }
    }
}
</script>

<style lang="scss" scoped>

</style>