<template>
  <section class="section section--home home">
    <h1 class="visually-hidden" v-html="seoTags.h1"></h1>
    <div class="container">
    <CarouselMain/>
    </div>
    <!-- <div class="container">
      <h2 class="heading heading--h1">
        Скидка до 20%
      </h2>
      <p class="text__p text__p--home">
        На все новые китайские автомобили
      </p>
      <div class="home__auto">
        <div class="home__auto-title">
          uni-t
        </div>
        <NuxtPicture loading="lazy" class="home__auto-image" format="avif,webp" src="/img/home/car.png"/>
        <nuxt-link to="/new" class="button button--home button--white">Выбрать автомобиль</nuxt-link>
      </div>
    </div> -->
  </section>
  <section class="section section--marks">
    <div class="container">
      <ListMarksHome/>
    </div>
  </section>
  <section class="section section--filters">
    <div class="container">
      <FiltersList/>
    </div>
  </section>
  <section class="section section--home-folders">
    <div class="container">
      <h2 class="heading heading--h2">
        Популярные модели
      </h2>
      <CatalogFoldersHome :popular="true"/>
    </div>
  </section>
  <section class="section section--services">
    <div class="container">
      <h2 class="heading heading--h2">Услуги</h2>
      <Services/>
    </div>
  </section>
  <section class="section section--sets">
    <div class="container">
      <h2 class="heading heading--h2">Подборки</h2>
      <Sets/>
    </div>
  </section>
  <section class="section section--banks">
    <div class="container">
      <h2 class="heading heading--h2">Банки-партнеры</h2>
      <Banks/>
    </div>
  </section>
  <section class="section section--contacts">
    <div class="container">
      <h2 class="heading heading--h2">Контакты</h2>
      <Contacts/>
    </div>
  </section>

</template>
<script setup lang="ts">
import FiltersList from '~/components/Filters/List.vue'
import CatalogFoldersHome from '~/components/Catalog/FoldersHome.vue'
import CarouselMain from "~/components/Carousel/Main.vue";
import Services from '~/components/Services'
import Sets from '~/components/Sets/index.vue'

import Contacts from "~/components/Contacts/index.vue";
import {useSiteConfig} from "~/store/siteConfig";

const settings = useSiteConfig().settings
const seoTags = renderSeoTemplate('index')
</script>
