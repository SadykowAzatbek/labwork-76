import {promises as fs} from 'fs';
import {Message, MessageWithoutId} from "./types";

const file = './db.json';
let data: Message[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(file);
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
    return fs.writeFile(file, JSON.stringify(data));
  },
};

export default fileDb;