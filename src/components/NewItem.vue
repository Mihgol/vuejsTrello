<template>
  <div>
    <form v-show="expanded">
      <div class="form-group">
        <small class="create text-muted" id="createItemInfo">Create new item</small>
        <input
          @keydown.enter="handleAddItem"
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
        >+</button>
      </div>
    </form>
    <button
      v-show="!expanded"
      class="btn btn-secondary mb-3 mt-3 float-right"
      @click="expanded = true"
    >+</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NewItem",
  props: {
    listId: String
  },
  data: () => ({
    title: "",
    expanded: false
  }),
  methods: {
    handleAddItem(): void {
      if (this.title) {
        this.$emit("itemAdded", {
          listId: this.listId,
          title: this.title,
          description: ""
        });
        this.title = "";
        this.expanded = false;
      }
    }
  }
});
</script>


<style lang="scss">
.create {
  padding-left: 1.5px;
}
</style>