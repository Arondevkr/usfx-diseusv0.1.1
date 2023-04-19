<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/index";
import { onMounted } from "@vue/runtime-dom";
const authStore = useAuthStore();
const avataruser = localStorage.getItem("avatar");
const nameuser = localStorage.getItem("user");
const rol = localStorage.getItem("rol");
const linkActive = window.location.pathname;

function sidebarmenu() {
  const sidebarToggle = document.body.querySelector(
    "#header-toggle"
  ) as HTMLElement;

  sidebarToggle.addEventListener("click", (event) => {
    console.log("entro");
    const sidebar = document.getElementById("nav-bar") as HTMLElement;
    const header = document.getElementById("header") as HTMLElement;
    const main = document.getElementById("body-pd") as HTMLElement;

    sidebar?.classList.toggle("shownav");
    main?.classList.toggle("main-pd");
    main?.classList.toggle("main-pd2");
  });
}

onMounted(() => {
  sidebarmenu();
});
</script>

<template>
  <header id="header" class="header py-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex justify-content-start">
        <i
          type="button"
          class="btn btn-outline-secondary btn-sm bi bi-list"
          id="header-toggle"
        ></i>
        <a href="#" class="nav_logo">
          <span class="nav_logo-name">test-Vocacional</span>
        </a>
      </div>
      <div class="d-flex justify-content-end">
        <div class="flex-shrink-0 me-1 align-self-center">
          <span class="fs-8">Admin </span>
        </div>
        <div class="flex-shrink-0">
          <img
            src="https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg/@@images/image.jpeg"
            class="rounded-circle border border-dark"
            width="32"
            height="32"
          />
        </div>
      </div>
    </div>
  </header>

  <div class="l-navbar shownav" id="nav-bar">
    <nav class="nav">
      <div>
        <div class="nav_list">
          <a
            href="/"
            id="dashboard"
            class="nav_link"
            :class="{ active: linkActive === '/' || linkActive === '/login' }"
          >
            <i class="bi bi-speedometer2" title="Dashboard"></i>
            <span class="nav_name">Dashboard</span>
          </a>
          <a href="/estudiante" class="nav_link">
            <i class="bi bi-person-badge" title="estudiante"></i>
            <span class="nav_name">Estudiante</span>
          </a>
          <!-- MI PARTE DE CODIGO RONALDO CC13 -->
          <a href="/carrera" class="nav_link">
            <i class="bi bi-person-badge" title="carrera"></i>
            <span class="nav_name">Carrera</span>
          </a>
          <a href="/facultad" class="nav_link">
            <i class="bi bi-person-badge" title="facultad"></i>
            <span class="nav_name">Facultad</span>
          </a>
          <!-- MI PARTE DE CODIGO RONALDO CC13 -->
          <a href="/" class="nav_link">
            <i class="bi bi-person-badge" title="item"></i>
            <span class="nav_name">item</span>
          </a>
          <a href="/" class="nav_link">
            <i class="bi bi-person-badge" title="item"></i>
            <span class="nav_name">item</span>
          </a>
          <a href="/" class="nav_link">
            <i class="bi bi-person-badge" title="item"></i>
            <span class="nav_name">item</span>
          </a>
          <a href="/" class="nav_link">
            <i class="bi bi-person-badge" title="item"></i>
            <span class="nav_name">item</span>
          </a>
          <a href="/" class="nav_link">
            <i class="bi bi-person-badge" title="item"></i>
            <span class="nav_name">item</span>
          </a>

          <a
            href="/usuarios"
            class="nav_link"
            :class="{ active: linkActive === '/usuarios' }"
          >
            <i class="bi bi-person-fill-gear" title="Usuarios"></i>
            <span class="nav_name">Usuarios</span>
          </a>
        </div>
      </div>
      <div>
        <hr />
        <a @click="authStore.logout()" class="nav_link">
          <i class="bi bi-box-arrow-left"></i>
          <span class="nav_name">Salir</span>
        </a>
      </div>
    </nav>
  </div>

  <!-- fin panel superior-->
</template>
