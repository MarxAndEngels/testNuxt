<template>
  <div class="list list--marks-catalog">
    <ul class="list__marks">
      <li class="list__marks-item" v-for="mark in marks">
        <nuxt-link :to="`/new/${mark.slug}`" class="list__marks-link">
          <nuxt-icon :name="`emblems/${mark.slug}`"/>
          <div class="list__mark-item_descr">
            <span>{{ mark.title }}</span>
            <span class="list__mark-item_descr-model">Моделей: {{ mark.folders.length }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <!--    <button class="button button&#45;&#45;black-border" @click="spliceNumber = 1000">-->
    <!--      Показать все марки-->
    <!--    </button>-->
  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {popularMarks} from "~/helpers/filterMarks";

const spliceNumber = ref<number>(100)
const marks = useSiteConfig().catalog;
onMounted(()=>{
  console.log(marks)
})
</script>