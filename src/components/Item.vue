<template>
  <div
    :class="{item: true, active: editing}"
    ref="item"
    @mouseover="!editing ? active = true : active = false"
    @mouseleave="active = false"
  >
    <span class="title" v-if="!editing">{{item.title}}</span>
    <div v-show="active" @click="onEdit" class="edit nodrag">e</div>
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
.active {
  box-shadow: 2px 2px 2px rgb(37, 37, 37);
}
.item {
  background: #c7c7c7;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  border-right: 2px dotted #555555;
  padding: 0.5rem 0.6rem;
  margin: 0 0.25rem;
  margin-bottom: 0.25rem;
  position: relative;
  z-index: 0;
  display: flex;
  cursor: pointer;
  .title {
    font-size: 0.9rem;
    color: #2d2d2d;
    width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
  }
  .edit {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    right: 0.25rem;
    top: 0.25rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 550;
    color: #3b3b3b;
    text-align: center;
    border-radius: 3px;
    background-color: #7a7a7a;
  }

  .quick-edit {
    &:focus {
      outline: none;
    }
    background: transparent;
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    height: 10rem;
    overflow: hidden;
    overflow-wrap: anywhere;
    white-space: normal;
    width: 100%;
    box-shadow: none;
    border: none;
    resize: none;
  }
}
</style>