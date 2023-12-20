<template>
  <div class="folder__modifications">
    <h2 class="heading heading--h2">
      комплектации
    </h2>
    <div class="folder__modifications-group" v-for="modification in  folder.modifications">
      <div class="folder__modifications-title">
        {{ modification.title }}
      </div>
      <div class="folder__modifications-group-line">
        <div class="folder__modifications-item" v-for="complectation in modification.complectations">
          <div class="folder__modifications-top">
            <div class="folder__modifications-line">
              <div class="folder__modifications-line-circle"
                   :class="{'folder__modifications-line-circle--active':comparison.find(item => item.slug === `${modification.id}-${complectation.id}`)}"
                   @click="onComparison(modification, complectation)">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.75 14.25C10.75 14.0511 10.829 13.8603 10.9697 13.7197C11.1103 13.579 11.3011 13.5 11.5 13.5H18.25C18.4489 13.5 18.6397 13.579 18.7803 13.7197C18.921 13.8603 19 14.0511 19 14.25C19 14.4489 18.921 14.6397 18.7803 14.7803C18.6397 14.921 18.4489 15 18.25 15H11.5C11.3011 15 11.1103 14.921 10.9697 14.7803C10.829 14.6397 10.75 14.4489 10.75 14.25Z"
                        fill="#FDFDFD"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.0302 10.7198C15.1709 10.8604 15.2498 11.0511 15.2498 11.25C15.2498 11.4489 15.1709 11.6396 15.0302 11.7802L12.5605 14.25L15.0302 16.7197C15.1669 16.8612 15.2425 17.0507 15.2408 17.2473C15.239 17.4439 15.1602 17.6321 15.0211 17.7711C14.8821 17.9102 14.6939 17.989 14.4973 17.9908C14.3007 17.9925 14.1112 17.9169 13.9697 17.7803L10.9697 14.7802C10.8291 14.6396 10.7502 14.4489 10.7502 14.25C10.7502 14.0511 10.8291 13.8604 10.9697 13.7198L13.9697 10.7198C14.1104 10.5791 14.3011 10.5002 14.5 10.5002C14.6989 10.5002 14.8896 10.5791 15.0302 10.7198ZM12.25 9.75C12.25 9.55109 12.171 9.36032 12.0303 9.21967C11.8897 9.07902 11.6989 9 11.5 9H4.75C4.55109 9 4.36032 9.07902 4.21967 9.21967C4.07902 9.36032 4 9.55109 4 9.75C4 9.94891 4.07902 10.1397 4.21967 10.2803C4.36032 10.421 4.55109 10.5 4.75 10.5H11.5C11.6989 10.5 11.8897 10.421 12.0303 10.2803C12.171 10.1397 12.25 9.94891 12.25 9.75Z"
                        fill="#FDFDFD"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.97018 6.21959C7.82957 6.36024 7.75059 6.55097 7.75059 6.74984C7.75059 6.94871 7.82957 7.13944 7.97018 7.28009L10.4399 9.74984L7.97018 12.2196C7.89854 12.2888 7.84141 12.3715 7.8021 12.463C7.76279 12.5545 7.7421 12.653 7.74124 12.7525C7.74037 12.8521 7.75935 12.9509 7.79706 13.0431C7.83477 13.1352 7.89046 13.219 7.96088 13.2894C8.0313 13.3598 8.11504 13.4155 8.20721 13.4532C8.29938 13.4909 8.39814 13.5099 8.49773 13.509C8.59731 13.5082 8.69573 13.4875 8.78723 13.4482C8.87873 13.4089 8.96149 13.3517 9.03068 13.2801L12.0307 10.2801C12.1713 10.1394 12.2503 9.94871 12.2503 9.74984C12.2503 9.55097 12.1713 9.36024 12.0307 9.21959L9.03068 6.21959C8.89003 6.07899 8.6993 6 8.50043 6C8.30155 6 8.11082 6.07899 7.97018 6.21959Z"
                        fill="#FDFDFD"/>
                </svg>
              </div>
              <div class="folder__modifications-name">{{ complectation.title }}</div>
              <div class="folder__modifications-price">{{ numberFormat(complectation.price + dopSum) }} ₽</div>
            </div>
            <div class="folder__modifications-line folder__modifications-line--margin">
              <div class="folder__modifications-tech">
                <span>{{ modification.drive_type.title }}</span>
                <span>{{ modification.gearbox.title }}</span>
                <span>{{ modification.engine_type.title }}</span>
              </div>
              <div class="folder__modifications-credit">от {{ creditPrice(complectation.price + dopSum) }} ₽ / мес.
              </div>
            </div>
          </div>
          <div class="folder__modifications-buttons">
            <button class="button button--credit" @click="onCredit(modification, complectation)">В КРЕДИТ</button>
            <button class="button button--black-border" @click="complectationMore(complectation)">ПОДРОБНЕЕ</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="comparisonModal" v-if="comparison.length > 1"
            class="button button--comparison">
      <span>{{ comparison.length }}</span>
      <span>Сравнить</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {creditPrice, numberFormat} from "~/helpers/filters";
import {ModificationType} from "~/app/types/modification";
import {ComplectationType} from "~/app/types/complectation";
import {ComparisonType} from "~/app/types/comparison";
import {useModals} from "~/store/modals";
import {FolderPageType} from "~/app/types/folders";
import {useComparison} from "~/store/comparison";

const comparison = computed(() => useComparison().comparisonArray)
const onComparison = (modification: any, complectation: any) => {
  let payload = {
    slug: `${modification.id}-${complectation.id}`,
    title: `${modification.title} <br/> ${complectation.title}`,
    equipment: complectation.equipment
  }
  useComparison().setComparison(payload)
}
const comparisonModal = () => {
  useModals().openModal({
    open: true,
    title: 'Сравнение',
    type: 'comparison'
  })
}

const props = defineProps<{
  folder: FolderPageType,
  colorIndex: number,
  dopSum: number
}>();
const onCredit = (modification: ModificationType, complectation: ComplectationType) => {
  useModals().setModalOffer({
    id: props.folder.id,
    mark: props.folder.mark.title,
    markSlug: props.folder.mark.slug,
    folder: props.folder.title,
    folderSlug: props.folder.slug,
    modification: modification.title,
    title: `${props.folder.mark.title} ${props.folder.title} ${complectation.title}`,
    image: props.folder.colors[props.colorIndex].image.medium_webp,
    price: complectation.price + props.dopSum,
    tech: [
      {
        slug: 'engine',
        value: modification.engine_volume + ' л'
      },
      {
        slug: 'engine-power',
        value: modification.engine_power + ' л.с.'
      },
      {
        slug: 'time',
        value: props.folder.time + 'с.'
      },
      {
        slug: 'speed',
        value: props.folder.max_speed + ' км/ч'
      }
    ],
    type: 'folder',
    complectationId: complectation.id,
    modificationId: modification.id,
    markId: props.folder.mark.id,
    folderId: props.folder.id,
    colorId: props.folder.colors[props.colorIndex].id
  });
  useModals().openModal({
    open: true,
    title: "заявка на автокредит",
    type: "credit-new",
  });
};

const complectationMore = (complectation: any) => {
  useModals().setModalOffer({
    id: props.folder.id,
    mark: props.folder.mark.title,
    markSlug: props.folder.mark.slug,
    folder: props.folder.title,
    folderSlug: props.folder.slug,
    modification: complectation.title,
    title: `${props.folder.mark.title} ${props.folder.title} ${complectation.title}`,
    image: props.folder.colors[props.colorIndex].image.medium_webp,
    price: complectation.price + props.dopSum,
    equipment: complectation.equipment,
    type: 'folder',
  });
  useModals().openModal({
    open: true,
    title: "Комплектация",
    type: "modification",
  });
};

</script>
