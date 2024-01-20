<template>
    <main class="surface-0 flex justify-content-center">
      <div id="home" class="landing-wrapper overflow-hidden">
      <div class="card">
          <Dropdown v-model="eq" :options="eqs" optionLabel="name" placeholder="Equations" />
          <InputText type="text" v-model="age" placeholder="Age"></InputText>
          <InputText type="text" v-model="height" placeholder="Height"></InputText>
          <InputText type="text" v-model="weight" placeholder="Weight"></InputText>
          <InputText v-if="eq && eq.code === 'K'" type="text" v-model="bf" placeholder="Bodyfat %"></InputText>
          <Dropdown v-model="selectedGender" :options="genders" optionLabel="name" placeholder="Gender" />
      </div>
      <button @click="postBMR">Calculate BMR</button>
      <p v-if="bmr !== null">BMR: {{ bmr }}</p>
      <button v-if="bmr !== null" @click="resetBMR">Reset BMR</button>
    </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { get, post } from '../../helpers/api.js';
  import InputText from 'primevue/inputtext';
  import Dropdown from 'primevue/dropdown';
  
  const bmr = ref(null);
  const selectedGender = ref();
  const age = ref('');
  const height = ref('');
  const weight = ref('');
  const bf = ref('');
  
  const eqs = ref([
    { name: 'Mifflin-St Jeor Equation', code: 'M'},
    { name: 'Revised Harris-Benedict Equation', code: 'H'},
    { name: 'Katch-McArdle Formula', code: 'K'},
  ])
  
  const eq = ref(eqs[0]); 
  
  const genders = ref([
      { name: 'Male', code: 'M' },
      { name: 'Female', code: 'F' }
  ]);
  
  
  const fetchBMR = async () => {
    try {
      const response = await get('feature', 'calculations/bmr');
      bmr.value = response.data;
    } catch (error) {
      console.error('Error fetching BMR:', error);
    }
  };
  
  const resetBMR = () => {
    try {
      bmr.value = null;
    } catch (error) {
      console.error('Could not set BMR to 0:', error)
    }
  };
  
  const postBMR = async () => {
    try {
      const data = {
        age: parseInt(age.value),
        height: parseInt(height.value),
        weight: parseInt(weight.value),
        gender: selectedGender.value.code,
        bf: eq && eq.value.code === 'K' ? parseInt(bf.value) : undefined,
        eq: eq.value.code
      };
  
      const response = await post('feature', 'calculations/bmr', data);
      bmr.value = response.data;
    } catch (error) {
      console.error('Error posting BMR:', error);
    }
  };
  </script>