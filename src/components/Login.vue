<template>
    <div>
        <el-form :model="form" label-width="120px">
        <ID @inputEvent="inputEvent" :ID="form.ID"></ID>
        <PW @inputPassword="inputPassword" :PW="form.PW"></PW>
        <BTN @handelClick="handelClick"></BTN>
        </el-form>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import ID from './login/id.vue'
import PW from './login/pw.vue'
import BTN from './login/btn.vue'
import { reactive } from '@vue/reactivity'
import axios from 'axios';
import {useStore} from 'vuex'
export default {
    components:{
        ID, PW, BTN
    },
    setup () {
        const store = useStore();
        const router = useRouter();
        let form = reactive({
            ID: '',
            PW: ''
        })
        const inputEvent = (ID) =>{
            form.ID = ID
        }

        const inputPassword = (PW) =>{
            form.PW = PW
        } 

        const handelClick = async() =>{
            console.log(form)
            const url = `/member/select`;
            const body = {
                email : form.ID,
                pw: form.PW,

            }
            const headers = {"Content-Type": "application/json"};
            const response = await axios.post(url,body, {headers}) 
            console.log(response)
            if(response.data.status===200){
                //저장소에 저장하기
                sessionStorage.setItem("TOKEN", response.data.token)
                
                //이메일, 이름정보 (공통변수)
                //actions를 호출하여 state/store변수 변경함
                store.dispatch("handleData", {}); //뒤쪽은 payload자리




                const curl = sessionStorage.getItem("CURL");
                if(curl ===null){
                    //주소창만 바뀜
                    router.push({name: "Home"});
                    //App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                    store.commit("setmenu", "/")
                }
                else{ //이동하고하는 페이지가 존재하면
                    const query = JSON.parse(sessionStorage.getItem("CURL_QUERY"))
                    const params = JSON.parse(sessionStorage.getItem("CURL_PARAMS"))
                    router.push({name: curl, query: query, params: params})
                }
                    
                
                store.commit("setLogged", true)
            }
            else{
                alert("로그인실패")
            }
            
        }

        
        return {store, form, handelClick, inputEvent, inputPassword}
    }
}
</script>

<style lang="scss" scoped>

</style>