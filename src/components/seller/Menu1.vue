<template>
    <div style="border : 1px solid #cccccc; padding: 20px;">
        <!-- {{state}} -->
        <button @click="handlePage">일괄추가</button>
        <button @click="handleDeleteBatch">일괄삭제</button>
        <button @click="handleUpadateBatch">일괄수정</button>
        <table border="1">
            <thead>
                <tr>
                    <th>체크</th>
                    <th>물품코드</th>
                    <th>이미지</th>
                    <th>물품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>내용</th>
                    <th>등록일</th>
                    <th>버튼</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tmp,idx) in state.items" :key="tmp">
                    <td><input type="checkbox" @change="handleCheck(tmp._id, idx)" v-model="tmp.chk"></td>
                    <!-- <td><input type="checkbox" :value="tmp._id" @change="handleCheck(tmp._id, idx)" v-model="state.chk"></td> -->
                    <td style="cursor:pointer;" @click="clickNum(tmp._id)">{{tmp._id}}</td>
                    <td><input type="file" v-show="state.editclicked[idx]" @change="handleImage($event, idx)" /><img :src="tmp.imageUrl" v-show="!state.editclicked[idx]" style="width:100px"></td>
                    <td><input type="text" v-show="state.editclicked[idx]" v-model="tmp.name1" /><p v-show="!state.editclicked[idx]">{{tmp.name}}</p></td>
                    <td><input type="text" v-show="state.editclicked[idx]" v-model="tmp.price1"/><p v-show="!state.editclicked[idx]">{{tmp.price}}</p></td>
                    <td><input type="text" v-show="state.editclicked[idx]" v-model="tmp.quantity1"/><p v-show="!state.editclicked[idx]">{{tmp.quantity}}</p></td>
                    <td><input type="text" v-show="state.editclicked[idx]" v-model="tmp.content1"/><p v-show="!state.editclicked[idx]">{{tmp.content}}</p></td>
                    <td>{{tmp.regdate}}</td>
                    <td><button @click="handleDelete([tmp._id])">삭제</button>
                    <button @click="handleEdit(idx)">수정</button></td>
                </tr>
            </tbody>
        </table>
        {{state}}
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
export default {
    setup () {
        const router = useRouter();
        const state = reactive({
            // items : [],
            editclicked : [false, false, false, false, false],
            token : sessionStorage.getItem("TOKEN"),
            chkArr : [],
            idx: []
        })

        //번호 클릭 시 
        const clickNum = (code)=>{
            router.push({name: 'Menu1Detail', query:{code:code}})
        }
        //일괄추가 클릭시
        const handlePage = ()=>{
            router.push({name: "Menu1Insert"})
        }

        //체크박스 이벤트
        const handleCheck = (code, i)=>{
            if(state.chkArr.includes(code)){
                const idx = state.chkArr.indexOf(code)
                state.chkArr.splice(idx,1)
            }
            else{
                state.chkArr.push(code);
            }
            if(state.idx.includes(i)){
                const idx = state.chkArr.indexOf(i)
                state.idx.splice(idx,1)
            }
            else{
                state.idx.push(i);
            }
            

        }

        //화면 구현
        const handleData = async() =>{
            const url = `/seller/selectlist`;
            const headers = {
                "Content-Type": "application/json",
                "token" : state.token};
            const response = await axios.get(url, {headers: headers});
            console.log(response)
            if(response.data.status ===200){
                state.items = response.data.result
            }
        }

        //수정버튼 처음 클릭, 두번 클릭
        const handleEdit = async(idx) =>{
            console.log("handleEdit", idx)
            if(!state.editclicked[idx]){
                state.editclicked[idx] = true
            }
            
            else{
                const url = `/seller/update?time=${new Date().getTime()}`;
                const headers = {"Content-Type": "multipart/form-data",
                "token": state.token}
                const body = new FormData();
                body.append("image", state.items[idx].image1);
                body.append("name", [state.items[idx].name1]);
                body.append("code", [state.items[idx]._id]);
                body.append("content", [state.items[idx].content1]);
                body.append("price", [state.items[idx].price1]);
                body.append("quantity", [state.items[idx].quantity1]);
                // const aa = JSON.stringify(body);
                // console.log(aa)
                console.log(body)
                const response = await axios.put(url, body, {headers});
                console.log(response);
                if(response.data.status===200){
                    alert('변경완료');
                    await handleData()
                    state.editclicked[idx] = false
                    // router.go() 새로고침 자동으로 하기
                }
                
            }
            
            
            
        }

        //일괄 수정
        const handleUpadateBatch = async ()=>{
            const url = `/seller/update`;
            const headers = {"Content-Type": "multipart/form-data",
            "token": state.token}
            const body = new FormData();
            for(let tmp in state.idx){    
                body.append("image", state.items[tmp].image1);
                body.append("name", state.items[tmp].name1);
                body.append("code", state.items[tmp]._id);
                body.append("content", state.items[tmp].content1);
                body.append("price", state.items[tmp].price1);
                body.append("quantity", state.items[tmp].quantity1);
                state.items[tmp].chk = false
            }
            const response = await axios.put(url, body, {headers});
            console.log(response);
            if(response.data.status===200){
                alert('변경완료');
                await handleData()
                state.editclicked = [false, false, false, false, false]
            }

            // let arr= []
                //전체 개수
            // for(let i =0; i< state.items.length; i++){
            //     //체크한 개수    
            //     for(let j=0; j <state.chk.length; j++){
            //         //전체 내용에서 체크한 번호가 일치하면
            //         if(state.items[i]._id === state.chk[j]){
            //             //arr변수에 일치하는 것만 저장    
            //             arr.push(state.items[i])
            //         }
            //     }
            // }
        }

        //일괄 삭제
        const handleDeleteBatch = async ()=>{
            
            if(!state.chkArr[0]){
                alert("체크해주세요~")
                return;
            }
            await handleDelete(state.chkArr)
            // const url = `/seller/delete`;
            // const headers = 
            // {"Content-Type" : "application/json",
            // "token" : state.token}
            // const body = {code : state.chkArr};
            // const response = await axios.delete(url, {headers:headers,
            // data:body});
            // console.log(response)
            // if(response.data.status ===200){
            //     alert('삭제완료');
            //     await handleData();
            // }
            
        }

        //삭제, 한개, 여러개 상관없음
        const handleDelete = async(code) =>{
            console.log("handleDelete", code)
            if(confirm('삭제할까요?')){
                
                const url = `/seller/delete`;
                const headers = {"Content-Type":"application/json",
                "token" : state.token};
                const body = {
                    code : code
                    //벡엔드에서 code를 받을 때 code: [1,2] 이렇게 받게 되어있음
                }
                const response = await axios.delete(url, 
                {headers:headers,
                data: body})
                console.log(response);
                if(response.data.status ===200){
                    alert("삭제완료");
                    await handleData();  
                }
            }
        }

        //이미지 첨부시
        const handleImage = (e, idx) =>{
            console.log("handleImage", e, idx)
            if(e.target.files[0]){
                state.items[idx].image1 = e.target.files[0]
            }
            else{
                console.log("첨부파일없음")
            }

        }

        //렌더링시
        onMounted(async ()=>{
            await handleData()
        })

        
        

        return {handleDeleteBatch,handleCheck, handleUpadateBatch, handleImage, 
        handleData ,handleDelete, handleEdit, handlePage,
        clickNum, 
        state, router}
    }
}
</script>

<style lang="scss" scoped>

</style>