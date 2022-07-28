<template>
  <div class="flex flex-col items-center w-full mx-20">
    <div class="text-3xl self-start">{{ $t("profile") }}</div>
    <Form v-slot="{ values }" class="flex flex-col my-[100px] mr-[100px]">
      <div class="bg-[#262242] px-5 py-2 flex flex-col rounded-xl">
        <div
          class="top-0 left-0 right-0 self-center mt-[-50px] relative overflow-hidden"
        >
          <img :src="imageDisplay" class="rounded-full" alt="" />
          <input
            id="image"
            type="file"
            name="image"
            class="absolute top-[50px] left-0 h-[50px] rounded-full"
            @change="imageUpload"
          />
        </div>
        <label for="image" class="my-5">{{ $t("upload_photo") }}</label>
        <div class="flex flex-col my-2">
          <label for="username" class="text-left">{{ $t("username") }}</label>
          <Field
            id="username"
            as="input"
            name="username"
            rules="required"
            class="bg-white text-black my-2 border-[#6C757D] border-[2px] px-3 py-2 rounded-md w-[400px]"
            :placeholder="user.value.username"
          />
          <ErrorMessage name="username" class="text-left text-red-400" />
        </div>
        <div class="flex flex-col my-2">
          <label for="email" class="text-left">{{ $t("email") }}</label>
          <Field
            id="email"
            as="input"
            name="email"
            rules="required|email"
            class="bg-white text-black my-2 border-[#6C757D] border-[2px] px-3 py-2 rounded-md w-[400px]"
            :placeholder="user.value.email"
          />
          <ErrorMessage name="email" class="text-left text-red-400" />
        </div>
        <button
          class="underline text-blue-900 self-start"
          @click="togglePasswordChange"
        >
          change password
        </button>
        <div v-if="changePassword">
          <div class="flex flex-col my-2">
            <label for="password" class="text-left"
              >{{ $t("password") }}*</label
            >
            <Field
              id="password"
              as="input"
              name="password"
              type="password"
              rules="required|min:6"
              class="bg-white text-black my-2 border-[#6C757D] border-[2px] px-3 py-2 rounded-md w-[400px]"
              :placeholder="$t('password')"
            />
            <ErrorMessage name="password" class="text-left text-red-400" />
          </div>
          <div class="flex flex-col my-2">
            <label for="confirm password" class="text-left"
              >{{ $t("confirm_password") }}*</label
            >
            <Field
              type="password"
              name="confirm password"
              rules="confirmed:@password"
              class="bg-white text-black my-2 border-[#6C757D] border-[2px] px-3 py-2 rounded-md w-[400px]"
              :placeholder="$t('confirm_password')"
            />
            <ErrorMessage
              name="confirm password"
              class="text-left text-red-400"
            />
          </div>
        </div>
      </div>
      <button
        class="bg-[#E31221] py-1 px-2 rounded-md w-[150px] self-end mt-5"
        @click="sendRequest($event, values)"
      >
        {{ $t("save_changes") }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import userStore from "../store/index";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import instance from "../config/axios";

const store = userStore();
const { user } = storeToRefs(store);
const image = ref(null);
const imageDisplay = ref(user.value.value.photo);
const changePassword = ref(false);

function togglePasswordChange(e) {
  e.preventDefault();
  changePassword.value = !changePassword.value;
}

function imageUpload(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = (e) => (imageDisplay.value = e.target.result);
  reader.readAsDataURL(file);
  image.value = file;
}

function sendRequest(e, values) {
  e.preventDefault();
  const data = new FormData();
  data.append("username", values.username);
  data.append("email", values.email);
  if (changePassword.value) {
    data.append("password", values.password);
    data.append("confirm_password", values["confirm password"]);
  }
  if (image.value) {
    data.append("file", image.value);
  }
  instance
    .post("/api/edit-profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style scoped>
#image {
  font-size: 150px;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  -moz-opacity: 0;
  z-index: 2000;
  height: 100%;
}
</style>
