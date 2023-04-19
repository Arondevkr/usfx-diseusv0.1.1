<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/index";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
// import Home from "/home/user/Escritorio/proyecto test/frontend/src/views/HomeView.vue";
import "bootstrap/dist/js/bootstrap.min.js";
const authStore = useAuthStore();
</script>

<template>
  <Header></Header>
  <RouterView />
  <!-- <Home></Home> -->
  <Footer></Footer>
  <!-- <Footer v-if="authStore.token"></Footer> -->
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "@/assets/css/styles.css";
</style>
