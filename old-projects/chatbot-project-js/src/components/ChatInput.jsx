import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import loadingGIF from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    /*
    In React, we should not modify the data directly. 

    We should always create a copy, and then modify the copy
      1. Copy existing array (chatMessages) using ... (spread Operator) into function;
      2. Then modify this function (add a new chatMessage) to update (chatMessages) array
    */
    setIsLoading(true);
    if (isLoading || inputText === " ") {
      return;
    }
    
    setInputText('');
    
    const newChatMessages = [
      ...chatMessages, 
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: 'user', 
        time: dayjs().valueOf()
      }, 
    ];
    setChatMessages(newChatMessages); // State is updated

    const loadingImage = <img 
      src={loadingGIF}
      className="loading-image"  
    />

    setChatMessages([ 
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        message: loadingImage,
        sender: 'robot',
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
      
    setChatMessages([ 
      ...newChatMessages,
      { 
        id: crypto.randomUUID(),
        message: response,
        sender: 'robot'
      }
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem('messages', JSON.stringify([]));
  }

  function resetInput(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange={saveInputText}
        value={inputText} // change the text inside this <input>
        className="chat-input"
        onKeyDown={resetInput}
      />
      <button
        onClick={sendMessage}
        className="send-button" // class is reserved
      >Send</button>

      <button 
        className='clear-button'
        onClick={clearMessages}
      >Clear</button>
    </div>
  );
 }