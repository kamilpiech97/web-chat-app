import Vue from "vue";
import Router from "vue-router";
import Chat from "@/components/Chat";
import Login from "@/components/Login";
import Group from "@/components/Group";
import Form from "@/components/Form";
import SingleChat from "@/components/SingleChat";
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
      path: "/group/:id",
      name: "Group",
      component: Group, Form
    },
    {
      path: "/single/:id",
      name: "SingleChat",
      component: SingleChat, Form
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
