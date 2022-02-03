<template>
    <div v-if= state.item>
        {{state.item}} <hr />
        제목: {{state.item.title}} <br />
        내용: {{state.item.content}} <br />
        작성자: {{state.item.writer}} <br />
        조회수: {{state.item.hit}} <br />
        등록일자: {{state.item.regdate}} <br />
        
        <img :src="state.item.imageurl" 
                style="width:100px;height:100px"/> <br />
        <router-link to="/board"><button>목록으로</button></router-link>
        <button @click="handleDelete">삭제</button>
        <el-button type="text" 
        @click="clickEdit">
        수정</el-button>

        <el-dialog v-model="state.dialogFormVisible" title="수정하기">
            <el-form :model="state.form">
            <el-form-item label="제목" label-width="70px">
                <el-input v-model="state.form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="내용" label-width="70px">
                <el-input v-model="state.form.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="작성자" label-width="70px">
                <el-input v-model="state.form.writer" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="이미지" label-width="70px">
                <el-input v-model="state.form.name" autocomplete="off"></el-input>
            </el-form-item> -->
            </el-form>

            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleUpdate"
                >Confirm</el-button
                >
            </span>
            </template>
        </el-dialog>
        <button v-if="state.item.prev > 0" @click="handlePN(1)">이전글</button>
        <button v-if="state.item.next > 0" @click="handlePN(2)">다음글</button>
        댓글출력
        
    </div>
</template>

<script>
import { reactive} from '@vue/reactivity';
import {useRoute} from 'vue-router';
import { useRouter } from 'vue-router';
// import { onMounted } from '@vue/runtime-core';
import axios from 'axios'
import {  onMounted } from '@vue/runtime-core';

export default {
    setup () {
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            no: route.query.no,
            dialogFormVisible : false,
            form: {},
            // item: {}
        })        

        const handleData= async(no) =>{
            const url = `/board/selectOne?no=${no}`;
            const headers = {"content-Type": "application/json"};
            const response = await axios.get(url, {headers})
            console.log(response)
            if(response.data.status === 200){
                state.item = response.data.result;
            }
        }

        onMounted( async () =>{
            await handleData(state.no);
            await test()
        })

        const handlePN = async(idx) => {
            if(idx  ===1 ){
                router.push({name: "Boardcontent",
                query: {no:state.item.prev}});
                state.no = state.item.prev
                await handleData(state.no)
            }
            else if(idx ===2){
                router.push({name: "Boardcontent",
                query: {no:state.item.next}})
                state.no = state.item.next
                await handleData(state.no)

            }
        }

        const handleDelete = async () =>{
            if(confirm('삭제할까요?')){
                console.log('handleData')
                const url = `/board/delete?no=${state.no}`;
                const headers = {"content-Type": "application/json"};
                const response = await axios.delete(url, {hedaers: headers, data:{}})
                console.log(response)
                if(response.data.status ===200){
                    router.push({name: "Board", query: {page:1, text: ''}})
                }
            }
        }

        const clickEdit = async () =>{
            state.dialogFormVisible = true
            const url = `board/selectOne?no=${state.no}`;
            const headers = {"Content-Type": "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response)
            state.form.title = response.data.result.title
            state.form.content = response.data.result.content
            state.form.writer = response.data.result.writer
        }

        

        const handleUpdate = async ()=>{
            state.dialogFormVisible = false;
            const url = `/board/update?no=${state.no}`;
            const headers= {"Content-Type": "application/json"};
            const body = {
                title: state.form.title,
                content: state.form.content,
                writer: state.form.writer,
            }
            const response = await axios.put(url,body, {headers})
            console.log(response);
            if(response.data.status ===200){
                await handleData(state.no)
            }
        }


        const test = async() =>{
            var xhr = new XMLHttpRequest();
            var url = 'http://apis.data.go.kr/6260000/BusanTrafficLightInfoService/getWarningLightInfo'; /*URL*/
            var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'서비스키'; /*Service Key*/
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
            queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); /**/
            xhr.open('GET', url + queryParams);
            xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
                }
            };

            xhr.send('');
            
        }
        
        return {test, handlePN, handleData, handleDelete, clickEdit, handleUpdate , route,router, state }
    }
}
</script>

<style lang="scss" scoped>

</style>