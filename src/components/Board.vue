<template>
  <div class="row">
    <Container
      drag-handle-selector=".handle"
      lock-axis="x"
      orientation="horizontal"
      @drop="listDropped"
    >
      <Draggable class="card ml-2 col" v-for="(list, listIndex) in lists" :key="listIndex">
        <div>
          <header class="mt-1 handle">
            <b-icon-list-check />
            <h5>{{ list.title }} {{ listIndex }}</h5>
          </header>
          <Container
            group-name="items"
            class="list-group"
            :get-child-payload="getChildPayload(listIndex)"
            @drop="event => itemDropped(event, listIndex)"
          >
            <Draggable
              class="list-group-item"
              v-for="(item, itemIndex) in list.items"
              :key="itemIndex"
            >{{item.title}}</Draggable>
          </Container>
          <NewItem @itemAdded="addItem" :listIndex="listIndex" />
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
import { IAddItem, IMoveItem } from "../store/index";

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