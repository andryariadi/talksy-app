class Controller {
  static async sendMessage(req, res) {
    const { message } = req.body;
    const { id } = req.params;

    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
}

export default Controller;
