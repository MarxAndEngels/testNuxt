<template>
  <div class="folder__colors">
    <div class="folder__colors-item"
         :class="{'folder__colors-item--active':props.activeColor?.id === color.id}"
         @click="emit('changeColor', index)"
         v-show="!color.taxi"
         :style="getHexColor(color)"
         v-for="(color, index) in colors"></div>
  </div>
</template>

<script setup lang="ts">
import {FolderColorType} from "~/app/types/folders";

const emit = defineEmits(["changeColor"]);
const props = defineProps<{
  colors: FolderColorType[];
  taxi?: boolean,
  activeColor: FolderColorType
}>();
const getHexColor = (color: FolderColorType) => {
  let bg
  if (color && color.roof_hex_code) {
    bg = {
      background: `url(linear-gradient(50deg, ${color.hex_code} 50%, ${color.roof_hex_code} 50%)`
    }
  } else {
    bg = {
      backgroundColor: color.hex_code
    }
  }
  return bg
}
</script>