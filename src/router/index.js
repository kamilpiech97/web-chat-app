import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Board from "@/views/Board";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Board",
      component: Board
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
