<template>
    <main class="dashboard-page">
        <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <img :src="logoUrl" alt="Logo" class="mb-5 w-6rem flex-shrink-0" />
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3" v-if="!isRegistering">Welcome! Sign in to continue</div>
                            <div class="text-900 text-3xl font-medium mb-3" v-else>Welcome! Register to continue</div>
                        </div>

                        <!-- Login Form -->
                        <form v-if="!isRegistering" @submit.prevent="handleLogin">
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                            <!-- Additional elements for login -->
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="rememberMeChecked" id="rememberme" binary class="mr-2"></Checkbox>
                                    <label for="rememberme">Remember me</label>
                                </div>
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>

                            <Button type="submit" label="Sign In" class="w-full p-3 text-xl" outlined></Button>
                        </form>

                        <!-- Registration Form -->
                        <form v-else @submit.prevent="handleRegister">
                            <label for="emailReg" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="emailReg" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />
                            <label for="passwordReg" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="passwordReg" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                            <label for="confirmPassword" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
                            <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                            <Button type="submit" label="Register" class="w-full p-3 text-xl" outlined></Button>
                        </form>

                        <!-- Toggle Button -->
                        <button @click="isRegistering = !isRegistering" class="mt-4 text-primary-color cursor-pointer">
                            {{ isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { login, register } from "../../helpers/auth.js";
import { useToast } from "primevue/usetoast";
import { supabase } from '../../supabase/init.js';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useLayout } from '../../layout/composables/layout.js';

const toast = useToast();
const { layoutConfig } = useLayout();
const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');
const loading = ref(false);
const isRegistering = ref(false);
const rememberMeChecked = ref(false);

const showToast = (message, severity, summary) => {
    toast.add({ severity, summary, detail: message, life: 3000 });
};


onMounted(() => {
    const session = supabase.auth.session();
    if (session?.user) {
        email.value = session.user.email;
        router.push({ name: 'dashboard' });
    }
});

const handleLogin = async () => {
    try {
        loading.value = true;
        await login(email.value, password.value);
        showToast('Successfully logged in!', 'success', 'Success');
        router.push({ name: "dashboard" });
    } catch (error) {
        showToast('Error logging in!', 'error', 'Error');
        console.log(`Error: ${error.message}`);
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    } finally {
        loading.value = false;
    }
};

const handleRegister = async () => {
    console.log('handleRegister in Login.vue');
    if (password.value === confirmPassword.value) {
        console.log('password value', password.value);
        console.log('confirmPassword value', confirmPassword.value);
        try {
            await register(email.value, password.value, confirmPassword.value);
            showToast('Check your email to complete registration.', 'success', 'Success');
            errorMsg.value = 'Check your email to complete registration.';
            isRegistering.value = false;
            setTimeout(() => {
                errorMsg.value = null;
                isRegistering.value = false; 
            }, 5000);
        } catch (error) {
            showToast(error.message, 'error', 'Error');
            errorMsg.value = error.message;
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
        }
    } else {
        errorMsg.value = 'Passwords do not match';
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    }
};
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>