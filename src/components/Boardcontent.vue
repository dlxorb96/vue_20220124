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

        <button @click="edit2">수정2</button>

        <button v-if="state.item.prev > 0" @click="handlePN(1)">이전글</button>
        <button v-if="state.item.next > 0" @click="handlePN(2)">다음글</button><br />
        <div>댓글달기</div>
        작성자<input  type="text" v-model="state.reply.writer"/><br />
        <textarea  v-model="state.reply.content" rows="6">댓글 입력</textarea> 
        <button @click="handleReplyInput">입력</button>

        <div v-for="tmp in state.printReply" :key="tmp">
            {{tmp.writer}}
            {{tmp._id}}
            {{tmp.content}}
            {{tmp.regdate}}
            <button @click="deleteReply(tmp._id)">삭제</button>
        </div>
        
        
        
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
            reply: {},
            // item: {}
        })        

        const edit2 = () =>{
            console.log(1)
            router.push({name: "BoardUpdate", query: {no: state.no}})
            console.log(1)
        }

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
            await handleReply(state.no)
        })

        const handlePN = async(idx) => {
            if(idx  ===1 ){
                router.push({name: "Boardcontent",
                query: {no:state.item.prev}});
                state.no = state.item.prev
                await handleData(state.no)
                await handleReply(state.no)
            }
            else if(idx ===2){
                router.push({name: "Boardcontent",
                query: {no:state.item.next}})
                state.no = state.item.next
                await handleData(state.no)
                await handleReply(state.no)

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

        const handleReplyInput = async() =>{
            const url = `/board/insertReply`
            const headers = {"Content-Type": "application/json"};
            const body = {
                content : state.reply.content,
                writer: state.reply.writer,
                no : state.no
            }
            const response = await axios.post(url, body, {headers});
            console.log(response)
            if(response.data.status ===200){
                alert('댓글 달기 성공')
                await handleReply(state.no)
                state.reply = {}
            }

        }

        const handleReply = async(no) =>{
            const url = `board/selectReply?no=${no}`;
            const headers = {"Content-Type": "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response)
            if(response.data.status === 200){
                state.printReply = response.data.result
            }
        }

        const deleteReply= async(no) =>{
            if(confirm('삭제?')){    
                const url = `/board/replyDelete`
                const headers = {"Content-Type": "application/json"};
                const response = await axios.delete(url, {headers: headers, data:{_id : no}})
                if(response.data.status === 200){
                    await handleReply(state.no)
                }
            }
        }
        
        
        return {deleteReply, edit2, handleReply, handleReplyInput, handlePN, handleData, handleDelete, clickEdit, handleUpdate , route,router, state }
    }
}
</script>

<style lang="scss" scoped>

</style>