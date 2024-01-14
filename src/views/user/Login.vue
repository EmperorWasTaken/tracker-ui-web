<template>
  <main class="dashboard-page">
    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <!-- Error Handling -->
      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <!-- Login -->
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <!-- Logo and Welcome Text -->
          <!-- ... -->

          <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span class="text-600 font-medium line-height-3">Don't have an account?</span>
          <a @click="register" class="font-medium no-
underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
</div>

    <form @submit.prevent="login">
      <div>
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email" type="text" v-model="email" class="w-full mb-3" />

        <label for="password" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password" type="password" v-model="password" class="w-full mb-3" />

        <div class="flex align-items-center justify-content-between mb-6">
          <!-- Additional Options like 'Remember me' -->
          <!-- ... -->
        </div>

        <Button @click="login" label="Sign In" icon="pi pi-user" class="w-full"></Button>
      </div>
    </form>
  </div>
</div>
  </main>

</template>
<script setup>
import { ref } from "vue";
import { supabase } from "../../supabase/init.js";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const router = useRouter();
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const loading = ref(false);

const login = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    loading.value = false;
    router.push({ name: "dashboard" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  loading.value = false;
};

const register = async () => {
  confirmPassword.value = password.value;
  if (password.value === confirmPassword.value) {
    try {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push({ name: "Login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Error: Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
};
</script>
