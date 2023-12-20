<template>
  <article class="mini-card mini-card--offer">
    <MiniCardsComponentsOfferSlider :offer="offer"/>
    <div class="mini-card__title">
      <div class="mini-card__bold-title">
        {{ offer.folder.title }}
      </div>
      <div class="mini-card__regular-title">
        {{ offer.mark.title }} {{ offer.complectation.title}}
      </div>
    </div>
    <div class="mini-card__tech">
      <div class="mini-card__tech-item">{{ offer.modification.engine_type.title }}</div>
      <div class="mini-card__tech-item">{{ offer.modification.engine_power }} л.с</div>
      <div class="mini-card__tech-item">{{ offer.modification.engine_volume }} л</div>
      <div class="mini-card__tech-item">{{ offer.modification.drive_type.title }}</div>
    </div>
    <div class="mini-card__prices">
      <div class="mini-card__prices-price mini-card__prices-price--actual">
        {{ numberFormat(offer.price) }} ₽
      </div>
      <div class="mini-card__prices-price mini-card__prices-price--credit">
        {{ creditPrice(offer.price) }} ₽/мес.
      </div>
    </div>
    <div class="mini-card__controls ">
      <div class="button button--credit-mini" @click="onCredit">
        В кредит
      </div>
      <nuxt-link :to="`/new/${offer.mark.slug}/${offer.folder.slug}/${offer.id}`" class="button button--black">
        Подробнее
      </nuxt-link>
    </div>
  </article>
</template>
<script setup lang="ts">
import MiniCardsComponentsOfferSlider from '~/components/MiniCards/Components/OfferSlider.vue'
import {OfferCatalogType} from "~/app/types/offers";
import {creditPrice, numberFormat} from "~/helpers/filters";
import {OfferModalTechType, OfferModalType} from "~/app/types/offers";
import {off} from "inputmask/lib/dependencyLibs/events";
import {useModals} from "~/store/modals";
import {computed} from "@vue/reactivity";

const props = defineProps<{
  offer: OfferCatalogType;
}>();

const currentTech = computed<OfferModalTechType[]>(() => {
  return [
    {
      slug: 'engine',
      value: props.offer?.modification?.engine_volume + ' л' || ''
    },
    {
      slug: 'engine-power',
      value: props.offer?.modification?.engine_power + ' л.с.' || ''
    },
    {
      slug: 'gearbox',
      value: props.offer?.modification?.gearbox.title || ''
    },
    {
      slug: 'body-type',
      value: props.offer?.folder?.bodyType.title || ''
    }
  ]
})

 let modalOffer = computed<OfferModalType>(() => {
   return {
     id: props.offer?.id,
     mark: props.offer?.mark.title,
     markSlug: props.offer?.mark.slug,
     folder: props.offer?.folder.title,
     folderSlug: props.offer?.folder.slug,
     modification: props.offer?.complectation.title,
     title: `${props.offer?.mark.title} ${props.offer?.folder.title} ${props.offer?.modification.title} ${props.offer?.complectation.title}`,
     image: props.offer?.images[0].medium_webp,
     price: props.offer?.price,
     tech: currentTech.value,
     type: 'offer',
     offerType: props.offer?.type.name
   }
 })

const onCredit = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'оставить заявку на автокредит',
    type: 'credit-new'
  })
};

</script>