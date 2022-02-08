<template>
    <div>
        현재암호<input type="password"  v-model="state.pw"/> <br />
        바꿀암호<input type="password" v-model="state.pw2" /><br />
        바꿀암호확인<input type="password" v-model="state.pw3" /><br />
        <button @click="handleClick">변경하기</button>
        
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import axios from 'axios'
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            pw: '',
            pw2: '',
            pw3: '',
            token : sessionStorage.getItem("TOKEN")
        })
        const handleClick = async()=>{
            if(state.token !==null){
                if(state.pw2 !==state.pw3){
                    alert('암호가 다릅니다');
                    return false;
                }
                const url = '/member/updatepw';
                const headers = {
                    "Content-Type": "application/json",
                    "token" : state.token,
                };
                const body = {
                    pw : state.pw,
                    pw2: state.pw2,
                }
                const response = await axios.put(url, body, {headers});
                console.log(response)
                if(response.data.status ===200){
                    alert("암호 변경 완료");
                    state.pw = '';
                    state.pw2 = '';
                    state.pw3 = '';
                }
                else if (response.data.status === -1){
                    alert('틀린 암호')
                }
                else if (response.data.status === 0){
                    alert('암호 변경 없음')
                }
            }
            else{
                alert("다시 로그인 해주세요")
                router.push({name: "Home"});
                store.commit("setmenu", '/');
                store.commit('setLogged', false);
            }
        }
        

        return {state,axios, handleClick}
    }
}
</script>

<style lang="scss" scoped>

</style>