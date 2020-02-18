<template>
  <div class="card">
    <div class="col">
      <h5 class="card-title mt-1">{{ list.title }}</h5>
      <ul class="list-group">
        <li class="list-group-item" v-for="item in list.items" :key="item.id">{{item.title}}</li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Item, List } from "../store/Data";
import { IAddItem } from "../store/index";

export default Vue.extend({
  name: "List",
  props: {
    list: Object,
    listIndex: Number
  }
});
</script>

<style lang="scss">
.card {
  max-width: 18rem;
  min-width: 18rem;
}
</style>