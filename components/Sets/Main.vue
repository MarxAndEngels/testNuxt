<template>
    <div class="sets slider__sets padding-for-slider-buttons" id="slider__sets">
          <div class="" v-for="set in currentSets" :key="set.slug">
            <nuxt-link :to="`/sets/${set.slug}`" class="sets__item card-border">

              <div class="sets__title">{{ set.title }}</div>
              <!-- <div class="sets__number">{{ set.number }}</div> -->
              <picture>
                <source type="image/webp" media="(min-width: 768px)"
                  :data-srcset="`/img/sets/set-${set.slug}@1x.webp 1x, /img/sets/set-${set.slug}@2x.webp 2x`" />
                <source media="(min-width: 768px)"
                  :data-srcset="`/img/sets/set-${set.slug}@1x.png 1x, /img/sets/set-${set.slug}@2x.png 2x`" />
                <source type="image/webp"
                  :data-srcset="`/img/sets/set-${set.slug}@1x.webp 1x, /img/sets/set-${set.slug}@2x.webp 2x`" />
                <img loading="lazy" class="lazyload sets__image" width="300" height="200"
                  :data-srcset="`/img/sets/set-${set.slug}@1x.png 1x, /img/sets/set-${set.slug}@2x.png 2x`"
                  :alt="`Подборка автомобилей — ${set.title}`" :data-src="`/img/sets/set-${set.slug}@1x.png`" />
              </picture>
            </nuxt-link>
          </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { useSiteConfig } from "~/store/siteConfig";
  import { onMounted } from "vue";
  import { Carousel } from "@fancyapps/ui";
  
  type LocalSetType = {
    title: string;
    slug: string;
    number: string;
  };
  
  
  
  const localSets = ref<LocalSetType[]>([
    {
      title: "семейные",
      slug: "for-family",
      number: "01",
    },
    {
      title: "для такси",
      slug: "for-taxi",
      number: "02",
    },
    {
      title: "седаны",
      slug: "sedan",
      number: "03",
    },
    {
      title: "внедорожники",
      slug: "suv",
      number: "04",
    },
  
  
  
    {
      title: "китайские новинки",
      slug: "china-new",
      number: "05",
    },
    // {
    //   title: "семейные",
    //   slug: "for-family",
    //   number: "01",
    // },
  
  
    {
      title: "для нее",
      slug: "for-woman",
      number: "06",
    },
  
    {
      title: "популярные",
      slug: "for-woman",
      number: "07",
    },
  
  
  ]);
  const sets = useSiteConfig().sets;
  const currentSets = ref<LocalSetType[]>();
  currentSets.value = localSets.value.filter((item) => {
    return sets.find((i) => i.slug === item.slug);
  });
  
  </script>