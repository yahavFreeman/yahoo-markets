<template>
  <div class="main-layout">
    <div class="app-header flex between">
      <h3 class="logo" @click="goHome">Markets Assignment</h3>
      <div class="side-bar flex">
        <p v-if="user" @click="logout">Log-out</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
};
</script>
