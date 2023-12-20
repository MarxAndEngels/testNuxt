<template>
  <div v-if="modalOffer">
    <div class="modal__from-title">
      <div class="modal__from-title--bold">
        {{ modalOffer.mark }}
      </div>
      <div class="modal__from-title-regular">
        {{ modalOffer.folder }} {{ modalOffer.modification }}
      </div>
    </div>
    <div class="buy__options-price buy__options-price--modal">
      <div class="buy__options-price-bold">
        {{ numberFormat(modalOffer.price) }} ₽
      </div>
      <div class="buy__options-price-regular">
        {{ creditPrice(modalOffer.price)}} ₽/мес.
      </div>
    </div>
    <div
        class="folder__modal-blocks"
        v-for="(item, index) in modalOffer.equipment"
        :key="index"
    >
      <div class="folder__modal-title">
        {{ item.title }}
      </div>
      <div class="folder__modal-values">
        <div
            class="folder__modal-values-item"
            v-for="(value, index) in item.values"
            :key="index"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useModals} from "~/store/modals";

const modalOffer = useModals().modalOffer
import {creditPrice, numberFormat} from "~/helpers/filters";
</script>