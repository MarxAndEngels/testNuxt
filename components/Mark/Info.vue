<template>
  <div class="mark-info__wrapper">
    <div class="container">
      <div class="mark-info__wrapper-logo">
        <nuxt-icon :name="`emblems/${mark.slug}`"/>
        <span class="mark-info__wrapper-dealer"> Официальный <br/> дилер</span>
      </div>
    </div>
    <div class="mark-info__banner">
      <NuxtImg format="avif,webp" @click.right.prevent loading="lazy"
               class="services__item-image services__item-image--mobile"
               src="/img/mark/banner@2x-mobile.jpg"/>
      <NuxtImg format="avif,webp" @click.right.prevent loading="lazy"
               class="services__item-image services__item-image--desktop"
               src="/img/mark/banner@1x.jpg"/>
      <div class="mark-info__banner-text">
        <div class="container">
          <div class="mark-info__banner-title">{{ mark.title }}</div>
          <div class="mark-info__banner-credit">ставка от 4.9%</div>
        </div>
      </div>
    </div>

    <div class="container">
      <NuxtPicture format="avif,webp" @click.right.prevent loading="lazy" class="section__mark-picture"
                   :src="`/img/marks/${mark.slug}/car@2x.png`"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {MarkType} from "~/app/types/marks";

const props = defineProps<{
  mark: MarkType;
}>();

</script>
