<template>
    <div>
        <h3>Home.vue</h3>

        <!-- <vueper-slides fade :touchable="false">
        <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="slide.image"
            :title="slide.title"
            :content="slide.content" />
        </vueper-slides>-->
    </div> 

    <div>
        <vueper-slides
            ref="vueperslides1"
            :touchable="false"
            fade
            :autoplay="false"
            :bullets="false"
            @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
            fixed-height="400px">
            <vueper-slide
                v-for="(slide, i) in slides2"
                :key="i"
                :image="slide.image">
            </vueper-slide>
        </vueper-slides>

        <vueper-slides
        class="no-shadow thumbnails"
        ref="vueperslides2"
        @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
        :visible-slides="slides2.length"
        fixed-height="75px"
        :bullets="false"
        :touchable="false"
        :gap="2.5"
        :arrows="false">
            <vueper-slide
                v-for="(slide, i) in slides2"
                :key="i"
                :image="slide.image"
                @click="$refs.vueperslides2.goToSlide(i)">
            </vueper-slide>
    </vueper-slides>

    <!-- <div v-if="state.items">
    <div v-for="i in 4" :key="i">
        <div v-for="j in 4" :key="j" 
        style="display: inline-block;
        width: 24%
        padding:5px; 
        border: 1px solid black;">

        {{i}}{{j}}
            <img :src="state.items[4*(i-1)+(j-1)].imageUrl" style="width: 100%; height: 100%"/>
            
        </div>
    </div>
    </div> -->


    <div v-if="state.items" style="display: grid; 
    grid-template-columns: repeat(4, 1fr); row-gap: 10px;
	column-gap: 20px;">
        <div v-for="(tmp) in state.items" :key="tmp" 
        style="margin-bottom: 50px">
            <img :src="tmp.imageUrl" @click="handleImageClick(tmp._id)" style="width: 100%; height: 100%; cursor:pointer;
            border: 1px solid black; margin: 5px;" />
            <div>{{tmp.name}}</div>
            <div>{{tmp.price}}</div>
        </div>

    </div>
    </div>


</template>

<script>
import axios from 'axios'
import {useRouter} from 'vue-router';
import { onMounted, reactive } from '@vue/runtime-core'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    components: { VueperSlides, VueperSlide },

    setup () {
        const router = useRouter()
        onMounted(async()=>{
            await handleData();
        })
        const state = reactive({
            page:1
        })

        const handleData= async()=>{
            const url = `/shop/select?page=${state.page}`;
            const headers = {"Content-Type": "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response);
            if(response.data.status ===200){
                state.items = response.data.result;
                const 
            }

        }

        const handleImageClick = (code) =>{
            router.push({name: "Productdetail", query: {code:code}}, )
        }
       
        const slides2 =[
             {
                title: 'El Teide Volcano, Spain',
                content: 'Photo by Max Rive',
                image : "https://picsum.photos/500/300?iamge=1"
             },
             {
                title: 'El Teide Volcano, Spain',
                content: 'Photo by Max Rive',
                image : "https://picsum.photos/500/300?iamge=2"
             },
             {
                title: 'El Teide Volcano, Spain',
                content: 'Photo by Max Rive',
                image : "https://picsum.photos/500/300?iamge=3"
             }
         ]
         console.log(slides2[0].image)

        return {
            handleImageClick,
            handleData,
            slides2,
            state
            }
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