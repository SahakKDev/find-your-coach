<template>
  <TheHeader />
  <router-view v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch('tryLogin');
  },

  computed: {
    didLogout() {
      return this.$store.getters.didLogout;
    },
  },
  watch: {
    didLogout(value, oldValue) {
      if (value && value !== oldValue) {
        this.$router.replace('/');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route.enter-to,
.doalog-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
