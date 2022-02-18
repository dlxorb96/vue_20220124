//npm install vuex@next --save
import {createStore} from 'vuex';
import axios from 'axios';



//모든 컴포넌트에서 공통덕으로 사용할 변수설정
//props와 emit를 여기에서 처리함.

const stores = createStore({

    //공통 상태 변수
    state : {
        // menu1 : sessionStorage.getItem("CURL1"), //index가 문자라서 숫자가 안됨
        menu   : sessionStorage.getItem("CURL"), //index가 문자라서 숫자가 안됨
        logged : false,
        uid    : '',  // 로그인한 사용자의 이메일 정보
        uname  : '',  //로그인한 사용자의 이름
        urole  : '',
        token  : '',  // 토큰을저장소에 보관하지 않고 사용
        
    },

    //가져가기 (getter)
    getters:{
        getmenu(state){
            return state.menu
        },
        getLogged(state){
            return state.logged;
        },
        getUid(state){
            return state.uid;
        },
        getUname(state){
            return state.uname;
        },
        getUrole(state){
            return state.urole;
        }
    },

    //변경하기 (mutation) : 즉시 변경
    mutations: {
        setmenu(state,value){
            state.menu = value    
        },
        setLogged(state,value){
            state.logged = value
        },
        setUid(state,value){
            state.uid = value
        },
        setUname(state,value){
            state.uname = value
        },
        setUrole(state,value){
            state.urole = value
        },
    },

    //변경하기(action) : 기다려야 되는 상황, 벡엔드 연동이 필요한 경우
    actions: {
        async handleData(context , payload){
            console.log(payload)
            const token = sessionStorage.getItem("TOKEN");
            if(typeof token !== 'undefined' && token !==null){
                const url = `/member/validation`;
                const headers = {
                "Content-Type": "application/json",
                "token" : token,
                };
                const response = await axios.get(url, {headers})
                if(response.data.status ===200){
                    context.commit("setUid", response.data.uid);
                    context.commit("setUname", response.data.uname);
                    context.commit("setUrole", response.data.urole);
                    context.commit("setLogged", true);
                }
                else{
                    //토큰의 유효성을 검사하여 통과하지 못할경우
                    context.commit("setLogged", false);
                }
            }
            
        }
    }
    
})

export default stores