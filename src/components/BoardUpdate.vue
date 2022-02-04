<template>
    <div>
        BoardUpdate.vue
        <input type="text">
        <input type="text">
        {{state}}
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        
        // const convert = require('xml-js');
        const route = useRoute();
        const state = reactive({
            no : route.query.no
        })

        const test = async() =>{
            const serviceKey = 'bmBOHC%2FtaD5zYdsTAvNFJFFYxZ7I0iVivPi96Qf5fARvKJvXhY1rdlgRtSlFuWpMfpgJYCYQ2acJiQM4JingCg%3D%3D'
            const numOfRows = '10000'
            const pageNo = '1'
            const resultType = 'json'
            
            const url = `http://apis.data.go.kr/6260000/BusanTrafficLightInfoService/getWarningLightInfo?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&resultType=${resultType}`
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            // if(response.request.status=== 200){
                
            // var responseJSON = convert.xml2json(response.data, {compact: true, spaces: 4});
            // const obj = JSON.parse(responseJSON)
            // console.log(obj)
            // }
            
        }

    // var xml2json = new XMLtoJSON(); 
    // var objson = xml2json.fromStr(data); // object 형식 var strjson = xml2json.fromStr(data, 'string'); // string 형식



        onMounted(  async()=>{
            await test()

        })

        return {test, route, state}
    }
}
</script>

<style lang="scss" scoped>

</style>