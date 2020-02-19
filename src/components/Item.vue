<template>
  <div ref="item" class="item" @mouseover="active = true" @mouseleave="active = false">
    <span class="title">{{item.title}}</span>
    <div v-show="active" class="edit nodrag">
      <div class="icon-container">
        <b-icon-pencil @click="onEdit" />
      </div>
    </div>
    <div class="edit-background" v-if="editing" @click="editing = false">
      <textarea
        @click.stop
        @keypress.enter.prevent="editing = false"
        :style="{top: `${y}px`, left: `${x}px`}"
        class="quick-edit"
        ref="title"
        v-model="item.title"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Item",
  props: {
    item: Object
  },
  data: () => ({
    editing: false,
    active: false,
    x: 0,
    y: 0
  }),
  methods: {
    onEdit() {
      const item = this.$refs.item;
      const bodyRect = document.body.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      this.y = itemRect.top - bodyRect.top;
      this.x = itemRect.left - bodyRect.left;
      this.editing = true;
      this.$nextTick(() => {
        const title = this.$refs.title;
        // @ts-ignore
        title.focus();
      });
    }
  }
});
</script>


<style lang="scss">
.item {
  background: #ffffff;
  box-shadow: 0 1px 0 rgba($color: #5d5d5d, $alpha: 0.25);
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
  z-index: 0;
  display: flex;
  cursor: pointer;
  .title {
    user-select: none;
    clear: both;
    display: block;
    margin: 0 0 4px;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
    word-wrap: break-word;
  }
  .edit {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 1px;
    top: 1px;
    text-align: center;
    &:hover {
      border-radius: 3px;
      background-color: rgba($color: #5d5d5d, $alpha: 0.25);
    }
  }

  .edit-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.5);
    .quick-edit {
      resize: none;
      display: block;
      overflow: hidden;
      position: fixed;
      width: 256px;
      height: 56px;
      z-index: 11;
    }
  }
}
</style>