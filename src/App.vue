<template>
  <div id="app">
    <Board />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "@/components/Board.vue";

export default Vue.extend({
  name: "App",
  created() {
    document.title = "Vue Trello-Like App";
  },
  components: {
    Board
  }
});
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
