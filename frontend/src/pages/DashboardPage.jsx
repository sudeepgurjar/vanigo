import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/VaniGo-Logo.png';

function DashboardPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'Project Planning Discussion',
      date: '2024-11-04',
      time: '10:30 AM',
      messageCount: 15,
      summary: 'Discussed project timeline and milestones'
    },
    {
      id: 2,
      title: 'AI Model Training Query',
      date: '2024-11-03',
      time: '02:15 PM',
      messageCount: 8,
      summary: 'Asked about training AI models with custom datasets'
    },
    {
      id: 3,
      title: 'Spring Boot Architecture',
      date: '2024-11-02',
      time: '04:45 PM',
      messageCount: 22,
      summary: 'Explored microservices architecture patterns'
    },
    {
      id: 4,
      title: 'React Performance Tips',
      date: '2024-11-01',
      time: '11:20 AM',
      messageCount: 12,
      summary: 'Optimizing React components for better performance'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">

      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-1 lg:px-2">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VaniGo" className="h-18" />
            </Link>
            <div className="flex gap-4">
              <Link to="/chat">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  New Chat
                </button>
              </Link>
              <Link to="/intelligence">
                <button className="px-6 py-2 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                  Intelligence
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-2 py-8 relative overflow-hidden">
        
        <div className="absolute top-10 left-10 w-24 h-24 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border-4 border-green-400 opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-18 h-18 bg-green-300 opacity-10 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-vanigo-green opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 border-4 border-green-500 opacity-15 rotate-12"></div>

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
              Conversation <span className="text-vanigo-green">Dashboard</span>
            </h1>
            <p className="font-poppins text-lg text-gray-600">
              View and manage all your past conversations
            </p>
          </div>

          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredConversations.length === 0 ? (
              <div className="col-span-2 text-center py-20">
                <p className="font-poppins text-xl text-gray-400">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <Link key={conv.id} to={`/conversation/${conv.id}`}>
                  <div className="p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-green-200 opacity-15 rotate-45"></div>
                    
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-montserrat text-xl font-bold text-gray-900">
                        {conv.title}
                      </h3>
                      <span className="px-3 py-1 bg-vanigo-green text-white font-poppins text-sm font-semibold">
                        {conv.messageCount} msgs
                      </span>
                    </div>

                    <p className="font-poppins text-gray-600 mb-4">
                      {conv.summary}
                    </p>

                    <div className="flex justify-between items-center text-sm font-poppins text-gray-500">
                      <span>{conv.date}</span>
                      <span>{conv.time}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

      </main>

    </div>
  );
}

export default DashboardPage;