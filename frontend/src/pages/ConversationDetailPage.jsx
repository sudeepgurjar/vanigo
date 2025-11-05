import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/VaniGo-Logo.png';

function ConversationDetailPage() {
  const { id } = useParams();

  const [conversation] = useState({
    id: id,
    title: 'Project Planning Discussion',
    date: '2024-11-04',
    startTime: '10:30 AM',
    endTime: '11:15 AM',
    duration: '45 minutes',
    summary: 'Discussed project timeline, milestones, and team responsibilities for the upcoming quarter.',
    messages: [
      {
        id: 1,
        text: 'Can you help me plan my project timeline?',
        sender: 'user',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        text: 'Of course! I can help you create a structured project timeline. What is your project about?',
        sender: 'ai',
        timestamp: '10:30 AM'
      },
      {
        id: 3,
        text: 'I am building an AI-powered chat application with Spring Boot and React.',
        sender: 'user',
        timestamp: '10:31 AM'
      },
      {
        id: 4,
        text: 'Great! Here is a suggested timeline: Week 1-2: Backend setup, Week 3-4: Frontend development, Week 5-6: Integration and testing.',
        sender: 'ai',
        timestamp: '10:32 AM'
      },
      {
        id: 5,
        text: 'What about deployment?',
        sender: 'user',
        timestamp: '10:35 AM'
      },
      {
        id: 6,
        text: 'Week 7: Deploy backend to AWS, Week 8: Deploy frontend to Vercel, final testing in production.',
        sender: 'ai',
        timestamp: '10:36 AM'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-white">

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
              <Link to="/chat">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  New Chat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 relative overflow-hidden">
        
        <div className="absolute top-10 right-10 w-24 h-24 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 border-4 border-green-400 opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-18 h-18 bg-green-300 opacity-10 rounded-full"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <Link to="/dashboard" className="font-poppins text-vanigo-green hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-4">
              {conversation.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 font-poppins text-gray-600 mb-6">
              <div>
                <span className="font-semibold">Date:</span> {conversation.date}
              </div>
              <div>
                <span className="font-semibold">Time:</span> {conversation.startTime} - {conversation.endTime}
              </div>
              <div>
                <span className="font-semibold">Duration:</span> {conversation.duration}
              </div>
              <div>
                <span className="font-semibold">Messages:</span> {conversation.messages.length}
              </div>
            </div>

            <div className="p-6 border-2 border-gray-200 bg-green-50 mb-8">
              <h3 className="font-montserrat text-xl font-bold mb-2">Summary</h3>
              <p className="font-poppins text-gray-700">{conversation.summary}</p>
            </div>
          </div>

          <div className="border-2 border-gray-200 p-6">
            <h2 className="font-montserrat text-2xl font-bold mb-6">Conversation History</h2>
            
            <div className="space-y-4">
              {conversation.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl px-4 py-3 border-2 ${msg.sender === 'user' ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
                    <p className="font-poppins">{msg.text}</p>
                    <span className={`text-xs font-poppins mt-1 block ${msg.sender === 'user' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}

export default ConversationDetailPage;