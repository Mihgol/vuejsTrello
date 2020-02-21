<template>
  <nav class="navbar">
    <button class="btn" @click="onExpand" :disabled="expanded">New list</button>
    <Expand>
      <div v-show="expanded">
        <input
          ref="title"
          @focusout="addList"
          type="text"
          v-model="title"
          class="list-title"
          placeholder="List title"
        />
        <transition name="fade" mode="in-out">
          <button v-if="!title" class="btn-submit cancel">Cancel</button>
        </transition>
        <transition name="fade" mode="out-in">
          <button v-if="title" class="btn-submit add">Add</button>
        </transition>
      </div>
    </Expand>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import NewList from "@/components/NewList.vue";
import Expand from "@/components/Expand.vue";
export default Vue.extend({
  name: "Navbar",
  components: {
    NewList,
    Expand
  },
  data() {
    return {
      expanded: false,
      title: "",
      submit: "Submit",
      cancel: "Cancel"
    };
  },
  computed: {
    buttonText() {
      if (this.title) return "Ok";
      return "Cancel";
    }
  },
  methods: {
    onExpand(): void {
      this.expanded = true;
      this.$nextTick(() => {
        // @ts-ignore
        this.$refs.title.focus();
      });
    },
    addList(): void {
      if (this.title) {
        this.$store.commit("addList", { title: this.title });
      }
      this.title = "";
      this.expanded = false;
    }
  }
});
</script>


<style lang="scss">
$group-width: 272px;
$main-color: #69b83c;
.navbar {
  background-color: #2d2d2d;
}

.btn,
.list-title {
  border: none;
  display: block;
  font-size: 1rem;
}

.btn {
  color: #2d2d2d;
  letter-spacing: 2px;
  font-weight: 550;
  background-color: $main-color;
  display: block;
}

.btn-submit {
  display: block;
  border: none;
  position: absolute;
  height: 100%;
  width: 20%;
  top: 0;
  right: 0;
  color: #2d2d2d;
  background-color: $main-color;
}

.list-title {
  background: #ffffff;
  color: #2d2d2d;
  &:focus {
    outline: none;
  }
}

@media only screen and (min-width: 320px) and (max-width: 479px) {
  .navbar {
    width: 100%;
  }
  .btn,
  .list-title {
    width: 100%;
    padding: 0.7rem 1rem;
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
}

@media only screen and (min-width: 992px) {
  .btn,
  .list-title {
    width: $group-width;
  }
  .navbar {
    padding: 0.5rem;
  }
}
</style>