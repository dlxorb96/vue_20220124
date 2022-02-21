<template>
    <div v-if="state.addSelection">
        <h3>주소관리</h3>
        <input v-model="state.address" type="text" placeholder="주소입력" />
        <button @click="handleAddress">주소등록</button>
        <hr />
        {{state}}
        <table border="1">
            <tr>
                <th>선택</th>
                <th>주소</th>
                <th colspan="3">버튼</th>
            </tr>
            <tr v-for="(tmp,idx) in state.addSelection" :key="tmp">
                <td><input type="checkbox" v-model="state.chk" :value="tmp._id"></td>
                <td><input type="text" v-model="tmp.address"></td>
                <td><button @click ="handleAddressUpdate(tmp._id, idx)">수정</button></td>
                <td><button @click ="handleAddressDelete(tmp._id)">삭제</button></td>
                <td><button @click ="handleChkUpdate(tmp._id)">대표주소설정</button></td>
            </tr>
            
            
        </table>
    </div>
</template>



<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
    setup () {
        const state = reactive({
            address : '',
            chk : [],
            token: sessionStorage.getItem("TOKEN"),
        })
        
        const handleAddress = async() =>{
            const url = 'member/insertaddr';
            const headers = {"Content-type" : "application/json",
            "token" : state.token};
            const body = {
                address : state.address,
            }
            const response = await axios.post(url,body, {headers})
            console.log(response)
            if(response.data.status === 200){
                alert("등록완료")
                state.address = '';
                handleAddress2();
            }
        }

        onMounted( async()=>{
            await handleAddress2()
        })
        const handleAddress2 = async() =>{
            const url = 'member/selectaddr';
            const headers = {"Content-type" : "application/json",
            "token" : state.token};
            
            const response = await axios.get(url, {headers})
            console.log(response)
            if(response.data.status === 200){
               state.addSelection = response.data.result;
               state.chk = response.data.chk
            }
        }

        const handleAddressDelete = async(no) =>{
            if(confirm("정말 삭제?")){
                
                const url = `/member/deleteaddr`;
                const headers = {"Content-type": "application/json",
                "token" : state.token};
                const response = await axios.delete(url,
                {headers: headers, data: {addrid : no}})
                console.log(response);
                if(response.data.status ===200){
                    alert('삭제완료');
                    await handleAddress2()
                }
            }
        }

        const handleAddressUpdate = async(no, idx) =>{
            if(confirm("수정?")){
                const url = '/member/updateaddr';
                const headers = {"Content-type": "application/json",
                "token" : state.token};
                const body = {
                    no : no,
                    address : state.addSelection[idx].address
                }
                const response = await axios.put(url, body , {headers});
                if(response.data.status ===200){
                    alert('수정완료');
                    await handleAddress2();

                }
            }
            
        }

        const handleChkUpdate = async(no) =>{
            if(confirm("대표주소설정?")){
                
                const url = '/member/updatechkaddr';
                const headers = {"Content-type": "application/json",
                "token" : state.token};
                const body = {
                    no : no
                };
                const response = await axios.put(url, body , {headers});
                console.log(response);
                if(response.data.status ===200){
                    alert("대표주소변경완료");
                    await handleAddress2()
                }
            }
        }

        return {
            state,
            handleAddress,
            handleChkUpdate,
            handleAddressDelete,
            handleAddressUpdate
        }
    }
}
</script>

<style lang="scss" scoped>

</style>