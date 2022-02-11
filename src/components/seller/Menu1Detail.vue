<template>
    <div style="border: 1px solid black; display: flex;
    justify-content: center; align-items: center;
    flex-direction: column; padding-bottom: 50px;">
<!-- 
    <div>
        <vueper-slides
            v-if = state.item.subImage
            ref="vueperslides1"
            :touchable="false"
            fade
            :autoplay="false"
            :bullets="false"
            @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
            fixed-height="400px">
            <vueper-slide
                v-for="(slide, i) in state.item.subImage"
                :key="i"
                :image="slide.subImage">
            </vueper-slide>
        </vueper-slides>

        <vueper-slides
            v-if = state.item.subImage
        class="no-shadow thumbnails"
        ref="vueperslides2"
        @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
        :visible-slides="state.item.subImage.length"
        fixed-height="75px"
        :bullets="false"
        :touchable="false"
        :gap="2.5"
        :arrows="false">
            <vueper-slide
                v-for="(slide, i) in state.item.subImage"
                :key="i"
                :image="slide.subImage"
                @click="$refs.vueperslides2.goToSlide(i)">
            </vueper-slide>
    </vueper-slides>
    </div> -->


        <div style="margin: 20px">
            <img :src="state.item.imageUrl" />
        </div>
  <el-descriptions
    class="margin-top"
    :title="state.item.name"
    :column="3"
    border
  >
    <template #extra>
      <el-button @click="handleClick" type="primary">목록으로</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
          </el-icon>
          판매자
        </div>
      </template>
      {{state.item.seller}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
            가격
        </div>
      </template>
      {{state.item.seller}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <location />
          </el-icon>
          남은수량
        </div>
      </template>
      {{state.item.quantity}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          등록일자
        </div>
      </template>
      {{state.item.regdate}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          상품설명
        </div>
      </template>
      {{state.item.content}}
    </el-descriptions-item>
  </el-descriptions>
  <div v-if= state.item.subImage[0].imageUrl>
      <img style="border: 1px solid black; margin-top: 10px; padding:10px; width:100px" :src="state.item.subImage[0].imageUrl"/>
  </div>
  

    </div>
</template>


<script>
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import {useRoute, useRouter} from 'vue-router'
import {  onMounted } from '@vue/runtime-core'
export default {
    // components: { VueperSlides, VueperSlide },
    setup () {
        const router = useRouter()
        const route = useRoute()
        const state = reactive({
            code : route.query.code,
            token : sessionStorage.getItem("TOKEN"),
            item : {},
        })

        
             

        console.log(state.code)
        
        onMounted(async()=>{
            await handleData()
            console.log(state.item.subImage[0].imageUrl)
        })

        const handleData = async()=>{
            const url = `/seller/selectone?code=${state.code}`;
            const headers = {
                "Content-Type": "application/json",
                "token" : state.token};
            const response = await axios.get(url, {headers: headers});
            console.log(response)
            if(response.data.status ===200){
                state.item = response.data.result
            }
        }

        const handleClick = async()=>{
            router.push({name: "Seller"})
        }

        
            
        return {handleData,
        handleClick,
        state}
    }
}
</script>

<style lang="scss" scoped>

.thumbnails {
  margin: auto;
  max-width: 300px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
  border-color: #000;
}


</style>