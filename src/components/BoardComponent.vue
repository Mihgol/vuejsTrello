<template>
  <div class="board">
    <div class="board__lists">
      <ListComponent
        v-for="(list, listIndex) in lists"
        :list="list"
        :listIndex="listIndex"
        :key="list.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ListComponent from "@/components/ListComponent.vue";
import { Item, List } from "../store/Data";
import { IAddItem } from "../store/index";

export default Vue.extend({
  name: "Board",
  components: {
    ListComponent
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
  }
});
</script>

<style lang="scss">
</style>