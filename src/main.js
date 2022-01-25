import { createApp } from 'vue'
import App from './App.vue'

//router 설정
import routes from './routes/index.js';

//stores 설정
import stores from './stores/index.js';
// axios restful 호출
import axios from 'axios';

//element-plus 설정
import 'element-plus/theme-chalk/index.css';
import ElementPlus from 'element-plus';

import  CKEditor  from '@ckeditor/ckeditor5-vue';

//markdown-ediotr
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

////언어 설정
import VueMarkdownEditor from '@kangc/v-md-editor';
import koKR from '@kangc/v-md-editor/lib/lang/ko-KR';

// VueMarkdownEditor.lang.add({
//     'ko-KR': {
//       h1: {
//         toolbar: 'title 1',
//       },
//     },
//   });
VueMarkdownEditor.lang.use('ko-KR', koKR);

import hljs  from 'prismjs';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
  });

// Resources for the codemirror editor
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme);


//1 객체 생성
const app = createApp(App);

//2. 여기에 필요한 라이브러리 설정하기
app.use(routes)
app.use(ElementPlus)
app.use(stores)
app.config.globalProperties.axios = axios;
app.use(CKEditor)
app.use(VMdEditor);

//3. 마운트
app.mount('#app')


