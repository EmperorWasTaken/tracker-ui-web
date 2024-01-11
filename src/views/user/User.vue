<template>
    <main class="dashboard-page">
        <h1>USER</h1>
        <div class="menu" v-if="!user">
			<router-link to="/register" class="button">
				<span class="material-icons">how_to_reg</span>
				<span class="text">Register</span>
			</router-link>
			<router-link to="/login" class="button">
				<span class="material-icons">login</span>
				<span class="text">Login</span>
			</router-link>
		</div>
        <div v-if="user">
            <p>Name: {{user ? user.user_metadata.name : "" }}</p>
            <p>Age: {{user ? user.user_metadata.age : "" }}</p>
            <p>Height: {{user ? user.user_metadata.height : "" }}</p>
            <p>Weight: {{user ? user.user_metadata.weight : "" }}</p>
        </div>
        <div v-if="user">
            <p>A tiny violin</p>
            <button @click="logUser">Log user</button>
            <InputText type="text" v-model="name" placeholder="Name"></InputText>
            <InputText type="text" v-model="age" placeholder="Age"></InputText>
            <InputText type="text" v-model="height" placeholder="Height"></InputText>
            <InputText type="text" v-model="weight" placeholder="Weight"></InputText>
            <button @click="updateUserData">Update user data</button>
        </div>
        <div v-if="user">
            <router-link to="/logout" class="button">
				<span class="material-icons">logout</span>
				<span class="text">Logout</span>
			</router-link>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase/init.js';
import { get, post } from '../../helpers/api.js';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const user = ref(null);

const name = ref(null);
const bmr = ref(null);
const selectedGender = ref();
const age = ref('');
const height = ref('');
const weight = ref('');
const bf = ref('');

onMounted(() => {

  user.value = supabase.auth.user();


  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
  });
});

const logUser = () => {
    console.log(user)
}

const userMetadata = {
    name: name.value,
    age: age.value,
    height: height.value,
    weight: weight.value
}

const updateUserData = async () => {
  // Input validation logic (validate age, height, weight)

  const userMetadata = {
    name: name.value,
    age: Number(age.value),
    height: Number(height.value),
    weight: Number(weight.value),
  };

  await supabase.auth.update({
    data: userMetadata, // Use 'data' instead of 'user_metadata'
    options: { refresh: true },
  });

  console.log("updated user data");
};


</script>