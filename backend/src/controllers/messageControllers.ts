import { Request, Response } from 'express';
import { getMessages, saveMessage } from '../services/messageService';

export const fetchMessages = async (_req: Request, res: Response) => {
  const messages = await getMessages();
  res.json(messages);
};

export const postMessage = async (req: Request, res: Response) => {
  const { sender, content } = req.body;
  const message = await saveMessage({ sender, content });
  res.status(201).json(message);
};