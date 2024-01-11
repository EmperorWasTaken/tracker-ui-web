<template>
    <main class="dashboard-page">
        <Toast />
        <ConfirmPopup></ConfirmPopup>
        <h1>LOGOUT</h1>
        <Button @click="confirm1($event)" icon="pi pi-check" label="Confirm" outlined></Button>
    </main>
</template>
<script setup>

import { ref } from "vue";
import { supabase } from "../../supabase/init.js";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmPopup from 'primevue/confirmpopup';

const confirm = useConfirm();
const toast = useToast();
const router = useRouter();

const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error;
        router.push({ name: "dashboard" });
    } catch ( error ) {
        console.error("Error logging out", error)
    }
}

const confirm1 = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            logout()

        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

</script>