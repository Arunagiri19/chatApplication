import { useEffect, useState, useRef } from 'react';
import { socket } from '../socket';

interface Props {
  username: string;
}

const ChatWindow = ({ username }: Props) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.emit('join', username);

    socket.on('receiveMessage', (msg: string) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', `${username}: ${message}`);
      setMessages(prev => [...prev, `You: ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Chatting as: <span className="text-blue-500">{username}</span>
        </h2>

        <div className="h-64 overflow-y-auto border rounded p-2 mb-4 space-y-2">
          {messages.map((msg, idx) => {
            const isOwnMessage = msg.startsWith('You:');
            const displayMsg = isOwnMessage ? msg.replace('You:', username) : msg;
            const isUsernamePrefix = displayMsg.startsWith(`${username}:`);

            return (
              <div
                key={idx}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    isOwnMessage
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  {displayMsg}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
