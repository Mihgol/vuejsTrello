<template>
  <main class="board">
    <div class="row mt-2">
      <Container
        @drop="listDropped"
        drag-handle-selector=".handle"
        non-drag-area-selector=".nodrag"
        orientation="horizontal"
      >
        <Draggable v-for="(list, listIndex) in lists" :key="listIndex">
          <div class="list-wrapper">
            <div class="list">
              <header class="header">
                <transition name="fade" mode="in-out">
                  <textarea
                    ref="name"
                    class="name nodrag"
                    @keypress.enter.prevent
                    v-model="list.title"
                    spellcheck="false"
                  ></textarea>
                </transition>
                <div class="handle" @dblclick="removeList(listIndex)">☰</div>
              </header>
              <div class="items">
                <div v-if="list.items.length < 1" class="placeholder nodrag">
                  <span>Empty...</span>
                </div>
                <Container
                  group-name="items"
                  :get-child-payload="getChildPayload(listIndex)"
                  @drop="event => itemDropped(event, listIndex)"
                  non-drag-area-selector=".nodrag"
                >
                  <Draggable v-for="(item, itemIndex) in list.items" :key="itemIndex">
                    <Item :item="item" />
                  </Draggable>
                </Container>
                <NewItem @itemAdded="addItem" :listIndex="listIndex" />
              </div>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </main>
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
    showModal: false,
    editingTitle: false,
    listMenu: false
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
    removeList(listIndex: number) {
      this.$store.commit("removeList", listIndex);
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
      const { itemIndex, title, description, date } = event.payload;

      if (event.removedIndex !== null) {
        this.$store.commit("removeItem", { listIndex, itemIndex });
      }

      if (event.addedIndex !== null) {
        this.$store.commit("addItem", {
          listIndex,
          itemIndex: event.addedIndex,
          title,
          description,
          date
        });
      }
    },
    editListName(element: any) {
      this.editingTitle = true;
      this.$nextTick(() => {
        element.focus();
      });
    }
  },
  mounted() {
    this.$store.commit("sample");
  }
});
</script>

<style lang="scss" scoped>
.board {
  padding-top: 0.5rem;
  background-color: #979797;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
}

.list-wrapper {
  width: 272px;
  margin-left: 0.5rem;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  height: 100%;
  white-space: nowrap;
  &:first-of-type {
    margin-left: 0.5rem;
  }
}

.list {
  overflow: hidden;
  overflow-y: auto;
  background: #555555;

  .header {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .handle {
    user-select: none;
    color: #2c2c2c;
    cursor: grab;
    padding-right: 0.3rem;
    text-align: right;
    height: auto;
    flex: 1;
  }
  .header .title {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0.5rem 0.4rem;
    font-weight: 550;
  }
  .name {
    &:focus {
      outline: none;
    }
    height: 2rem;
    font-size: 0.9rem;
    color: #222222;
    padding: 0.5rem;
    background: transparent;
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    overflow: hidden;
    overflow-wrap: anywhere;
    white-space: normal;
    width: 80%;
    box-shadow: none;
    border: none;
    resize: none;
  }
  .items .placeholder {
    position: absolute;
    margin-left: 0.5rem;
    font-family: "Indie Flower";
    display: block;
    color: #757575;
    z-index: 0;
    span {
      text-align: center;
      width: 100%;
    }
  }
}
</style>