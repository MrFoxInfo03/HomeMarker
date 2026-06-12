<template>
    <div class="auth_page">
        <form @submit.prevent="handleSubmit">
            <h1>Реєстрація</h1>
            
            <div class="fullname_fields">
                <input type="text" maxlength="150" placeholder="Ім'я" v-model="form.first_name" required>
                <input type="text" maxlength="150" placeholder="Призвіще" v-model="form.last_name" required>
            </div>
            <input type="email" placeholder="Email" v-model="form.email" maxlength="250" required>
            <input type="password" placeholder="Password" v-model="form.password" max="150" required>
            <div class="phone-wrapper">
                <span class="phone-prefix">+380</span>
                <input type="tel" v-model="form.phone_number" placeholder="XXXXXXXXX" pattern="\d{9}" required>
            </div>
            
            <div class="submit_button">
                <input type="submit" value="Реєстрація">
                <router-link to="/" style="color: black; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif';">Вийти назад</router-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: ''
});

const handleSubmit = async() => {
    try {
        const response = await fetch('http://localhost:3000/auth/add_new_user', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON. stringify(form)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Щось пішло не так.");
    } catch(error) {
        console.log("Register error:", error);
    }
}
</script>