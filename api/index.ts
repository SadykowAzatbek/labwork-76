import express from 'express';
import cors from 'cors';
import messageRouter from "./routers/message";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messageRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`server started on ${port} port!`);
  });
};

void run();
