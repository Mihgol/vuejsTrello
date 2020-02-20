<template>
  <nav ref="navbar" class="navbar-dark shadow bg-dark navb">
    <NewList class="nodrag bg-dark list-wrapper" @listAdded="addList" />
    <a href="https://github.com/Mihgol/vuejsTrello" class="logo">
      <b-icon-columns-gutters />Totally not a "todo" app
    </a>
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
.navb {
  padding: 0.5rem 0;
  max-height: 52px;
  .logo {
    cursor: pointer;
    margin-bottom: 0;
    margin-left: 30px;
    font-family: "Indie Flower";
    font-size: 24px;
    color: rgb(192, 192, 192);
    margin-right: 1rem;
  }
  .logo:hover {
    color: #ffffff;
    text-decoration: none;
  }
}
</style>