import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

class Controller {
  static async sendMessage(req, res) {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    try {
      let conversation = await Conversation.findOne({
        patisipants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          patisipants: [senderId, receiverId],
        });
      }

      const newMessage = await new Message({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await conversation.save();
      await newMessage.save();

      res.status(201).json({ newMessage, message: "Message sent successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
}

export default Controller;
