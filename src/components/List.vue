<template>
  <div class="col">
    <h5 class="mt-1">{{ list.title }}</h5>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in list.items" :key="item.id">{{item.title}}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "List",
  props: {
    list: {
      type: Object,
      default: () => ({
        title: "Add new list"
      })
    },
    listIndex: Number
  }
});
</script>