import {promises as fs} from 'fs';
import {Message, MessageWithoutId} from "./types";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (err) {
      data = [];
    }
  },
  async getItems () {
    return data;
  },
  async addItem (item: MessageWithoutId) {
    const id = crypto.randomUUID();
    const datetime = (new Date()).toISOString();
    const message = {id, datetime, ...item};
    data.push(message);
    await this.save();

    return message;
  },
  async save () {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;