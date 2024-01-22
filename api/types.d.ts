export interface Message {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

export type MessageWithoutId = Omit<Message, 'id', 'datetime'>;