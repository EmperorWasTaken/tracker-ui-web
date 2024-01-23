<template>
    <main class="dashboard-page">
        <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <!-- <img :src="logoUrl" alt="Logo" class="mb-5 w-6rem flex-shrink-0" /> -->
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3" v-if="!isRegistering">Welcome! Sign in to continue</div>
                            <div class="text-900 text-3xl font-medium mb-3" v-else>Welcome! Register to continue</div>
                        </div>

                        <!-- Login Form -->
                        <form v-if="!isRegistering" @submit.prevent="handleLogin">
                            <label for="email"  class="block text-900 text-xl font-medium mb-2">Email</label>
                            <small class="p-error">{{ emailError }}</small>
                            <br />
                            <InputText id="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" ></InputText>
                  
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <small class="p-error">{{ passwordError }}</small>
                            <Password id="password" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            

                            <!-- Additional elements for login -->
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="rememberMeChecked" id="rememberme" binary class="mr-2"></Checkbox>
                                    <label for="rememberme">Remember me</label>
                                </div>
                                <a @click="handleForgottenPassword" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>

                            <Button type="submit" label="Sign In" class="w-full p-3 text-xl" outlined></Button>
                        </form>

                        <!-- Registration Form -->
                        <form v-else @submit.prevent="handleRegister">

                            <label for="firstNameReg" class="block text-900 text-xl font-medium mb-2">First name</label>
                            <small class="p-error" id="text-error">{{ firstNameError || '&nbsp;' }}</small>
                            <br />
                            <InputText id="firstNameReg" type="text" placeholder="First name" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="firstName" />
                            

                            <label for="lastNameReg" class="block text-900 text-xl font-medium mb-2">First name</label>
                            <small class="p-error" id="text-error">{{ lastNameError || '&nbsp;' }}</small>
                            <br />
                            <InputText id="lastNameReg" type="text" placeholder="Last name" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="lastName" />
                            

                            <label for="ageReg" class="block text-900 text-xl font-medium mb-2">Age</label>
                            <small class="p-error" id="text-error">{{ ageError || '&nbsp;' }}</small>
                            <br />
                            <InputText id="ageReg" type="text" placeholder="Age" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="age" />
                            

                            <label for="emailReg" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <small class="p-error" id="text-error">{{ registerEmailError || '&nbsp;' }}</small>
                            <br />
                            <InputText id="emailReg" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="registerEmail" />
                            

                            <label for="passwordReg" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <small class="p-error" id="text-error">{{ registerPasswordError || '&nbsp;' }}</small>
                            <Password id="passwordReg" v-model="registerPassword" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            

                            <label for="confirmPassword" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
                            <small class="p-error">{{ confirmPasswordError }}</small>
                            <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            

                            <Button type="submit" label="Register" class="w-full p-3 text-xl" outlined></Button>
                        </form>

                        <!-- Toggle Button -->
                        <Button @click="isRegistering = !isRegistering" class="mt-4 text-primary-color cursor-pointer">
                            {{ isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register' }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { login, register } from "../../helpers/auth.js";
import { useToast } from "primevue/usetoast";
import { supabase } from '../../supabase/init.js';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useLayout } from '../../layout/composables/layout.js';
import { useField, useForm, Form } from 'vee-validate';

const toast = useToast();
const { layoutConfig } = useLayout();
const router = useRouter();
const errorMsg = ref('');
const loading = ref(false);
const isRegistering = ref(false);
const rememberMeChecked = ref(false);

const { value: email, errorMessage: emailError } = useField('email', 'required|email');
const { value: password, errorMessage: passwordError } = useField('password', 'required');

const { value: registerEmail, errorMessage: registerEmailError } = useField('email', 'required|email');
const { value: registerPassword, errorMessage: registerPasswordError } = useField('registerPassword', 'required|minLength:8');
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword', 'required|minLength:8');
const { value: firstName, errorMessage: firstNameError } = useField('firstName', 'required');
const { value: lastName, errorMessage: lastNameError } = useField('lastName', 'required');
const { value: age, errorMessage: ageError } = useField('age', 'required|numeric');

const showToast = (message, severity, summary) => {
    toast.add({ severity, summary, detail: message, life: 3000 });
};



const { handleSubmit, meta } = useForm();

watch(meta, (newMeta) => {
  console.log('Form validation state:', newMeta.value);
}, { deep: true });

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
        showToast(error.message, 'error', 'Error logging in!');
        console.log(`Error: ${error.message}`);
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    } finally {
        loading.value = false;
    }
};

const handleRegister = async () => {
    debugger;
    if (registerPassword.value === confirmPassword.value) {
        try {
            age.value = parseInt(age.value);
            await register(isRegistering ? registerEmail.value : email.value, isRegistering ? registerPassword.value : password.value, confirmPassword.value, firstName.value, lastName.value, age.value);
            showToast('Check your email to complete registration.', 'success', 'Success');
            errorMsg.value = 'Check your email to complete registration.';
            isRegistering.value = false;
            setTimeout(() => {
                errorMsg.value = null;
                isRegistering.value = false; 
            }, 5000);
        } catch (error) {
            showToast(error.message, 'error', 'Error registering!');
            errorMsg.value = error.message;
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
        }
    } else {
        errorMsg.value = 'Passwords do not match';
        showToast(errorMsg.message, 'error', 'Error registering!');
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    }
};

const handleForgottenPassword = async () => {
    try {
        await supabase.auth.api.resetPasswordForEmail(email.value);
        showToast('Check your email for the password reset link.', 'success', 'Success');
        errorMsg.value = 'Check your email for the password reset link.';
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    } catch (error) {
        showToast(error.message, 'error', 'Error');
        errorMsg.value = error.message;
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    }
};

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>