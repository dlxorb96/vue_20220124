<template>
    <div>
        암호<input type="password" v-model="state.pw" /><br />
        <button @click="handleClick">탈퇴하기</button>
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import axios from 'axios';
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const store = useStore()
        const router = useRouter()
        const state = reactive({
            pw: '',
            token : sessionStorage.getItem("TOKEN"),
        })
        
        const handleClick = async()=>{
            if(state.token !==null){
                
                const url = '/member/delete';
                const headers = {
                    "Content-Type": "application/json",
                    "token" : state.token
                    }
                const body = {
                    pw : state.pw
                }
                const response = await axios.delete(url, {headers: headers,
                data: body})
                console.log(response)
                if(response.data.status ===200){
                    alert("삭제완료");
                    router.push({name: "Home"});
                    store.commit("setmenu", '/');
                    store.commit('setLogged', false);
                }
            }
            else{
                alert("다시 로그인 해주세요")
                router.push({name: "Home"});
                store.commit("setmenu", '/');
                store.commit('setLogged', false);
                
            }
        }

        return {state, handleClick}
    }
}
</script>

<style lang="scss" scoped>

</style>