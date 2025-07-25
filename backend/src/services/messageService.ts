import { Message } from '../models/message';
import { MessageType } from '../types/message';

export const getMessages = async () => await Message.find().sort({ timestamp: 1 });
export const saveMessage = async (data: MessageType) => await new Message(data).save();
