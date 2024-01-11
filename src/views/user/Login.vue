<template>
    <main class="dashboard-page">
        <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

      <div class="flex flex-column gap-2">
        <label for="email">Email</label>
        <InputText type="text" id="email" v-model="email" aria-describedby="email-help" />
        </div>

        <div class="flex flex-column gap-2">
        <label for="password">Password</label>
        <InputText type="password" v-model="password" aria-describedby="password-help"></InputText>
      </div>

      <Button type="submit" label="Login" icon="pi pi-check" iconPos="right" :loading="loading" outlined></Button>

      <Button @click="register" outlined>Register</Button>
    </form>
  </div>
    </main>
</template>
<script setup>

import { ref } from "vue";
import { supabase } from "../../supabase/init.js";
import { useRouter } from "vue-router";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const router = useRouter();
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const loading = ref(false)

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
        return ;
    }
    errorMsg.value = "Error: Passwords do not match";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
};

</script>