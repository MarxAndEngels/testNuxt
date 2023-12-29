<template>
  <div class="benefits">
    <div class="benefits__line">
      <div class="benefits__item"
           v-for="(benefit, index) in currentBenefits" :key="index"
           @click="openModalHandler(benefit.title, benefit.description)">
        <div class="benefits__item-title" v-html="benefit.title"></div>
<!--        <div class="benefits__item-text"> {{ benefit.text }}</div>-->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "#imports"
import {BenefitType} from "~/app/types/benefit";
import {useModals} from "~/store/modals";

const props = defineProps<{
  type: string
}>()


const benefits = computed<BenefitType[]>(() => {
  return [
    {
      slug: 'gift',
      title: 'КАСКО и комлект </br> резины в подарок',
      text: '',
      description: 'При оформлении автомобиля в кредит Вам предоставляется дополнительная скидка в размере до 300 000 ₽ от изначальной стоимости автомобиля.'
    },
    {
      slug: 'guarantee',
      title: `Гарантия 5 лет </br> или 150 000 км`,
      text: '',
      description: 'Автоцентр предоставляет гарантию на техническое состояние автомобиля в течение одного года с момента покупки.'
    },
    {
      slug: 'percent',
      title: 'Автокредит </br> без переплат',
      text: '',
      description: 'Вы можете приобрести автомобиль в кредит без первоначального взноса, однако, чем больше взнос, тем лучше условия по кредиту.'
    },
    {
      slug: 'docs',
      title: 'Одобрение по </br> двум документам',
      text: '',
      description: 'Для оформления автомобиля в кредит вам потребуются только паспорт и водительское удостоверение.'
    },
    {
      slug: "trade-in_sale",
      title: "Выгодный </br> Trade-in",
      text: "",
      description:
          "При обмене автомобиля вам предоставляется дополнительная выгода в размере до 200 000 ₽ от изначальной стоимости автомобиля.",
    },
    {
      slug: "market-value",
      title: "Рыночная оценка </br> вашего автомобиля",
      text: "",
      description:
          "Оценка вашего автомобиля будет на 100% рыночной, всю сумму можно использовать для покупки нового автомобиля.",
    },
    {
      slug: 'installment_sale',
      title: 'Скидка </br> за рассрочку',
      text: '',
      description: 'При оформлении автомобиля в рассночку вам предоставляется дополнительная скидка в размере до 300 000 ₽ от изначальной стоимости автомобиля.'
    },
    {
      slug: 'installment_percent',
      title: 'Рассрочка </br> без переплат',
      text: '',
      description: 'Вы можете приобрести автомобиль в рассрочку при первоначальном взносе от 0%.'
    }
  ]
})

const currentBenefits = computed<BenefitType[]>(() => {
  let installment = ['installment_sale', 'guarantee', 'installment_percent', 'docs']
  let exchange = ['trade-in_sale', 'guarantee', 'percent', 'docs']
  let credit = ['gift', 'guarantee', 'percent', 'docs']

  let benefitsMap: { [key: string]: string[] } = {
    installment,
    exchange,
    credit
  }

  return benefits.value.filter((item) => {
    return benefitsMap[props.type].indexOf(item.slug) !== -1;
  })

})
const modal = useModals()

const openModalHandler = (title: string, text: string) => {
  let payload = {
    open: true,
    title: title.replace('</br>',''),
    text: text
  }
  useModals().openModalText(payload)
}

</script>