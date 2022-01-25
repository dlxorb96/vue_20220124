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
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    components: { VueperSlides, VueperSlide },

    setup () {
        //  const slides =[
        //      {
        //         title: 'El Teide Volcano, Spain',
        //         content: 'Photo by Max Rive',
        //         image : "https://picsum.photos/500/300?iamge=1"
        //      },
        //      {
        //         title: 'El Teide Volcano, Spain',
        //         content: 'Photo by Max Rive',
        //         image : "https://picsum.photos/500/300?iamge=2"
        //      },
        //      {
        //         title: 'El Teide Volcano, Spain',
        //         content: 'Photo by Max Rive',
        //         image : "https://picsum.photos/500/300?iamge=3"
        //      }
        //  ]
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

        return { slides2}
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