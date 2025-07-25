// src/App.tsx
import { useState } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatWindow from './components/ChatWindow';

function App() {
  const [username, setUsername] = useState('');

  return username ? (
    <ChatWindow username={username} />
  ) : (
    <UsernameForm onSetUsername={setUsername} />
  );
}

export default App;
