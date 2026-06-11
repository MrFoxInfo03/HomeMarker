<template>
    <div class="loggin_page auth_page">
        <form @submit.prevent="handleSubmit">
            <h1>Увійти</h1>
            <input type="email" v-model="email" placeholder="Email" maxlength="250" required>
            <input type="password" v-model="password" placeholder="Password" maxlength="150" required>

            <div class="submit_button">
                <input type="submit" value="Увійти">
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
    email: '',
    password: ''
});

const hanbleSubmit = async() => {
    try {
        const response = await fetch("http://localhost:3000/auth/login_user", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Error loggin");
    } catch(error) {
        console.error("Error loggin:", error);
        alert("Error loggin");
    }
} 
</script>