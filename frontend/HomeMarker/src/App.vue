<script setup>
import { ref, onMounted } from "vue";

const authenticated = ref(false);

onMounted(async() => {
  try {
    const response = await fetch("http://localhost:3000/auth/me", 
      {
        credentials: "include"
      }
    );

    authenticated.value = response.ok;
  } catch(err) {
    authenticated.value = false;
  }
});
</script>

<template>
  <div class="nav">
    <div class="logo-div">
      <img src="./assets/image/HomeMarker-Logo.png" alt="Logo" width="50px" height="55px">
    </div>
    <div class="addit-panel">
      <div class="auth-button">
        <router-link to="/auth_page">Sign in</router-link>
      </div>
      <div class="logg-button">
        <router-link to="/login_page">Login</router-link>
      </div>
    </div>
  </div>
  <div class="welcomeUser">
    
    

  </div>

  <router-view />
</template>
