import {Router} from 'express';
import {MessageWithoutId} from "../types";
import fileDb from "../fileDb";
const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();

  const queryDate = req.query.datetime as string;

  if (queryDate) {
    const date = new Date(queryDate);
    if (isNaN(date.getDate())) {
      return res.status(400).send({error: 'Неверный формат даты!1'});
    }

    const filteredMessages = messages.filter(message => new Date(message.datetime) > date);
    res.send(filteredMessages);
  } else {
    const limitedMessages = messages.slice(-30);
    res.send(limitedMessages);
  }
});

messageRouter.post('/', async (req, res, next) => {
  try {
    const message: MessageWithoutId = {
      message: req.body.message,
      author: req.body.author,
    };

    if (!message.message || !message.author) {
      return res.status(422).send({error: 'Author or message must be present'});
    }

    const addMessage = await fileDb.addItem(message);
    res.send(addMessage);

  } catch (err) {
    next(err);
  }

});

export default messageRouter;