<template>
    <div>
        바꿀 이름<input type="text" v-model="state.name"> <br />
        <button @click="handleClick">변경하기</button>
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import { reactive } from '@vue/reactivity'
import axios from 'axios'
export default {
    setup () {
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            name : '',
            token : sessionStorage.getItem("TOKEN")
        })
        const handleClick = async()=>{
            if(state.token !==null){
                
                const url = '/member/update';
                const headers = {
                    "Content-Type": "application/json",
                    "token" : state.token
                    }
                const body = {
                    name: state.name
                }
                const response = await axios.put(url, body, {headers})
                console.log(response)
                if(response.data.status ===200){
                    alert("변경완료");
                    state.name = '';
                }
            }
            else{
                alert("다시 로그인 해주세요")
                router.push({name: "Home"});
                store.commit("setmenu", '/');
                store.commit('setLogged', false);
            }

        }
        

        return {state , handleClick, axios}
    }
}
</script>

<style lang="scss" scoped>

</style>