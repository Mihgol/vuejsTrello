<template>
  <nav class="navbar navbar-dark bg-dark">
    <NewList class="nodrag bg-dark list-wrapper" @listAdded="addList" />
    <a hard="#" class="logo">Totally not a "todo" app</a>
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
.logo {
  font-family: "Indie Flower";
  font-size: 32px;
  color: rgb(149, 149, 149);
  margin-right: 1rem;
}
.logo:hover {
  color: green;
}
</style>