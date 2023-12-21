<template>
    <picture>
      <source
        type="image/webp"
        media="(min-width: 768px)"
        :data-srcset="`${img}@1x.webp 1x, ${img}@2x.webp 2x`"
      />
      <source
        media="(min-width: 768px)"
        :data-srcset="`${img}@1x.png 1x, ${img}@2x.png 2x`"
      />
  
      <source
        type="image/webp"
        :data-srcset="`${imgMobile}@1x.webp 1x, ${imgMobile}@2x.webp 2x`"
      />
      <img
        :loading="lazy ? 'lazy' : ''"
        :class="customClass"
        class="lazyload"
        :data-srcset="`${imgMobile}@1x.png 1x, ${imgMobile}@2x.png 2x`"
        alt=""
        :data-src="`${imgMobile}@1x.png`"
      />
    </picture>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps<{
    img: string;
    imgMobile: string;
    customClass?: string;
    type?: string;
    lazy?: boolean;
  }>();
  </script>