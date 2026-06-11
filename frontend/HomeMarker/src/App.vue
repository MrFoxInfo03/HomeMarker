<script setup></script>

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
  <div class="ProductsList">
    
  </div>

  <router-view />
</template>
