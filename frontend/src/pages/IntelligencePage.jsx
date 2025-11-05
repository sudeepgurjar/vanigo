import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/VaniGo-Logo.png';

function IntelligencePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsSearching(true);

    setTimeout(() => {
      setResults({
        answer: 'Based on your past conversations, you discussed project planning on November 4th where you covered timeline creation, milestone setting, and deployment strategies for your AI chat application.',
        relevantConversations: [
          {
            id: 1,
            title: 'Project Planning Discussion',
            date: '2024-11-04',
            excerpt: 'Discussed project timeline, milestones, and team responsibilities...',
            relevance: 95
          },
          {
            id: 3,
            title: 'Spring Boot Architecture',
            date: '2024-11-02',
            excerpt: 'Explored microservices architecture patterns and best practices...',
            relevance: 78
          }
        ],
        insights: [
          'You have 4 conversations about software development',
          'Most discussed topic: AI and Machine Learning',
          'Average conversation length: 15 messages'
        ]
      });
      setIsSearching(false);
    }, 2000);
  };

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

      <main className="max-w-6xl mx-auto px-4 py-8 relative overflow-hidden">
        
        <div className="absolute top-10 left-10 w-24 h-24 bg-vanigo-green opacity-10 rotate-45"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border-4 border-green-400 opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-18 h-18 bg-green-300 opacity-10 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-vanigo-green opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 border-4 border-green-500 opacity-15 rotate-12"></div>

        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Conversation <span className="text-vanigo-green">Intelligence</span>
            </h1>
            <p className="font-poppins text-lg text-gray-600">
              Ask questions about your past conversations and get intelligent insights
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask anything about your conversations..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="px-8 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="font-poppins text-sm text-gray-500">Try asking:</span>
              <button onClick={() => setQuery('What did I discuss about AI?')} className="px-3 py-1 border border-gray-300 font-poppins text-sm text-gray-600 hover:border-vanigo-green hover:text-vanigo-green transition-all duration-300">
                What did I discuss about AI?
              </button>
              <button onClick={() => setQuery('Show me conversations from last week')} className="px-3 py-1 border border-gray-300 font-poppins text-sm text-gray-600 hover:border-vanigo-green hover:text-vanigo-green transition-all duration-300">
                Show conversations from last week
              </button>
              <button onClick={() => setQuery('Summarize my project planning talks')} className="px-3 py-1 border border-gray-300 font-poppins text-sm text-gray-600 hover:border-vanigo-green hover:text-vanigo-green transition-all duration-300">
                Summarize project planning
              </button>
            </div>
          </div>

          {results && (
            <div className="space-y-6">
              
              <div className="p-6 border-2 border-vanigo-green bg-green-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 opacity-20 rotate-45"></div>
                <h2 className="font-montserrat text-2xl font-bold mb-4">AI Answer</h2>
                <p className="font-poppins text-gray-800 text-lg">{results.answer}</p>
              </div>

              <div>
                <h2 className="font-montserrat text-2xl font-bold mb-4">Relevant Conversations</h2>
                <div className="space-y-4">
                  {results.relevantConversations.map((conv) => (
                    <Link key={conv.id} to={`/conversation/${conv.id}`}>
                      <div className="p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-green-300 opacity-15"></div>
                        
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-montserrat text-xl font-bold text-gray-900">
                            {conv.title}
                          </h3>
                          <span className="px-3 py-1 bg-vanigo-green text-white font-poppins text-sm font-semibold">
                            {conv.relevance}% match
                          </span>
                        </div>

                        <p className="font-poppins text-gray-600 mb-2">
                          {conv.excerpt}
                        </p>

                        <span className="font-poppins text-sm text-gray-500">{conv.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-6 border-2 border-gray-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-14 h-14 bg-green-200 opacity-15 rounded-full"></div>
                <h2 className="font-montserrat text-2xl font-bold mb-4">Key Insights</h2>
                <ul className="space-y-2">
                  {results.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-vanigo-green mt-2"></div>
                      <span className="font-poppins text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {!results && !isSearching && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-100 mx-auto mb-6 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-vanigo-green"></div>
              </div>
              <p className="font-poppins text-xl text-gray-400">
                Search your conversation history to get started
              </p>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default IntelligencePage;