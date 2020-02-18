<template>
  <div class="container">
    <div class="container">
      <ListComponent
        v-for="(list, listIndex) in lists"
        :list="list"
        :listIndex="listIndex"
        :key="list.id"
      >
        <CreateItemComponent @itemAdded="addItem" :listId="list.id" />
      </ListComponent>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ListComponent from "@/components/ListComponent.vue";
import { Item, List } from "../store/Data";
import { IAddItem } from "../store/index";
import CreateItemComponent from "@/components/CreateItemComponent.vue";

export default Vue.extend({
  name: "Board",
  data: () => ({}),
  components: {
    ListComponent,
    CreateItemComponent
  },
  computed: {
    lists(): List[] {
      return this.$store.state.lists;
    }
  },
  methods: {
    addList({ title }: { title: string }): void {
      this.$store.commit("addList", { title });
    },
    addItem({ listId, title, description }: IAddItem): void {
      this.$store.commit("addItem", { listId, title, description });
    }
  },
  mounted() {
    this.addList({ title: "List one" });
  }
});
</script>

<style lang="scss">
</style>