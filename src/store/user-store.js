import { userService } from "../services/user.service.js";
export const userStore = {
  state: {
    user: userService.getLoggedInUser() || null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, { loginUser }) {
      state.user = loginUser;
    },
  },
  actions: {
    signUp({ commit }, { user }) {
      var loginUser = userService.signUp(user);
      commit({ type: "setUser", loginUser });
    },
    logOut({ commit }) {
      userService.logout();
      var loginUser = null;
      commit({ type: "setUser", loginUser });
    },
  },
};
