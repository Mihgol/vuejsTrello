<template>
  <div ref="item" class="item" @mouseover="active = true" @mouseleave="active = false">
    <span class="title">{{item.title}}</span>
    <div v-show="active" class="edit nodrag">
      <div class="icon-container">
        <b-icon-pencil @click="onEdit" />
      </div>
    </div>
    <textarea
      class="quick-edit nodrag"
      v-show="editing"
      @click.stop
      @focusout="editing = false"
      @keypress.enter.prevent="editing = false"
      ref="title"
      v-model="item.title"
    ></textarea>
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
    active: false
  }),
  methods: {
    onEdit() {
      const item = this.$refs.item;
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

  .quick-edit {
    &:focus {
      font-weight: 600;
      outline: none;
    }
    border-style: none;
    border-color: Transparent;
    overflow: auto;
    box-shadow: none;
    resize: none;
    display: block;
    overflow: hidden;
    position: absolute;
    width: 256px;
    height: 56px;
    top: 4px;
    left: 4px;
    z-index: 11;
  }
}
</style>