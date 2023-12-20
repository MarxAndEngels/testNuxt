<template>
  <div class="offer__full-tech">
    <h2 class="heading heading--h1">Технические характеристики</h2>
    <ul class="offer__full-tech-list">
      <li
          class="offer__full-tech-item"
          v-for="(param, index) in offer.modification.tech_params"
          v-show="param.title !== 'Длина' && param.title !== 'Высота' && param.title !== 'Ширина' && param.title !== 'Колесная база' && param.title !== 'Клиренс'"
          :key="index">
        <span class="offer__full-tech-label">{{ param.title }}</span>
        <span class="offer__full-tech-value">{{ param.value }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {OfferPageType} from "~/app/types/offers";

const props = defineProps<{
  offer: OfferPageType;
}>();
</script>