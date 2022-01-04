import { storageService } from "./storage.service";

export const userService = {
  // login,
  signUp,
  getLoggedInUser,
  logout,
};
// const USER_KEY='userDB'
// const gUsers = [];
const LOGGED_USER_KEY = "logged-user";

// function login (user){
// users=storageService.loadFromStorage(USER_KEY)
// isUser=users.filter((loadedUser)=> loadedUser.userName === user.userName)
// if(isUser){
// }
// }

function signUp(user) {
  // gUsers.unshift(user)
  sessionStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
  return user;
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(LOGGED_USER_KEY) || "null");
}
function logout() {
  sessionStorage.removeItem(LOGGED_USER_KEY, null);
}
