<template>
  <div class="row">
    <List
      class="card ml-2"
      v-for="(list, listIndex) in lists"
      :list="list"
      :listIndex="listIndex"
      :key="list.id"
    >
      <NewItem @itemAdded="addItem" :listId="list.id" />
    </List>
    <List class="card bg-dark dark ml-2">
      <NewList class="bg-dark" @listAdded="addList" />
    </List>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "@/components/List.vue";
import NewList from "@/components/NewList.vue";
import NewItem from "@/components/NewItem.vue";
import { Data } from "../store/Data";
import { IAddItem } from "../store/index";

export default Vue.extend({
  name: "Board",
  data: () => ({}),
  components: {
    List,
    NewList,
    NewItem
  },
  computed: {
    lists(): Data.List[] {
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
  mounted() {}
});
</script>