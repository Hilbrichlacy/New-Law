import React, { useState, useRef, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaRobot } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  createdAt: string;
}

interface ChatSession {
  id: string;
  messages: Message[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatSession?.messages]);

  const createChatSession = async () => {
    try {
      const response = await fetch('/api/chat/session', {
        method: 'POST',
      });
      const data = await response.json();
      setChatSession(data);
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };

  useEffect(() => {
    if (isOpen && !chatSession) {
      createChatSession();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !chatSession || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: inputText,
          chatSessionId: chatSession.id,
        }),
      });

      const { userMessage, botMessage } = await response.json();
      
      setChatSession(prev => ({
        ...prev!,
        messages: [...prev!.messages, userMessage, botMessage],
      }));
      
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 z-[9999]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          aria-label="Open chat"
        >
          <FaRobot className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-[350px] flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="w-6 h-6" />
              <h3 className="font-semibold">Aryawn</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <IoIosArrowUp className="w-6 h-6" /> : <IoIosArrowDown className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="h-[500px] flex-1 overflow-y-auto p-4 space-y-4">
                {chatSession?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors duration-300 disabled:opacity-50"
                    aria-label="Send message"
                    disabled={isLoading}
                  >
                    <IoMdSend className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot; 