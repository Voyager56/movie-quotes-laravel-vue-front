<template>
  <div
    class="w-full px-5 py-5 flex items-center justify-between"
    @dragover.prevent
    @drop="onDrop"
    @click="removeImage"
  >
    <IconPhoto />
    <div v-if="!image" class="flex justify-between">
      <p class="mr-2 ml-5">Drag & drop your image here or</p>
      <div class="w-[200px]">
        <label for="image">Select A File</label>
        <input id="file" type="file" @change="onImageUpload" />
      </div>
    </div>
    <div v-else class="flex justify-center">
      <img :src="imageUrl" alt="" />
    </div>
  </div>
</template>

<script setup>
import IconPhoto from "../assets/icons/IconPhoto.vue";
import { ref, watch } from "vue";

const imageUrl = ref(null);
const image = ref(null);

const props = defineProps({
  setImage: {
    type: Function,
    required: true,
  },
});

function onDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  const file = e.dataTransfer.files[0];

  const reader = new FileReader();

  reader.onload = (e) => (imageUrl.value = e.target.result);
  reader.readAsDataURL(file);

  image.value = file;
}

function removeImage() {
  imageUrl.value = null;
  image.value = null;
}

function onImageUpload(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = (e) => (imageUrl.value = e.target.result);
  reader.readAsDataURL(file);
  image.value = file;
}

watch(image, (val) => {
  props.setImage(val);
});
</script>
