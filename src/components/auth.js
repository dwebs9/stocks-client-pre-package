class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
    console.log("A user has logged in");
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
