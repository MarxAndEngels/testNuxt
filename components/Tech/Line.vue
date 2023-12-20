<template>
  <div class="tech__line">
    <div class="tech__line-item" v-for="item in tech">
      <nuxt-icon class="tech__line-item-icon" :name="item.slug"/>
      <div class="tech__line-item-name">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  tech: {
    name?: string
    value: string
    slug: string
  }[];
}>();
</script>
