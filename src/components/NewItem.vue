<template>
  <div class="new-item">
    <div class="expanded" v-show="expanded">
      <textarea
        ref="title"
        @keypress.enter.prevent="onAdd"
        @focusout="onAdd"
        v-model="title"
        class="title"
        placeholder="Enter item's title"
      ></textarea>
      <div class="btn-group d-flex">
        <button class="btn btn-success" @click="onAdd">Add</button>
        <button class="btn btn-danger" @click="onCancel">Cancel</button>
      </div>
    </div>
    <div class="collapsed" v-show="!expanded">
      <a href="#" @click="onAddNewItem" class="trigger">
        <b-icon-plus />
        <span>Add new item</span>
      </a>
    </div>
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
.new-item {
  .expanded {
    margin: 8px 0;
  }
  .expanded .title {
    resize: none;
    width: 100%;
    height: 54px;
    display: block;
    border-radius: 3px;
    margin-bottom: 8px;
  }
  .collapsed .trigger {
    user-select: none;
    border-radius: 3px;
    display: block;
    flex: 1 0 auto;
    padding: 4px 12px;
    margin: 8px 0;
    text-decoration: none;
    color: #2d2d2d;
    &:hover {
      cursor: pointer;
      background-color: #a7a7a7;
      color: #ffffff;
    }
  }
}
</style>