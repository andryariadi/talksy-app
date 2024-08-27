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

      Promise.all([conversation.save(), newMessage.save()]);

      res.status(201).json({ newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }

  static async getMessages(req, res) {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log(userToChatId, senderId);

    try {
      const conversation = await Conversation.findOne({
        patisipants: { $all: [senderId, userToChatId] },
      }).populate("messages");

      if (!conversation) return res.status(200).json([]);

      const messages = conversation.messages;

      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
}

export default Controller;
