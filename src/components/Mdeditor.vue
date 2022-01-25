<template>
    <div>
        <v-md-editor v-model="state.text" height="400px"></v-md-editor>
        <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        const SCRIPT = 'script'
        const state = reactive({
            text: `## Usage
\`\`\`
html
<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
      };
    },
  };
  </${SCRIPT}>`
  
            
                                
            
            
            
            
        
        })

        return {state,SCRIPT}
    }
}
</script>

<style lang="scss" scoped>

</style>