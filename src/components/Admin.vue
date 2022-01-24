<template>
    <div>
        <h3>src/components/Admin.vue</h3>
                {{menu}}

        <button @click="handleMenu(1)">메뉴1</button>
        <button @click="handleMenu(2)">메뉴2</button>
        <button @click="handleMenu(3)">메뉴3</button>
        <button  @click="handleCount">1씩 증가</button>
        <menu-1 title= "메뉴111" v-if="menu.code ===1"></menu-1>
        <menu-2 title= "메뉴2" @handleCount="handleCount" v-if="menu.code ===2"></menu-2>
        <menu-3 :title= count.value aaaa="안녕" @handleCount="handleCount" v-if="menu.code ===3" ></menu-3>
        
        <!-- title = "bbb" 값을 넘기는거냐
        :title = " state.bbb" :은 변수를 넘기기, :없으면 값 그 자체를 넘기기 -->
        
    </div>
</template>

<script>
import  {reactive} from 'vue';
import Menu1 from './admin/menu-1.vue';
import Menu2 from './admin/menu-2.vue';
import Menu3 from './admin/menu-3.vue';

export default {
    components:{
        Menu1, Menu2, Menu3
    },

    setup () {

        //state변수 생성
        let menu = reactive({
            code: 1
        })

        const count = reactive(
            {value : 12341234}
        )

        //handleMenu 메소드
        const handleMenu = (idx) => {
            console.log(idx)
            menu.code = idx;
          
        }

        const handleCount = () => {
            count.value++;
            console.log("Admin.vue=>",count.value)

        }
        
        return {menu,handleMenu, handleCount, count}
    }
}
</script>

<style lang="scss" scoped>

</style>