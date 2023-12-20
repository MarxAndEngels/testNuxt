<template>
  <nuxt-link :class="{'mini-card--folder--catalog':catalog}" :to="`/new/${folder.mark.slug}/${folder.slug}`"
             class="mini-card mini-card--folder">
    <div class="mini-card__title">
      <div class="mini-card__bold-title">
        {{ folder.mark.title }}
      </div>
      <div class="mini-card__regular-title">
        {{ folder.title }}
      </div>
    </div>
    <!-- <img class="mini-card__banner " src="/img/mark/folder.png" alt="city"> -->
    <NuxtPicture loading="lazy" class="mini-card__image mini-card__image--folder"
                 format="avif,webp"
                 :alt="folder.title"
                 :src="folder.image.image_medium"/>
    <div class="mini-card__prices">
      <div class="mini-card__prices-price mini-card__prices-price--actual">
        От {{ numberFormat(folder.min_price) }} ₽
      </div>
      <div class="mini-card__prices-price mini-card__prices-price--credit">
        {{ creditPrice(folder.min_price) }} ₽/мес.
      </div>
    </div>
    <div class="mini-card__controls">
      <div class="button button--border-opacity" v-if="folder.availability">
        В наличии
      </div>
      <div class="button button--border-opacity" v-else-if="folder.arrival">
        Скоро в наличии
      </div>
      <div class="button button--border-opacity" v-else-if="!folder.availability">
        Нет в наличии
      </div>
      <div class="button button--black">
        Подробнее
      </div>
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
import {FolderCatalogType} from "~/app/types/folders";
import {useCatalog} from "~/store/catalog";
import {CreditFolderType, useCredit} from "~/store/credit";
import {useSiteConfig} from "~/store/siteConfig";
import {computed} from "@vue/reactivity";
import {creditPrice, numberFormat} from "~/helpers/filters";

const props = defineProps<{
  folder: FolderCatalogType;
  catalog?: boolean;
}>();

const isRangeRover = computed(() => {
  return props.folder.slug.indexOf('range-rover') >= 0
})
const currentTech = computed(() => {
  return {
    engine_power: props.folder.engine_power,
    time: props.folder.time,
    max_speed: props.folder.max_speed,
  }
})
const colorTheme = computed(() => useCatalog().colorTheme);
const settings = useSiteConfig().settings;

const creditStyles = computed(() => {
  if (colorTheme.value.slug === "default") {
    return false;
  } else {
    return {
      background: `${colorTheme.value?.main}`,
      borderColor: `${colorTheme.value?.main}`,
    };
  }
});

const exchangeStyles = computed(() => {
  if (colorTheme.value.slug === "default") {
    return false;
  } else {
    return {
      borderColor: `${colorTheme.value?.main}`,
      color: `${colorTheme.value?.main}`,
    };
  }
});
const router = useRouter();

</script>