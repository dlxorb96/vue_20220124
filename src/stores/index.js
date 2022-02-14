//npm install vuex@next --save
import {createStore} from 'vuex';


//모든 컴포넌트에서 공통덕으로 사용할 변수설정
//props와 emit를 여기에서 처리함.

const stores = createStore({

    //공통 상태 변수
    state : {
        // menu1 : sessionStorage.getItem("CURL1"), //index가 문자라서 숫자가 안됨
        menu : sessionStorage.getItem("CURL"), //index가 문자라서 숫자가 안됨
        logged : false,
    },

    //가져가기 (getter)
    getters:{
        getmenu(state){
            return state.menu
        },
        getLogged(state){
            return state.logged;
        }
    },

    //변경하기 (mutation) : 즉시 변경
    mutations: {
        setmenu(state,value){
            // if(menu1){
            //     state.menu1 = value    
            // }
            // else{
                state.menu = value    
            // }
            
        },
        setLogged(state,value){
            state.logged = value
        }
    },

    //변경하기(action) : 기다려야 되는 상황
    actions: {

    }
    
})

export default stores