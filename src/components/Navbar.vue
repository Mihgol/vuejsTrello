<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand">Totally not a "todo" app</a>
    <NewList class="nodrag bg-dark list-wrapper" @listAdded="addList" />
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import NewList from "@/components/NewList.vue";
export default Vue.extend({
  name: "Navbar",
  components: {
    NewList
  },
  methods: {
    addList({ title }: { title: string }): void {
      this.$store.commit("addList", { title });
    }
  }
});
</script>


<style lang="scss">
</style>