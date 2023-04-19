import { defineStore } from "pinia";
import { getTokenFromLocalStorage } from "@/helpers";

import http from "@/plugins/axios";
import router from "@/router";

const useAuthStore = defineStore("auth", {
  state: () => ({
    id: localStorage.getItem("id") || "",
    user: localStorage.getItem("user") || "",
    avatar: localStorage.getItem("avatar") || "",
    rol: localStorage.getItem("rol") || "",
    token: getTokenFromLocalStorage(),
    returnUrl: null || "",
  }),
  getters: {},
  actions: {
    async login(usuario: string, clave: string) {
      await http
        .post("auth/login", { usuario, clave })
        .then((response) => {
          // console.log(response.data);
          this.user = response.data.nombres;
          this.token = response.data.access_token;
          this.id = response.data.id;
          this.avatar = response.data.avatar;
          this.rol = response.data.rol;

          localStorage.setItem("user", this.user || "");
          localStorage.setItem("token", this.token || "");
          localStorage.setItem("id", this.id || "");
          localStorage.setItem("avatar", this.avatar || "");
          localStorage.setItem("rol", this.rol || "");

          router.replace(this.returnUrl || "/");
          // window.location.reload();
          http.patch(
            `usuarios/${this.id}`,
            { ultimo_acceso: new Date().toISOString() },
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        })
        .catch((error) => console.log(error));
    },
    logout() {
      localStorage.clear();
      this.$reset();
      router.push("login");
    },
  },
});

export { useAuthStore };
