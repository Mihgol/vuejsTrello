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
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

// Variables

$group-width: 272px;
$main-color: #69b83c;
$theme-color: #2d2d2d;

// Transitions

.fade-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter {
  transition-delay: 0.3s;
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>