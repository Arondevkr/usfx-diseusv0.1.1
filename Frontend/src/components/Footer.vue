<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/index";
const authStore = useAuthStore();
</script>
<template>
  <!-- Footer -->
  <footer id="body-pd" class="container-fluid main-pd p-3">
    <div class="container my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright &copy; usfx 2023</span>
      </div>
    </div>
  </footer>
  <!-- End of Footer -->
</template>
