<template>
  <div class="folder" v-if="folder">
    <div class="folder__desktop">
      <div class="folder__desktop-line">
        <div class="folder__desktop-left">
          <div class="folder__title">
            <div class="folder__title-bold"> {{ folder.mark.title }}</div>
            <div class="folder__title-regular">{{ folder.title }}</div>
          </div>
          <FolderColors @change-color="changeColor" :active-color="folder.colors[currentColor]"
                        :colors="folder.colors"/>
          <div class="folder__select-complectation">
            <div class="folder__select-complectation-title">Выбранная комплектация:</div>
            <Select opacity @select="handlerSelect" :options="complectations" title="комплектация" type="complectation"
                    :value="chosenComplectation"/>
          </div>
        </div>
        <div class="folder__desktop-right">
          <FolderRender :alt="`${folder.mark.title} ${folder.title}`" :active-color="folder.colors[currentColor]"/>
        </div>
      </div>
      <div class="folder__desktop-line">
        <div class="folder__desktop-left">
          <Bonuses class="bonuses--folder" v-if="folder.availability" @change-bonuses="changeBonuses"
                   :difference="difference"/>
          <div class="folder__warranty">
            <nuxt-icon class="folder__warranty-icon" :name="`emblems/${folder.mark.slug}`"/>
            <div class="folder__warranty-text">
              Гарантия {{ folder.mark.warranty_year }} {{ declension(folder.mark.warranty_year, 'год', 'года', 'лет') }}
              <br/>
              или {{ numberFormat(folder.mark.warranty_km) }} км
            </div>
          </div>
        </div>
        <div class="folder__desktop-right">
          <TechLine class="tech__line--folder" :tech="currentTech"/>
        </div>
      </div>
      <div class="folder__desktop-line">
        <div class="folder__desktop-left">
          <BuyOptions class="buy__options--folder" @on-credit="onCredit" :active="folder.availability"
                      @on-exchange="onExchange"
                      :price="currentPrice" :price-old="chosenComplectation.price_old" type="folder"/>
        </div>
      </div>
    </div>
    <FolderModifications :folder="folder" :dop-sum="dopSum" :color-index="currentColor"/>
    <div class="folder__tech-global" v-if="chosenComplectation.modification.tech_params">
      <h2 class="heading heading--h2">
        технические
        характеристики
      </h2>
      <ul class="folder__tech-global-group">
        <li class="folder__tech-global-item" v-for="param in chosenComplectation.modification.tech_params">
          <span>{{ param.title }}</span>
          <span>{{ param.value }}</span>
        </li>
      </ul>
    </div>
    <FolderMedia :folder="folder"/>
    <FolderDimensions :folder="folder"/>
  </div>
  <SkeletonFolderPage v-else/>
</template>

<script setup lang="ts">
import {ref} from "#imports";
import {FolderPageInput, FolderPageType} from "~/app/types/folders";
import {requestCatalogFolder} from "~/helpers/request";
import SkeletonFolderPage from '~/components/Skeleton/FolderPage.vue'
import TechLine from "~/components/Tech/Line.vue";
import FolderModifications from "~/components/Folder/Modifications.vue";
import FolderDimensions from "~/components/Folder/Dimensions.vue";
import FolderRender from "~/components/Folder/Render.vue";
import FolderColors from "~/components/Folder/Colors.vue";
import BuyOptions from "~/components/BuyOptions/index.vue";
import Bonuses from "~/components/Bonuses/index.vue";
import Select from '~/components/Controls/Select.vue'
import FolderMedia from '~/components/Folder/Media.vue'
import {allComplectations, numberFormat} from "~/helpers/filters";
import {computed} from "@vue/reactivity";
import {useRoute} from "vue-router";
import {useModals} from "~/store/modals";
import {OfferModalTechType, OfferModalType} from "~/app/types/offers";
import {declension} from "~/helpers/declension";

const route = useRoute();
const folder = ref<FolderPageType>();
const complectations = computed(() => {
  return allComplectations(folder.value?.modifications)
})
const currentTech = computed<OfferModalTechType[]>(() => {
  return [
    {
      slug: 'engine',
      value: chosenComplectation.value?.modification?.engine_volume + ' л'
    },
    {
      slug: 'engine-power',
      value: chosenComplectation.value?.modification?.engine_power + ' л.с.'
    },
    {
      slug: 'time',
      value: folder.value?.time + ' с.'
    },
    {
      slug: 'speed',
      value: folder.value?.max_speed + ' км/ч'
    }
  ]
})
const currentComplectation = ref()
const chosenComplectation = computed(() => {
  return currentComplectation.value || complectation.value
})


const difference = computed(() => {
  return Math.round((chosenComplectation.value.price_old - chosenComplectation.value.price) / 1000) * 1000;
})
const dopSum = ref<number>(0)
const complectation = computed({
  get: () => {
    return complectations.value[0]
  },
  set: (value) => {
    currentComplectation.value = value
  }
})
const currentPrice = computed(() => {
  return chosenComplectation.value.price + dopSum.value
})

let currentColor = ref<number>(0);


const variables: FolderPageInput = {
  mark_slug: <string>route.params.mark,
  slug: <string>route.params.folder,
};


const handlerSelect = async (data: any) => {
  complectation.value = data.option
}
const changeBonuses = async (sum: number) => {
  dopSum.value = sum
}
const changeColor = async (index: number) => {
  currentColor.value = index;
};


const {pending, data, error} = await requestCatalogFolder(variables);
folder.value = data.value?.folder;
// if (!data.value?.folder) createError({statusCode: 404, statusMessage: 'Page Not Found'})
if (route.query.color) {
  folder.value?.colors.map((item, index) => {
    if (item.slug === route.query.color) {
      currentColor.value = index
    }
  })
}

watch(data, () => {
  folder.value = data.value?.folder;
});

let modalOffer = computed<OfferModalType>(() => {
  return {
    id: folder.value?.id,
    mark: folder.value?.mark.title,
    folder: folder.value?.title,
    modification: chosenComplectation.value.title,
    title: `${folder.value?.mark.title} ${folder.value?.title} ${chosenComplectation.value.title}`,
    image: folder.value?.colors[currentColor.value].image.medium_webp,
    price: currentPrice.value,
    tech: currentTech.value,
    markSlug: folder.value?.mark.slug,
    folderSlug: folder.value?.slug,
    type: 'folder',
    complectationId: chosenComplectation.value.id,
    modificationId: chosenComplectation.value.modification.id,
    markId: folder.value?.mark.id,
    folderId: folder.value?.id,
    colorId: folder.value?.colors[currentColor.value].id
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
const onExchange = () => {
  useModals().setModalOffer(modalOffer.value);
  useModals().openModal({
    open: true,
    title: 'Заявка на trade-in',
    type: 'exchange-new'
  })
};

if (route.query.color) {
  folder.value?.colors.map((item, index) => {
    if (item.id === Number(route.query.color)) {
      currentColor.value = index
    }
  })
}
if (route.query.config) {
  let complectationId = Number(route.query.config.toString().split('-')[1])
  let modificationId = Number(route.query.config.toString().split('-')[0])
  currentComplectation.value = complectations.value.find(item => item.id === complectationId && item.modification.id === modificationId)
}

</script>