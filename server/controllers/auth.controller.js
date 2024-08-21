class Controller {
  static async singup(req, res) {
    res.send("singup");
  }

  static async login(req, res) {
    res.send("login");
  }

  static async logout(req, res) {
    res.send("logout");
  }
}

export default Controller;
