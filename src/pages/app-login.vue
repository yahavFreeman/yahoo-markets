<template>
  <div class="main-layout">
    <div class="home flex">
      <router-link v-if="loggedUser" to="/market">View Markets</router-link>
      <h3 v-else>Please Login First</h3>
      <!-- auth0 login -->
      <div>
        <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: null,
        password: null,
      },
      instance: null,
    };
  },
  methods: {
    // async signUp() {
    //   const user = this.user;
    //   await this.$store.dispatch({ type: "signUp", user });
    //   this.$router.push("/market");
    // },
    async login() {
      await this.$auth.loginWithPopup();
      const loginUser = this.$auth.user;
      this.$store.commit({ type: "setUser", loginUser });
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
  computed: {
    loggedUser() {
      //old login user
      return this.$store.getters.user;
    },
    setUser() {
      if (this.$auth.isAuthenticated) {
        this.$store.commit({ type: "setUser", loginUser });
      }
    },
  },
  components: {},
};
</script>
