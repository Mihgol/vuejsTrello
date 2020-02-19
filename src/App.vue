<template>
  <div id="app">
    <Navbar />
    <Board />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "@/components/Board.vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  name: "App",
  created() {
    document.title = "Vue Trello-Like App";
  },
  components: {
    Board,
    Navbar
  }
});
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
