<template>
  <div class="text-dark">{{this.active}}</div>
</template>
<script>
import firebase, { auth } from "firebase";
import { mapState, mapGetters } from "vuex";
import store from "../store";

export default {
  name: "Activity",
  props: ["id"],
  data() {
    return {
      active: '',
    };
  },
  created() {
  }
};
</script>