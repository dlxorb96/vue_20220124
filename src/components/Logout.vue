<template>
    <div>
        <!-- <h3>logout.vue</h3> -->
    </div>
</template>

<script>
import { onMounted, nextTick } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'
export default {
    setup () {
        const store = useStore()
        const router = useRouter()
        onMounted(()=>{
            nextTick(()=>{
                alert("로그아웃되었습니다");
                sessionStorage.removeItem("TOKEN");
                router.push({name: "Home"});
                store.commit("setmenu", "/")
                store.commit("setLogged", false)

            })
            
        })

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>