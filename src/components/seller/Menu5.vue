<template>
    <div>
        
        <vue3-chart-js 
            
            v-bind="{ ...barChart }"
            v-if="barChart.data.datasets[0].data" 
            ref="chartRef"/>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import axios from 'axios';
import { onMounted, reactive ,ref} from '@vue/runtime-core';

export default {
    components: {
        Vue3ChartJs,
    },
    setup () {
        const chartRef = ref(null)
        const state = reactive({
            token: sessionStorage.getItem("TOKEN"),
        })
        onMounted(async()=>{
            await handleData()
        })

        const handleData= async() =>{
            const url = '/seller/grouphour';
            const headers = {"Content-type" : "application/json",
            "token": state.token};
            const response = await axios.get(url, {headers})
            console.log(response)
            if(response.data.status ===200){
                state.items = response.data.result
                for(let i = 0; i < state.items.length; i++){
                    barChart.data.labels[i] = response.data.result[i]._id;
                    barChart.data.datasets[0].backgroundColor[i] = '#1abc9c';
                    barChart.data.datasets[0].data[i] = response.data.result[i].count;

                }
                console.log(state.items)
                console.log(barChart.data.datasets[0])
                chartRef.value.update(250)
            }
        }

        const barChart = {
            type: "bar",
            options: {
                min: 0,
                max: 100,
                responsive: true,
                plugins: {
                legend: {
                    position: "top",
                },
                },
                scales: {
                y: {
                    max: 100,
                    ticks: {
                    callback: function (value) {
                        return `${value}%`;
                    },
                    },
                },
                },
            },
            data: {
                labels: [],
                datasets: [
                {
                    label: "My First Dataset",
                    backgroundColor: [],
                    data: [],
                },
                
                ],
            },
        };
        

        return {
            barChart,
            state,
            chartRef
        }
    }
}
</script>

<style lang="scss" scoped>

</style>