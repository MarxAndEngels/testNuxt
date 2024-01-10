<template>
  <div class="header">
      <div class="header__top-wrapper">
        <div class="header__top container">
        <div class="header__top-left">Новые автомобили</div>
        <div class="header__top-right">
          <a :href="`tel:${clearPhone(settings.contact_phone)}`">{{ settings.contact_phone }}</a>
          <span>{{ settings.contact_address }}</span>
        </div>
        </div>
      </div>  
      <div class="container">
      <div class="header__inner">
        <div class="header__burger" :class="{'header__burger--active': isOpen}" @click="clickBurger">
          <div class="header__burger-line"></div>
          <div class="header__burger-line"></div>
          <div class="header__burger-line"></div>
        </div>
        <div class="header__nav">
          <nuxt-link @click.native="clickMenu" to="/new">В наличии</nuxt-link>
          <nuxt-link @click.native="clickMenu" to="/credit">Автокредит</nuxt-link>
          <nuxt-link @click.native="clickMenu" to="/exchange">Trade-in</nuxt-link>
          <nuxt-link @click.native="clickMenu" to="/installment">Рассрочка</nuxt-link>
          <nuxt-link @click.native="clickMenu" to="/contacts">Контакты</nuxt-link>
          <nuxt-link @click.native="clickMenu" to="/about">О компании</nuxt-link>
        </div>
        <div class="header__logo">
          <nuxt-link @click.native="clickMenu" to="/">
            <img v-if="isMobile" src="/img/logo.svg" alt="logo">
            <img v-else src="/img/logo-desktop.svg" alt="logo">
          </nuxt-link>
        </div>
        <!-- <div class="header__contacts">
          <div class="header__contacts-address">
            {{ settings.contact_address }}
          </div>
          <Phone header number icon/>
        </div> -->
      </div>
    </div>
    <transition name="modal">
      <HeaderMenu v-if="isOpen" @click="clickMenu"/>
    </transition>
  </div>
</template>
<script setup lang="ts">
import Phone from "~/components/Phone";
import HeaderMenu from "~/components/Header/Menu.vue";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {watch} from "vue";
import {useModals} from "~/store/modals";
import {useSiteConfig} from "~/store/siteConfig";
import {useComparison} from "~/store/comparison"
import {clearPhone} from "~/helpers/filters";
const { isMobile } = useDevice();

const modal = useModals()
const route = useRoute();
const settings = useSiteConfig().settings;
const isOpen = ref<boolean>(false)
const clickBurger = () => {
  isOpen.value = !isOpen.value;
  modal.closeModal()
};
const clickMenu = () => {
  isOpen.value = false;
  modal.closeModal()
};
watch(route, async () => {
  await useModals().closeModal()
  await useComparison().clearComparison()
  isOpen.value = false;
});
const dateTimeFunc = async () => {
  if (new Date().getHours() >= 21 || new Date().getHours() <= 8) {
    await useSiteConfig().setIsNight(true)
  } else {
    await useSiteConfig().setIsNight(false)
  }
}

onMounted(() => {
  dateTimeFunc()
  setInterval(() => {
    dateTimeFunc()
  }, 120000)
});
</script>