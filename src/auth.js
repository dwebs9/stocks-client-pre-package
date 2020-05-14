import Nav from "./Nav";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
    console.log("A user has logged in");
    // call back
    // cb();
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
