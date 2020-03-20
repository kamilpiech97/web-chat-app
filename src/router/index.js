import Vue from "vue";
import Router from "vue-router";
import Chat from "@/components/Chat";
import Login from "@/components/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Chat",
      component: Chat
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
