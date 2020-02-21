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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter {
  transition-delay: 0.5s;
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>