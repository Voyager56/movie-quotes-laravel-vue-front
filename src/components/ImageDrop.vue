<template>
  <div
    class="flex items-center bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
  >
    <div
      class="w-full px-5 py-5 flex items-center justify-between"
      @dragover.prevent
      @drop="onDrop"
    >
      <IconPhoto />
      <div class="flex justify-between">
        <p class="mr-2 ml-5">Drag & drop your image here or</p>
        <div class="w-[200px]">
          <label for="image">Select A File</label>
          <Field
            id="image"
            v-model="image"
            name="image"
            as="input"
            type="file"
            rules="required|image"
            placeholder="ფილმის აღწერა"
            @change="onImageUpload"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="image" class="flex justify-center" @click="removeImage">
    <img :src="imageUrl" alt="" />
  </div>
  <ErrorMessage name="image" class="text-left text-red-600" />
</template>

<script setup>
import IconPhoto from "../assets/icons/IconPhoto.vue";
import { ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

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
