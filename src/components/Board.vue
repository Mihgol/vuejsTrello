<template>
  <div class="container-fluid">
    <div class="row">
      <Container
        @drop="listDropped"
        drag-handle-selector=".handle"
        lock-axis="x"
        non-drag-area-selector=".nodrag"
        orientation="horizontal"
      >
        <Draggable class="list-wrapper" v-for="(list, listIndex) in lists" :key="listIndex">
          <div class="list">
            <header class="header">
              <b-icon-list-check class="menu handle" />
              <textarea
                class="name nodrag"
                @keypress.enter.prevent
                v-model="list.title"
                spellcheck="false"
              ></textarea>
            </header>
            <div class="items">
              <Container
                group-name="items"
                :get-child-payload="getChildPayload(listIndex)"
                @drop="event => itemDropped(event, listIndex)"
                non-drag-area-selector=".nodrag"
              >
                <Draggable class="item" v-for="(item, itemIndex) in list.items" :key="itemIndex">
                  <Item :item="item" />
                </Draggable>
              </Container>
              <NewItem draggable="false" @itemAdded="addItem" :listIndex="listIndex" />
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { Container, Draggable } from "vue-smooth-dnd";
import Vue from "vue";

import NewItem from "@/components/NewItem.vue";
import Item from "@/components/Item.vue";
import { Data } from "../store/Data";
import { IAddItem, IMoveItem } from "../store/index";

export default Vue.extend({
  name: "Board",
  data: () => ({
    showModal: false
  }),
  components: {
    Item,
    Container,
    Draggable,
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
    addItem({
      listIndex,
      itemIndex = null,
      title,
      description
    }: IAddItem): void {
      this.$store.commit("addItem", {
        listIndex,
        itemIndex,
        title,
        description
      });
    },
    listDropped(event: { removedIndex: number; addedIndex: number }) {
      this.$store.commit("moveList", {
        from: event.removedIndex,
        to: event.addedIndex
      });
    },
    getChildPayload(listIndex: number) {
      return (index: number) => {
        return {
          itemIndex: index,
          ...this.$store.state.lists[listIndex].items[index]
        };
      };
    },
    itemDropped(
      event: {
        addedIndex: number;
        removedIndex: number;
        payload: {
          itemIndex: string;
          title: string;
          description: string;
          date: Date;
        };
      },
      listIndex: number
    ) {
      console.log(event);
      const { itemIndex, title, description, date } = event.payload;

      if (event.addedIndex !== null) {
        this.$store.commit("addItem", {
          listIndex,
          itemIndex,
          title,
          description,
          date
        });
      }

      if (event.removedIndex !== null) {
        this.$store.commit("removeItem", { listIndex, itemIndex });
      }
    }
  },
  mounted() {}
});
</script>