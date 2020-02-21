<template>
  <nav class="navbar">
    <h1>
      <a href="https://github.com/Mihgol/vuejsTrello">#Not a todo list</a>
    </h1>

    <button class="btn" @click="onExpand" :disabled="expanded">New list</button>
    <Expand class="expand">
      <div v-show="expanded">
        <input
          ref="title"
          @focusout="addList"
          @keypress.enter.prevent="addList"
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
import Expand from "@/components/Expand.vue";
export default Vue.extend({
  name: "Navbar",
  components: {
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
@font-face {
  font-family: "Indie Flower";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local("Indie Flower"), local("IndieFlower"),
    url(https://fonts.gstatic.com/s/indieflower/v11/m8JVjfNVeKWVnh3QMuKkFcZVaUuH.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

$group-width: 272px;
$main-color: #69b83c;
$theme-color: #2d2d2d;

.navbar {
  background-color: $theme-color;
  h1 a {
    text-decoration: none;
    font-family: "Indie Flower";
    color: #999999;
    letter-spacing: 3px;
    text-align: center;
  }
}

.btn,
.list-title {
  border: none;
  display: block;
  font-size: 1rem;
}

.btn {
  color: $theme-color;
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
  .navbar h1 {
    text-align: center;
  }
  .btn,
  .list-title {
    width: 100%;
    padding: 0.7rem 1rem;
  }
}

@media only screen and (min-width: 480px) and (max-width: 991px) {
  .btn,
  .list-title {
    width: $group-width;
    padding: 0.5rem;
  }
  .navbar {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    h1 {
      order: 2;
      margin-left: 2rem;
    }
    .btn {
      order: 1;
    }
    .expand {
      order: 3;
    }
  }
}

@media only screen and (min-width: 992px) {
  .btn,
  .list-title {
    width: $group-width;
    padding: 0.5rem;
  }
  .navbar {
    display: flex;
    padding: 0.5rem;
    h1 {
      order: 2;
      margin-left: 2rem;
    }
    .btn {
      order: 1;
    }
    .expand {
      margin-left: 2rem;
      order: 3;
    }
  }
}
</style>