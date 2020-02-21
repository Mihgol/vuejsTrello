<template>
  <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Expand",
  methods: {
    afterEnter(element) {
      element.style.height = "auto";
    },
    leave(element) {
      const height = getComputedStyle(element).height;

      element.style.height = height;
      setTimeout(() => {
        element.style.height = 0;
      });
    },
    enter(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.poition = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      getComputedStyle(element).height;
      setTimeout(() => {
        element.style.height = height;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
<style lang="scss">
.expand-enter-active,
.expand-leave-active {
  transition: height 0.7s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>