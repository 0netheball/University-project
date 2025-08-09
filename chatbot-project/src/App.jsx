import { Chatbot } from 'supersimpledev';
import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';

export default function App() {
  useEffect(() => {
    Chatbot.addResponses({
      'How are you doing': 'I am fine', 
      'Do you love cats?': 'Yes! I love them!'
    });
  }, []);

  

  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || ([
    {
      id: 'id1',
      message: 'hello chatbot',
      sender: 'user',
      time: 1736127288920
    }, 
    {
      id: 'id2',
      message: 'Hello! How can I help you?', 
      sender: 'robot', 
      time: 1736127288920
    }, 
    {
      id: 'id3', 
      message: 'can you get me todays date?', 
      sender: 'user', 
      time: 1736127288920
    }, 
    {
      id: 'id4', 
      message: 'Today is September 27',
      sender: 'robot', 
      time: 1736127288920
    }
  ]));

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}


