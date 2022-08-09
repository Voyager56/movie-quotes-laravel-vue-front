<template>
  <div
    v-if="modal"
    class="text-white fixed left-[270px] w-full h-[90%] max-w-[100%] z-10 backdrop-blur-sm flex justify-start overflow-scroll"
  >
    <div
      ref="modalRef"
      class="bg-[#000000] w-[600px] h-fit text-white flex flex-col items-center justify-start ml-[20rem]"
    >
      <h1 class="text-2xl py-[2rem] border-b-gray-700 border-b-[1px] w-full">
        Add Movie
      </h1>
      <div class="flex flex-col self-start px-[2rem] py-[3rem] w-full">
        <div class="flex items-center pb-[1rem]">
          <img
            :src="user.value.photo"
            alt="avatar"
            class="rounded-full w-[50px]"
          />
          <p class="px-[1rem]">{{ user.value.username }}</p>
        </div>
        <Form v-slot="{ values, meta }" class="flex flex-col w-full">
          <Field
            id="title_en"
            name="title in english"
            as="input"
            rules="required|english"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="Movie Name"
          ></Field>
          <ErrorMessage
            name="title in english"
            class="text-left text-red-600"
          />
          <Field
            id="title_ka"
            name="title in georgian"
            as="input"
            rules="required|georgian"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="ფილმის სახელი"
          ></Field>
          <ErrorMessage
            name="title in georgian"
            class="text-left text-red-600"
          />
          <Field
            id="release_date"
            name="release date"
            as="input"
            rules="required|numeric"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            :placeholder="$t('release_date')"
          ></Field>
          <ErrorMessage name="release date" class="text-left text-red-600" />
          <Field
            id="budget"
            name="budget"
            as="input"
            rules="required|numeric"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            :placeholder="$t('budget')"
          ></Field>
          <ErrorMessage name="budget" class="text-left text-red-600" />
          <Multiselect
            v-model="selectedGenres"
            :options="genres"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            mode="tags"
            :classes="{
              container:
                'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-black  text-base leading-snug outline-none',
              containerDisabled: 'cursor-default bg-gray-100',
              containerOpen: 'rounded-b-none',
              containerOpenTop: 'rounded-t-none',
              containerActive: 'ring ring-green-500 ring-opacity-30',
              singleLabel:
                'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-black leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
              singleLabelText:
                'overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full',
              multipleLabel:
                'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
              search:
                'w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base font-sans bg-black rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
              tags: 'flex-grow flex-shrink flex flex-wrap  ',
              tag: 'bg-gray-400 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center  rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
              tagDisabled: 'pr-2 opacity-50 rtl:pl-2',
              tagRemove:
                'flex items-center justify-center p-1 mx-0.5 rounded-sm bg-gray-400 hover:bg-red-700 hover:bg-opacity-100 group',
              tagRemoveIcon:
                'bg-multiselect-remove bg-center bg-gray-400 bg-no-repeat opacity-100 inline-block w-3 h-3 group-hover:opacity-60',
              tagsSearchWrapper:
                'inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full',
              tagsSearch:
                'absolute inset-0 border-0 outline-none focus:ring-0  p-0 text-base font-sans box-border',
              tagsSearchCopy: 'invisible whitespace-pre-wrap inline-block h-px',
              placeholder:
                'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
              caret:
                'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
              caretOpen: 'rotate-180 pointer-events-auto',
              clear:
                'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5',
              clearIcon:
                'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
              spinner:
                'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5',
              inifite: 'flex items-center justify-center w-full',
              inifiteSpinner:
                'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5',
              dropdown:
                'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-bkack flex flex-col rounded-b',
              dropdownTop:
                '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
              dropdownHidden: 'hidden',
              options: 'flex flex-col p-0 m-0 list-none',
              optionsTop: '',
              group: 'p-0 m-0',
              groupLabel:
                'flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal',
              groupLabelPointable: 'cursor-pointer',
              groupLabelPointed: 'bg-gray-300 text-gray-700',
              groupLabelSelected: 'bg-green-600 text-black',
              groupLabelDisabled:
                'bg-gray-100 text-gray-300 cursor-not-allowed',
              groupLabelSelectedPointed: 'bg-green-600 text-white opacity-90',
              groupLabelSelectedDisabled:
                'text-green-100 bg-green-600 bg-opacity-50 cursor-not-allowed',
              groupOptions: 'p-0 m-0',
              option:
                'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
              optionPointed: 'text-gray-800 bg-gray-100',
              optionSelected: 'text-black bg-green-500',
              optionDisabled: 'text-gray-300 cursor-not-allowed',
              optionSelectedPointed: 'text-white bg-black opacity-90',
              optionSelectedDisabled:
                'text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed',
              noOptions: 'py-2 px-3 text-gray-600 bg-black text-left',
              noResults: 'py-2 px-3 text-gray-600 bg-black text-left',
              fakeInput:
                'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
              spacer: 'h-9 py-px box-content',
            }"
            class="multiselect-blue"
          />
          <Field
            id="director_en"
            name="directors name in english"
            as="input"
            rules="required|english"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="Director"
          ></Field>
          <ErrorMessage
            name="directors name in english"
            class="text-left text-red-600"
          />
          <Field
            id="director_ka"
            name="directors name in georgian"
            as="input"
            rules="required|georgian"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="რეჟისორი"
          ></Field>
          <ErrorMessage
            name="directors name in georgian"
            class="text-left text-red-600"
          />
          <Field
            id="description_en"
            name="description in english"
            as="textarea"
            rules="required|english"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="Movie Description"
          ></Field>
          <ErrorMessage
            name="description in english"
            class="text-left text-red-600"
          />
          <Field
            id="description_ka"
            name="description in georgian"
            as="textarea"
            rules="required|georgian"
            class="bg-[#11101A] my-2 border-[#6C757D] border-[2px] px-3 py-2"
            placeholder="ფილმის აღწერა"
          />
          <ErrorMessage
            name="description in georgian"
            class="text-left text-red-600"
          />

          <ImageDrop :set-image="setImage" />
          <button
            class="w-full text-center my-2 py-2 bg-[#E31221] rounded-md disabled:opacity-40"
            :disabled="!meta.valid || selectedGenres.length === 0"
            @click="submit($event, values)"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import ImageDrop from "./ImageDrop.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted } from "vue";
import instance from "../config/axios";
import Multiselect from "@vueform/multiselect";
import { useRouter } from "vue-router";

const store = userStore();
const { user } = storeToRefs(store);
const modalRef = ref(null);
const image = ref(null);
const genres = ref([]);
const selectedGenres = ref([]);
const router = useRouter();

onMounted(() => {
  instance.get("api/genres").then((res) => {
    genres.value = res.data.genres;
  });
});

function setImage(img) {
  image.value = img;
}

const props = defineProps({
  modal: Boolean,
  closeModal: Function,
});

onClickOutside(modalRef, () => {
  props.closeModal();
});

function submit(e, values) {
  e.preventDefault();
  const form = new FormData();
  form.append("title_en", values["title in english"]);
  form.append("title_ka", values["title in georgian"]);
  form.append("release_year", values["release date"]);
  form.append("budget", values["budget"]);
  form.append("director_en", values["directors name in english"]);
  form.append("director_ka", values["directors name in georgian"]);
  form.append("description_en", values["description in english"]);
  form.append("description_ka", values["description in georgian"]);
  form.append("genres", selectedGenres.value);
  form.append("image", image.value);
  instance.post("/api/movies", form).then((res) => {
    router.go();
  });
}
</script>

<style>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
}
</style>
