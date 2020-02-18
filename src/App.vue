<template>
  <div id="app">
    <BoardComponent />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BoardComponent from "@/components/BoardComponent.vue";

export default Vue.extend({
  name: "App",
  created() {
    document.title = "Vue Trello-Like App";
  },
  components: {
    BoardComponent
  }
});
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
