<template>
  <section class="section section--title" v-if="seoTags">
    <div class="container">
      <Crumbs :crumbs="seoTags.crumbs"/>
      <h1 v-html="seoTags.h1" class="heading heading--h1 visually-hidden"></h1>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="offer" v-if="offer">
        <div class="folder__desktop">
          <div class="folder__desktop-line">
            <div class="folder__desktop-left">
              <div class="folder__title">
                <div class="folder__title-bold"> {{ offer.mark.title }}</div>
                <div class="folder__title-regular">{{ offer.folder.title }} {{ offer.complectation.title }}</div>
              </div>
            </div>
            <div class="folder__desktop-right">
              <OfferSlider :offer="offer"/>
            </div>
          </div>
          <div class="folder__desktop-line">
            <div class="folder__desktop-left">
              <Bonuses class="bonuses--offer" @change-bonuses="changeBonuses" :difference="difference"/>
            </div>
            <div class="folder__desktop-right">
              <TechLine :tech="currentTech"/>
            </div>
          </div>
          <div class="folder__desktop-line">
            <div class="folder__desktop-left">
              <BuyOptions class="buy__options--offer" @on-credit="onCredit" :active="offer.is_active"
                          @on-exchange="onExchange"
                          :price="currentPrice" :price-old="offer.price_old" type="offer"/>
            </div>
          </div>
        </div>
        <OfferEquipment :offer="offer"/>
        <OfferFullTech v-if="offer.modification.tech_params" :offer="offer"/>
      </div>
    </div>
  </section>
  <section class="section section--services">
    <div class="container">
      <h2 class="heading heading--h1">Услуги</h2>
      <Services/>
    </div>
  </section>
</template>

<script setup lang="ts">
import Bonuses from "~/components/Bonuses/index.vue";
import OfferSlider from "~/components/Offer/Slider.vue";
import TechLine from "~/components/Tech/Line.vue";
import OfferEquipment from "~/components/Offer/Equipment.vue";
import OfferFullTech from "~/components/Offer/FullTech.vue";
import BuyOptions from "~/components/BuyOptions/index.vue";
import Services from "~/components/Services/index.vue";
import {requestOffer} from "~/helpers/request";
import {ref} from "#imports";
import {renderSeoTemplate} from "~/composables/seo";
import {vkAdsReachGoal, yandexCommercialNew} from "~/helpers/metrika";
import {onMounted} from "vue";
import {computed} from "@vue/reactivity";
import {useModals} from "~/store/modals";
import {OfferModalTechType, OfferModalType, OfferPageInputType, OfferPageType} from "~/app/types/offers";
import {useSiteConfig} from "~/store/siteConfig";

const settings = useSiteConfig().settings
const route = useRoute();
const variables: OfferPageInputType = {
  folder_slug: <string>route.params.folder,
  mark_slug: <string>route.params.mark,
  id: <number>Number(route.params.id),
};
const offer = ref<OfferPageType>();

const dopSum = ref<number>(0)
const changeBonuses = async (sum: number) => {
  dopSum.value = sum
}
const difference = computed<number>(() => {
  if (offer.value) {
    return Math.round((offer.value.price_old - offer.value.price) / 1000) * 1000;
  } else return 0
})
const currentPrice = computed<number>(() => {
  if (offer.value) {
    return offer.value.price + dopSum.value
  } else return 0
})
const currentTech = computed<OfferModalTechType[]>(() => {
  return [
    {
      slug: 'engine',
      value: offer.value?.modification?.engine_volume + ' л' || ''
    },
    {
      slug: 'engine-power',
      value: offer.value?.modification?.engine_power + ' л.с.' || ''
    },
    {
      slug: 'gearbox',
      value: offer.value?.modification?.gearbox.title || ''
    },
    {
      slug: 'body-type',
      value: offer.value?.folder.bodyType.title || ''
    }
  ]
})

let seoTags = null;

const {data, error} = await requestOffer(variables);
if (error.value) {
  throw createError({statusCode: 404, statusMessage: "Page Not Found"});
} else {
  offer.value = data.value?.offer;
}

const sendCommercial = () => {
  if (offer.value) {
    yandexCommercialNew({
      counter_commercial_id: settings.counter_commercial_id,
      id: offer.value?.id,
      mark: offer.value?.mark.title,
      folder: offer.value?.folder.title,
      price: offer.value?.price,
      modification: offer.value?.modification.title,
    });
    vkAdsReachGoal(settings.counter_vk, offer.value?.price, offer.value?.id, false);
  }
};
watch(data, () => {
  offer.value = data.value?.offer;
  seoTags = renderSeoTemplate("new.offer", {
    offer: offer.value,
  });
  sendCommercial();
});

if (offer.value) {
  seoTags = renderSeoTemplate("new.offer", {
    offer: offer.value,
  });
}
onMounted(() => {
  sendCommercial();
});

let modalOffer = computed<OfferModalType>(() => {
  return {
    id: offer.value?.id,
    mark: offer.value?.mark.title,
    markSlug: offer.value?.mark.slug,
    folder: offer.value?.folder.title,
    folderSlug: offer.value?.folder.slug,
    modification: offer.value?.complectation.title,
    title: `${offer.value?.mark.title} ${offer.value?.folder.title} ${offer.value?.modification.title} ${offer.value?.complectation.title}`,
    image: offer.value?.images[0].medium_webp,
    price: offer.value?.price,
    tech: currentTech.value,
    type: 'offer',
    offerType: offer.value?.type.name
  }
})


const onCredit = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на автокредит',
    type: 'credit-new'
  })
};
const onExchange = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на Trade-in',
    type: 'exchange-new'
  })
};

</script>