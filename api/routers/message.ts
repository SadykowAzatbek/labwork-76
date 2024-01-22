import {Router} from 'express';
import {MessageWithoutId} from "../types";
import fileDb from "../fileDb";
const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  const limitedMessages = messages.slice(-30);
  res.send(limitedMessages);
});

messageRouter.get('/:id', async (req, res) => {
  const messages = await fileDb.getItems();
  const message = messages.find(p => p.id === req.params.id);

  if (!message) {
    res.send('Not found!');
  }

  res.send(message);
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