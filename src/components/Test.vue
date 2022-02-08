<template>
    <div>

    </div>
</template>

<script>
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
export default {
    setup () {
        onMounted(async()=>{
            const q = '인공지능'
            const url = `https://www.googleapis.com/books/v1/volumes?q=${q}`
            const headers = {"Content-Type": "application/json"};
            const response = await axios.get(url, {headers})
            console.log(response)
        })

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>