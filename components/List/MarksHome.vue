<template>
  <div class="list list--marks-home">
    <ul class="list__marks">
      <li class="list__marks-item" v-for="mark in popularMarks(marks, 10)">
        <nuxt-link :to="`/new/${mark.slug}`" class="list__marks-link">
          <nuxt-icon :name="`emblems/${mark.slug}`"/>
          <span>{{ mark.title }}</span>
        </nuxt-link>
      </li>
    </ul>
    <nuxt-link to="/new" class="button button--black-border">
      Показать больше
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import {useSiteConfig} from "~/store/siteConfig";
import {popularMarks} from "~/helpers/filterMarks";

const marks = useSiteConfig().catalog;
</script>