<template>
    <main class="dashboard-page">
    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <!-- Error Handling -->
      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>
  
      <!-- Register -->
      <form
        @submit.prevent="register"
        class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
      >
        <h1 class="text-3xl text-at-light-green mb-4">Register</h1>
  
        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="email"
            v-model="email"
          />
        </div>
  
        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
          <input
            type="password"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="password"
            v-model="password"
          />
        </div>
  
        <div class="flex flex-col mb-2">
          <label for="confirmPassword" class="mb-1 text-sm text-at-light-green"
            >Confirm Password</label
          >
          <input
            type="password"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>
  
        <button
          type="submit"
          
        >
          Register
        </button>
  
        <router-link class="text-sm mt-6 text-center" to="/login">
          Already have an account? <span class="text-at-light-green">Login</span>
        </router-link>
      </form>
    </div>
</main>

  </template>

<script setup>

import { ref } from 'vue';
import { supabase } from "../../supabase/init.js";
import { useRouter } from "vue-router";

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

const register = async () => {
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