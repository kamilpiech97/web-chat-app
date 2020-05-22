import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Board from "@/views/Board";
import Register from "@/components/Register";
import ResetPassword from "@/components/ResetPassword";
import Profile from "@/components/Profile";

Vue.use(Router);

export default new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Board",
      component: Board
    },
    {
      path: "/profil",
      name: "Profile",
      component: Profile
    },
    {
      path: "/rejestracja",
      name: "Register",
      component: Register
    },
    {
      path: "/logowanie",
      name: "Login",
      component: Login
    },
    {
      path: "/reset",
      name: "ResetPassword",
      component: ResetPassword
    }
  ]
});
