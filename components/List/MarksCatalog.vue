<template>
  <div class="list list--marks-catalog">
    <ul class="list__marks">
      <li class="list__marks-item" v-for="mark in sortedMarks">
        <nuxt-link :to="`/new/${mark.slug}`" class="list__marks-link">
          <nuxt-icon :name="`emblems/${mark.slug}`"/>
          <div class="list__mark-item_descr">
            <span>{{ mark.title }}</span>
            <span class="list__mark-item_descr-model">Моделей: {{ mark.folders.length }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
        <button class="button opacity" @click="isFullClick">
          <span v-if="!isFull">Больше марок</span>
        <span v-else>Меньше марок</span>
        </button>
  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {popularMarks} from "~/helpers/filterMarks";
import MarksHome from "./MarksHome.vue";
const { isMobile } = useDevice();


const spliceNumber = ref<number>(100)
const marks = useSiteConfig().catalog;

const isFull = ref<boolean>(false)
const isFullClick = () => {
  isFull.value = !isFull.value
}


const sortedMarks = computed(() => {
  let marksShowNumber
  if(isMobile){
    marksShowNumber = 10
  }else{
    marksShowNumber = 15
  }
  let marksFiltered = [...marks]

  //Сортировка по алфавиту
  if (isFull.value) {
    return marksFiltered.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  } else {
    marksFiltered = marksFiltered.sort((a:any, b:any) => parseFloat(b.offers_count) - parseFloat(a.offers_count))
    marksFiltered = marksFiltered.slice(0, marksShowNumber)
    marksFiltered = marksFiltered.sort((a:any, b:any) => a.slug.toLowerCase().localeCompare(b.slug.toLowerCase()))
    return marksFiltered
  }
})

</script>