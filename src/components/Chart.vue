<template>
    <div>
        <h3>src/componenets/Chart.vue</h3>
        <div style="width: 600px; height: 600px;">
            <vue3-chart-js
            v-if="chartSelect.chart === 1"
            :id="doughnutChart.id"
            :type="doughnutChart.type"
            :data="doughnutChart.data"
            ref="chartRef"
            >
            </vue3-chart-js>
            <vue3-chart-js 
            v-else-if="chartSelect.chart === 2"
            v-bind="{ ...barChart }" />
            <vue3-chart-js 
            v-else-if="chartSelect.chart === 3"
            v-bind="{ ...radarChart }" />
        </div>
        <button @click="clickmenu(1)">Doughnut Chart 업데이트</button>
        <button @click="clickmenu(2)">Bar Chart 업데이트</button>
        <button @click="clickmenu(3)">Radar Chart 업데이트</button>
        <button type="submit" @click="exportChart">Export Chart as PNG</button>
    </div>
</template>

<script>
//{}는 하위에 여러개가 있는거고 없는 거는 하나만 있는 거임
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import {  reactive, ref } from '@vue/reactivity'
export default {
    components: {
        Vue3ChartJs,
    },
    setup () {
        //object(R) -> reactive(RW) -> (RW Deep)
        //reactive({}) > v-model 변화감지 Read Write
        //빈 것 만들기
        const chartRef = ref(null)

        let display= 'none'
        
        
        //ReadOnly
        const doughnutChart = {
            
            id: 'doughnut',
            type: 'doughnut',
            data: {
                labels: ['제육덮밥', '돈까스', '비빔밥', '짜장면'],
                datasets:[{
                    backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                    ],
                    data: [40, 20, 80, 10]
                }],
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
                    min: -100,
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
                labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                datasets: [
                {
                    label: "My First Dataset",
                    backgroundColor: ["#1abc9c", "#f1c40f", "#2980b9", "#34495e"],
                    data: [40, 20, 50, 10],
                },
                {
                    label: "My Second Dataset",
                    backgroundColor: ["#2ecc71", "#e67e22", "#9b59b6", "#bdc3c7"],
                    data: [-40, -20, -10, -10],
                },
                ],
            },
        };

        const radarChart = {
            type: "radar",
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
                    min: -100,
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
                labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                ],
                datasets: [
                {
                    label: "Skip first dataset",
                    data: [
                    null,
                    78.59825103,
                    8.49108368,
                    40.75017147,
                    95.12860082,
                    43.23131001,
                    19.62620027,
                    ],
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Skip mid dataset",
                    data: [
                    99.62191358,
                    43.71227709,
                    8.68741427,
                    null,
                    43.26731824,
                    41.26714678,
                    5.83076132,
                    ],
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                },
                {
                    label: "Skip last dataset",
                    data: [
                    75.2297668,
                    50.69873114,
                    74.21296296,
                    72.9329561,
                    70.31550069,
                    63.89146091,
                    null,
                    ],
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                },
                ],
            }
            
        }

        const chartSelect = reactive({
            chart : 1
        })


        const clickmenu = (chart) =>{
            chartSelect.chart = chart
        }

        //doughnutChart 띄우기
        const updateDChart = () =>{
            
            
            doughnutChart.data.labels = ['중식', '양식', '일식', '한식']
            doughnutChart.data.datasets = [
                {
                backgroundColor: [
                    '#333333',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                ],
                data: [Math.random(), Math.random(), Math.random(), Math.random()]
                }
            ]
           
            chartRef.value.update(250)
        }

        
        //barChart 띄우기
        const updateBChart = () =>{
            
           
        }

        //이미지 다운받기
         const exportChart = () => {
             display = "block"
             console.log(display)
            let a = document.createElement('a')
            a.href = chartRef.value.chartJSState.chart.toBase64Image()
            a.download = 'image-export.png'
            a.click()
            a = null
        }
        

        return {display,radarChart, chartSelect, clickmenu, barChart,updateBChart,  doughnutChart, chartRef, updateDChart, exportChart}
    }
}
</script>

<style lang="scss" scoped>

</style>