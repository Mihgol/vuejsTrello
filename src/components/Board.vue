<template>
  <div class="row">
    <Container drag-handle-selector=".handle" lock-axis="x" orientation="horizontal">
      <Draggable class="card ml-2 col" v-for="(list, listIndex) in lists" :key="list.id">
        <div>
          <header class="mt-1 handle">
            <b-icon-list-check />
            <h5>{{ list.title }} {{ listIndex }}</h5>
          </header>
          <Container group-name="items" class="list-group">
            <Draggable
              class="list-group-item"
              v-for="item in list.items"
              :key="item.id"
            >{{item.title}}</Draggable>
          </Container>
          <NewItem @itemAdded="addItem" :listId="list.id" />
        </div>
      </Draggable>
    </Container>
    <NewList class="bg-dark" @listAdded="addList" />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { Container, Draggable } from "vue-smooth-dnd";
import Vue from "vue";
import NewList from "@/components/NewList.vue";
import NewItem from "@/components/NewItem.vue";
import { Data } from "../store/Data";
import { IAddItem } from "../store/index";

export default Vue.extend({
  name: "Board",
  data: () => ({}),
  components: {
    Container,
    Draggable,
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