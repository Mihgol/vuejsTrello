<template>
  <div>
    <transition name="fade" mode="out-in">
      <button class="btn btn-primary btn-block" v-show="!expanded" @click="onExpand">New list</button>
    </transition>
    <transition name="fade" mode="in-out">
      <form class="newListForm" v-show="expanded">
        <div class="form-group">
          <input
            @keydown.enter="handleAddItem"
            @focusout="handleAddItem"
            ref="listName"
            v-model="title"
            class="form-control"
            type="text"
            id="createItem"
            aria-describedby="createItemInfo"
            placeholder="Enter title..."
          />
          <button
            @click.prevent="handleAddItem"
            type="submit"
            class="mt-1 btn btn-primary btn-block shadow"
          >Create</button>
        </div>
      </form>
    </transition>
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
      this.$emit("navbarExpanded");
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

<style lang="scss" scoped>
.fade-enter-active {
  transition: 0.5s;
}
.fade-leave-active {
  transition: opacity;
}
.fade-enter {
  transition-delay: 0.5s;
  opacity: 0;
}
.fade-leave-to {
  transition: 0s;
  opacity: 0;
}
.newListForm {
  position: fixed;
  width: 272px;
  z-index: 999;
}
</style>

