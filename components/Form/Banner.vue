<template>
  <div class="form__banner">
    <NuxtPicture :src="`${$device.isMobile ? currentType.banner + '-mobile.jpg' : currentType.banner + '.jpg'}`"
                 format="webp" densities="x1 x2"/>
    <div class="form__banner-content">
      <div class="container">
        <div class="form__banner-title">
          {{ currentType.title }}
        </div>
        <div class="form__banner-text">
          {{ currentType.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  type: string;
}>();

const types = [
  {
    name: 'credit',
    banner: '/img/pages/credit/banner',
    title: 'выгодное предложение',
    text: 'ставка от 4.9%'
  },
  {
    name: 'exchange',
    banner: '/img/pages/exchange/banner',
    title: 'выгодное предложение',
    text: 'ставка от 4.9%'
  },
  {
    name: 'installment',
    banner: '/img/pages/installment/banner',
    title: 'выгодное предложение',
    text: 'ставка от 0%'
  },
  {
    name: 'taxi',
    banner: '/img/pages/taxi/banner',
    title: 'выгодное предложение',
    text: 'ставка от 4,9%'
  }
]
const currentType = computed(() => {
  return types.find(item => props.type === item.name)
})
</script>