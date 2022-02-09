<template>
    <div>
        {{state}}
        <h5>메뉴 일괄 추가</h5>
        <button @click="state.cnt+=1">추가</button>
        <button @click="handleSub">삭제</button>
        <table>
            <tr v-for="(tmp,idx) in state.cnt" :key ="tmp">
                
                <td><input @change="handleImage($event, idx)" type="file" placeholder="물품명"/></td>
                <td><input type="text" v-model="state.name[idx]" placeholder="물품명"/></td>
                <td><input type="text" v-model="state.price[idx]" placeholder="가격"/></td>
                <td><input type="text" v-model="state.quantity[idx]" placeholder="수량"/></td>
                <td><input type="text" v-model="state.content[idx]" placeholder="설명"/></td>
                {{state}}
            </tr>
        </table>
        <button @click="handleInsertActino">추추추</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const router = useRouter();
        const state = reactive({
            cnt : 2,
            image: [],
            name:[],
            price: [],
            quantity: [],
            content: [],
            token : sessionStorage.getItem("TOKEN")
        })
        
        //파일 첨부하거나 또는 취소할 때 반응한다.
        const handleImage = (e, idx) =>{
            if(e.target.files[0]){
                state.image[idx] = e.target.files[0];
            }
            else{
                console.log("첨부된 파일이 없음")
            }
            console.log(e, idx)
            

        }
        // const handleSub = ()=>{
        //     state.cnt+=1
        // }
        const handleSub = () =>{
            state.cnt-=1
            if(state.cnt < 2){
                state.cnt = 2
            }
        }
        const handleInsertActino= async() =>{
            const url = '/seller/insert';
            const headers = {"Content-Type" : "multipart/form-data",
            "token" : state.token};
            let body = new FormData();
            for(let i =0; i < state.name.length; i++){
                body.append("image", state.image[i]);
                body.append("name", state.name[i]);
                body.append("content", state.content[i]);
                body.append("price", state.price[i]);
                body.append("quantity", state.quantity[i]);
            }
            const response = await axios.post(url, body, {headers} );
            if(response.data.status ===200){
                alert("추가완료")
                router.push({ name: "Seller"})
            }

    console.log(url,headers,body,response);
        }
        return {state,handleSub, handleInsertActino, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>