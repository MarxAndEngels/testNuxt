<template>
  <div class="list list--marks-menu">
    <ul class="list__marks">
      <li class="list__marks-item" v-for="mark in popularMarks(marks, 7)">
        <nuxt-link :to="`/new/${mark.slug}`" class="list__marks-link">
          <nuxt-icon :name="`emblems/${mark.slug}`"/>
          <span>{{ mark.title }}</span>
        </nuxt-link>
      </li>
      <li class="list__marks-item">
        <nuxt-link @click.native="emit('click')" to="/new" class="list__marks-link">
          <span>Показать больше</span>
        </nuxt-link>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {popularMarks} from "~/helpers/filterMarks";
const emit = defineEmits(['click'])
const marks = useSiteConfig().catalog;
</script>