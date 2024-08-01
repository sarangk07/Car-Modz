'use client';

import { useEffect, useRef, useState } from 'react';

const ChatRoom = ({ roomName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatSocketRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    
    chatSocketRef.current = chatSocket;

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      chatSocket.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (chatSocketRef.current && chatSocketRef.current.readyState === WebSocket.OPEN) {
      chatSocketRef.current.send(JSON.stringify({ message: input }));
      setInput('');
    } else {
      console.error('Chat socket is not open');
    }
  };

  return (
    <div>
      <h1>Room: {roomName}</h1>
      <div id="chat-log">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        className='text-stone-800'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
