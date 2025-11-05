import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/VaniGo-Logo.png';

function ChatPage() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: 'This is a demo response. Backend integration coming soon!',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);

  };

  const handleStartConversation = () => {
    setConversationStarted(true);
  };

  const handleEndConversation = () => {
    if (window.confirm('End this conversation?')) {
      setConversationStarted(false);
      setMessages([]);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-1 lg:px-2">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VaniGo" className="h-18" />
            </Link>
            <div className="flex gap-4">
              <Link to="/dashboard">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  Dashboard
                </button>
              </Link>
              <Link to="/">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex  flex-col relative overflow-hidden">
        
        <div className="absolute top-10 left-10 w-20 h-20 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-4 border-green-400 opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-18 h-18 bg-green-300 opacity-10 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-vanigo-green opacity-10"></div>

        {!conversationStarted ? (
          <div className="flex-1 flex items-center justify-center relative z-10">
            <div className="text-center">
              <h1 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">
                Start a New <span className="text-vanigo-green">Conversation</span>
              </h1>
              <p className="font-poppins text-xl text-gray-600 mb-8">
                Chat with AI and get intelligent responses instantly
              </p>
              <button 
                onClick={handleStartConversation}
                className="px-10 py-4 border-2 border-black font-poppins font-semibold text-xl text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                Start Conversation
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="font-montserrat text-2xl font-bold">Active Conversation</h2>
              <button 
                onClick={handleEndConversation}
                className="px-6 py-2 border-2 border-red-500 font-poppins font-semibold text-red-500 hover:shadow-2xl hover:bg-red-500 hover:text-white transition-all duration-300">
                End Conversation
              </button>
            </div>

            <div className="flex-1 border-2 border-gray-200 rounded-none p-6 mb-4 overflow-y-auto relative z-10 bg-white">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="font-poppins text-gray-400 text-lg">No messages yet. Start chatting!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md px-4 py-3 border-2 ${msg.sender === 'user' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
                        <p className="font-poppins">{msg.text}</p>
                        <span className={`text-xs font-poppins mt-1 block ${msg.sender === 'user' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-md px-4 py-3 border-2 border-gray-300 bg-white">
                        <p className="font-poppins text-gray-500">AI is typing...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4 relative z-10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 font-poppins hover:shadow-xl focus:outline-none focus:border-vanigo-green transition-all duration-300"
              />
              <button 
                onClick={handleSend}
                className="px-8 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                Send
              </button>
            </div>
          </>
        )}

      </main>

    </div>
  );
}

export default ChatPage;