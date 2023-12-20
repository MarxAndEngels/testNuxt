<template>
  <div class="services services--mobile f-carousel f-carousel--services " id="servicesSlider">
    <div class="f-carousel__viewport">
      <div class="f-carousel__track">
        <nuxt-link :to="service.slug" class="services__item f-carousel__slide" v-for="service in services">
          <NuxtPicture loading="lazy" class="services__item-image" format="avif,webp"
                       :src="service.image"/>
          <span class="services__item-title">{{ service.title }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
  <div class="services services--desktop">
    <div class="services__line">
      <nuxt-link :to="service.slug" class="services__item f-carousel__slide" v-for="service in services">
        <NuxtPicture loading="lazy" class="services__item-image" format="webp"
                     :src="service.image"/>
        <span class="services__item-title">{{ service.title }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Carousel} from "@fancyapps/ui";

const services = [
  {
    title: "автокредит",
    slug: "/credit",
    image: "/img/services/credit.jpg",
  },
  {
    title: "trade-in",
    slug: "/exchange",
    image: "/img/services/exchange.jpg",
  },

  {
    title: "Рассрочка",
    slug: "/installment",
    image: "/img/services/installment.jpg",
  },
];

let slider: Carousel
const initSlider = () => {
  const container = document.getElementById("servicesSlider");
  const options = {
    infinite: true,
    center: false,
    transition: 'slide',
    getProgress: 'center',
    Thumbs: {
      type: "modern",
    },
  };
  slider = new Carousel(container, options);
}

onMounted(() => {
  initSlider()
})
</script>