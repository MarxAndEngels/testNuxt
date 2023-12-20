<template>
  <div class="header__menu">
    <div class="container">
      <div class="header__menu-wrapper">
        <div class="header__menu-nav">
          <nuxt-link @click.native="emit('click')" class="header__menu-item" v-for="item in menu" :to="item.slug">
            {{ item.title }}
          </nuxt-link>
        </div>
        <div class="header__menu-content">
          <div class="header__menu-folders">
            <h3 class="heading heading--h3">Популярные модели</h3>
            <CatalogFolderMenu/>
          </div>
          <Phone class="header__menu-phone" number/>
          <div class="header__menu-marks">
            <h3 class="heading heading--h3">Популярные марки</h3>
            <ListMarksMenu @click="emit('click')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CatalogFolderMenu from '~/components/Catalog/FoldersMenu.vue'
import Phone from '~/components/Phone/index.vue'
import ListMarksMenu from '~/components/List/MarksMenu.vue'

const emit = defineEmits(['click'])
const menu = [
  {
    title: 'В наличии',
    slug: '/new'
  },
  {
    title: 'Такси в кредит',
    slug: '/taxi'
  },
  {
    title: 'Автокредит',
    slug: '/credit'
  },
  {
    title: 'Trade-in',
    slug: '/exchange'
  },
  {
    title: 'Рассрочка',
    slug: '/installment'
  },
  {
    title: 'Контакты',
    slug: '/contacts'
  },
  {
    title: 'Услуги',
    slug: '/promo'
  },
  // {
  //   title: 'Банки',
  //   slug: '/banks'
  // },
  {
    title: 'О компании',
    slug: '/about'
  }
]
</script>