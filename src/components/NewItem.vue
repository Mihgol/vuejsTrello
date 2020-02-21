<template>
  <div class="new-item">
    <transition name="fade" mode="out-in">
      <div class="expanded" v-show="expanded">
        <textarea
          ref="title"
          @keypress.enter.prevent="onAdd"
          v-model="title"
          class="title"
          placeholder="Enter title"
        ></textarea>
        <button class="addItem" @click="onAdd">Add</button>
        <button class="cancelItem" @click="onCancel">Cancel</button>
      </div>
    </transition>
    <transition name="fade" mode="in-out">
      <div class="collapsed" v-show="!expanded">
        <a href="#" @click="onAddNewItem" class="trigger">
          <span class="big">+</span>
          Add new item
        </a>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NewItem",
  props: {
    listIndex: Number
  },
  data: () => ({
    title: "",
    expanded: false
  }),
  methods: {
    onAddNewItem() {
      this.expanded = true;
      this.$nextTick(() => {
        // @ts-ignore
        this.$refs.title.focus();
      });
    },
    onAdd(): void {
      if (this.title) {
        this.$emit("itemAdded", {
          listIndex: this.listIndex,
          title: this.title,
          description: ""
        });
      }
      this.onCancel();
    },
    onCancel(): void {
      this.expanded = false;
      this.title = "";
    }
  }
});
</script>


<style lang="scss">
.big {
  font-weight: bold;
}

.addItem,
.cancelItem {
  color: #8a8a8a;
  letter-spacing: 2px;
  width: 50%;
  font-weight: 550;
  background-color: #2c2c2c;
  float: left;
  border: none;
  display: block;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  &:hover {
    background: #4d4d4d;
    color: #181818;
    cursor: pointer;
  }
}

.new-item {
  .expanded .title {
    &:focus {
      outline: none;
    }
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0 0.25rem;
    margin-bottom: 0.25rem;
    overflow: hidden;
    overflow-wrap: anywhere;
    white-space: normal;
    width: 97%;
    box-shadow: none;
    padding: 0.5rem;
    border: none;
    resize: none;
    z-index: 0;
  }
  .collapsed .trigger {
    user-select: none;
    display: block;
    padding: 0.5rem;
    text-align: right;
    text-decoration: none;
    color: #2d2d2d;
    &:hover {
      cursor: pointer;
      background-color: #1f1f1f;
      color: #8a8a8a;
    }
  }
}
</style>