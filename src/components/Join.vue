<template>
    <div class="style1">
        <h3>src/components/Join.vue</h3>
        이메일<input type="text" ref="userid" @keyup="handleEmailCheck" v-model="state.userid">
        <div>{{state.userMailChk}}</div>
        암호<input type="password" v-model="state.userpw"><br />
        암호확인<input type="password" v-model="state.userpw1"><br />
        이름<input type="text" v-model="state.username"><br />
        <button @click="handleJoin">회원가입</button>
        {{state}}
    </div>
</template>

<script>
import {reactive , ref} from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();
        //High 레벨 : 변수 생성 : 오브젝트만 변화 감지
        //깊이 있는 걸 통제 어려움
        //내용물만 바꾸고 싶으면 reactive 오브젝트로만 가능.
        const state = reactive({
            userid  : "",
            userpw  : '',
            userpw1 : '',
            username: '',
            userMailChk : '중복확인',
        })
        //low레벨: 변수 생성: 오브젝트가 아님
        //깊이 있는 통제 가능, 
        //focus이동같은 게 안됨, 클릭, 개체를 세밀하게 들어갈때
        //내용물을 바꾸는 reactive의 역할도 할 수 있고, (v-model로 접근)
        const userid = ref(null);   // 위에서 연결하면 bbb값은 의미가 없음
        const userpw = ref(null);
        const userpw1 = ref(null);
        const username = ref(null);
        console.log(userid)


        const validEmail = (email) => {
            //정규표현식
            var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
            return re.test(email);
        }

        const handleEmailCheck = async()=>{
            if(validEmail(state.userid)){
                const url = `/member/emailcheck?email=${state.userid}`;
                const headers = {"Content-Type": "apllication/json"};
                const response = await axios.get(url, {headers});
                console.log(response);
                if(response.data.status ===200){    
                    if(response.data.result ===1){
                        state.userMailChk = '사용불가'
                    }
                    else{
                        state.userMailChk = '사용가능'
                    }
                }
                else{
                    state.userMailChk = '중복확인'
                }
            }
            

        }
        
        const handleJoin = async() =>{
            if(state.userid ===''){
                alert('ID를 입력하세요');
                userid.value.focus();
                return false;
            }
            if(state.userpw ===''){
                alert('비밀번호를 입력하세요');
                return false;
            }
            if(state.userpw1 ===''){
                alert('비밀번호확인');
                return false;
            }
            if(state.userpw1 !==state.userpw){
                alert('비밀번호 다름');
                return false;
            }
            
            if(state.username ===''){
                alert('이름 입력~');
                return false;
            }
            if(state.userMailChk !== '사용가능'){
                alert('사용할 수 없는 이메일');
                return false;
            }
        
            // 유효성 검증 완료되는 시점에 벡엔드 연동

            const url = "/member/insert";
            const headers = {"Content-Type": "application/json"};
            const body = {
                email : state.userid,
                pw    : state.userpw,
                name  : state.username
            }
            const response = await axios.post(url, body, {headers:headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('회원가입 완료')
                router.push({name : "Login"})
            }
            
        }

        return {state, handleJoin, userid, userpw, userpw1, 
        username, handleEmailCheck,validEmail, router}
    }
}
</script>

<!-- 전처리 소스라 함 css로 변환하는 과정이 필요함
 scss, less => css -->

<style lang="scss" scoped>
    .style1{
        border: 1px solid red;
        padding: 20px;
    }
</style>