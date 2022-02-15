<template>
    <div>
        menu4
        <div style="width: 600px; height: 600px;">
            <vue3-chart-js
            v-if="state.data.datasets[0].data"
            ref="chartRef"
            :id="state.id"
            :type="state.type"
            :data="state.data"
            >
            </vue3-chart-js>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import {reactive, ref} from "@vue/reactivity";
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { onMounted } from '@vue/runtime-core';
export default {
    components: {
        Vue3ChartJs,
    },
    setup () {
        const chartRef = ref(null)

        const state = reactive({
            
            id: 'doughnut',
            type: 'doughnut',
            data: {
                labels: [],
                datasets:[{
                    backgroundColor: [],
                    data: []
                }],
                },
            token : sessionStorage.getItem("TOKEN"),
            randomcolor : ['#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16']
        })

        const handleData = async()=>{
            const url = '/seller/groupitem';
            const headers = {"Content-Type": "application/json",
            "token" : state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response)
            if(response.data.status ===200){
                for(let i =0; i < response.data.result.length; i++){
                    state.data.labels[i] = response.data.result[i]._id;
                    state.data.datasets[0].backgroundColor[i] = state.randomcolor[Math.floor(Math.random()*4)]
                    state.data.datasets[0].data[i] = response.data.result[i].count
                    
                }
                console.log(state.data)
                chartRef.value.update(250)
                
            }
        }

        onMounted( async()=>{
            await handleData()
        })



        return {
            state,
            chartRef,
            
            }
    }
}
</script>

<style lang="scss" scoped>

</style>