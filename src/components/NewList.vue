<template>
  <div>
    <button class="mt-1 btn btn-primary btn-block" v-show="!expanded" @click="onExpand">New list</button>
    <form class="newListForm" v-show="expanded">
      <div class="form-group">
        <small class="create text-muted" id="createItemInfo">Create new list</small>
        <input
          @keydown.enter="handleAddItem"
          @focusout="handleAddItem"
          ref="listName"
          v-model="title"
          class="form-control"
          type="text"
          id="createItem"
          aria-describedby="createItemInfo"
          placeholder="Enter title"
        />
        <button
          @click.prevent="handleAddItem"
          type="submit"
          class="mt-1 btn btn-primary btn-block"
          :disabled="title.length === 0"
        >Create</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NewList",
  props: {
    listId: String
  },
  data: () => ({
    title: "",
    expanded: false
  }),
  methods: {
    onExpand() {
      this.expanded = true;
      this.$nextTick(() => {
        // @ts-ignore
        this.$refs.listName.focus();
      });
    },
    handleAddItem(): void {
      if (this.title) {
        this.$emit("listAdded", {
          title: this.title
        });
        this.title = "";
      }
      this.expanded = false;
    }
  }
});
</script>

