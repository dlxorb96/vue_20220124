<template>
    <div>
        <h3>.src/components/BoardWrite</h3>
        {{state}}
        제목: <input type="text" v-model="state.title"><br />
        <div style="width: 600px">
            내용: <ckeditor 
            :editor="editor.editor" 
            v-model="state.content"
            :config="editor.editorConfig"></ckeditor>
        </div>
        작성자: <input type="text" v-model="state.writer"><br />
        <img :src="state.imgUrl" style="width: 100px; height: 100px"> <br />
        이미지: <input type="file" @change="handleImg"><br />
        <button @click="handleWrite">글쓰기</button>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {

    setup () {
         const router = useRouter();
        //object
        const editor = {
            editor          : ClassicEditor,
            editorData      : '',
            editorConfig    : {}
        }
        //reactive
        const state = reactive({
            title: '',
            content: '',
            writer:'',
            imgData: '',
            imgUrl:require('../assets/default.png'),
        })
        
        //첨부 or 취소
        const handleImg = (e) =>{
            console.log("BoardWirte.vue=>handleImg", e)
            console.log(e.target.files[0])
            if(e.target.files[0]){
                state.imgData = e.target.files[0]
                state.imgUrl = URL.createObjectURL(e.target.files[0]);
            }
            else{
                state.imgData = ''
                state.imgUrl = require('../assets/default.png');
            }
        }

        const handleWrite = async()=>{
            if(state.title ===''){
                alert('제목을 입력');
                return false;
            }
            if(state.content ===''){
                alert('내용을 입력');
                return false;
            }
            if(state.writer ===''){
                alert('작성자를 입력');
                return false;
            }
            const url = '/board/insert';
            const headers = {"Content-Type": "multipart/form-data"}
            const body = new FormData();
            body.append("title", state.title);
            body.append("content", state.content);
            body.append("writer", state.writer);
            body.append("image", state.imgData);

            const response = await axios.post(url,body, {headers})
            console.log(response.data)
            router.push({name: "Board"})
        }


        return {router,state, editor, handleWrite, handleImg}
    }
}
</script>

<style lang="css">
    .ck-editor__editable {
        min-height: 500px;
    }
</style>