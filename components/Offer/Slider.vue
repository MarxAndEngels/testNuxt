<template>
  <div class="offer__slider" v-if="!isRender" :class="{ 'offer__slider--render': isRender }">
    <div class="offer__slider-line" :class="{ 'offer__slider-line--render': isRender }">
      <span @click.right.prevent class="offer__slider-line-slide" v-for="img in offer.images">
        <img @click.right.prevent data-fancybox="gallery-mobile" :data-src="img.original"
             :data-thumb-src="img.tiny_webp"
             :src="img.medium_webp" :alt="offer.mark.title">
      </span>
    </div>
    <div class="offer__slider-desktop" :class="{ 'offer__slider--render': isRender }">
      <div class="f-carousel f-carousel--no-controls" id="offerSlider">
        <div class="f-carousel__viewport">
          <div class="f-carousel__track">
            <div class="f-carousel__slide" :data-thumb-src="img.tiny_webp" v-for="img in offer.images">
              <img data-fancybox="gallery" @click.right.prevent :data-src="img.original" :data-thumb-src="img.tiny_webp"
                   :data-lazy-src="img.medium_webp" :alt="offer.mark.title" src="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="offer__slider-render">
    <NuxtPicture @click.prevent :src="offer.images[0].original"/>
  </div>
</template>
<script setup lang="ts">

import {Carousel, Fancybox} from "@fancyapps/ui";
import {Thumbs} from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import {onMounted} from "vue";
import {OfferPageType} from "~/app/types/offers";


const props = defineProps<{
  offer: OfferPageType
}>()

const isRender = computed(() => {
  if (props.offer.type) {
    if (props.offer.type.name === 'SITE') {
      return true
    }
  }
})
onMounted(() => {
  if (!isRender.value) {
    const container = document.getElementById("offerSlider");
    const options = {
      Thumbs: {
        type: 'classic',
        Carousel: {
          slidesPerPage: 1,
          dragFree: false,
          Navigation: false,
          axis: 'y',
          infinite: true
        },
      },
      infinite: true,
      center: true,
      transition: 'slide',
      preload: 3,
      getProgress: 'center',
    }
    const fc = new Carousel(container, options, {Thumbs});
    Fancybox.bind("[data-fancybox]", {
      Hash: false,
      contentClick: "iterateZoom",
      Images: {
        protected: true
      }
    });
  }
})


</script>