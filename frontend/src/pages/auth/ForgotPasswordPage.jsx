import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/VaniGo-Logo.png';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-20 left-20 w-32 h-32 bg-vanigo-green opacity-10 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-green-400 opacity-15"></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-green-300 opacity-10 rounded-full"></div>

      <div className="w-full max-w-md px-6 relative z-10">
        
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="VaniGo" className="h-32 mx-auto mb-4" />
          </Link>
          <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
            Forgot <span className="text-vanigo-green">Password</span>
          </h1>
          <p className="font-poppins text-gray-600">
            {sent ? 'Check your email for reset link' : 'Enter your email to reset password'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block font-poppins font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
              />
            </div>

            <button 
              type="submit"
              className="w-full px-6 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
              Send Reset Link
            </button>

            <div className="text-center">
              <Link to="/login" className="font-poppins text-vanigo-green hover:underline">
                Back to Sign In
              </Link>
            </div>

          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="p-6 border-2 border-vanigo-green bg-green-50">
              <p className="font-poppins text-gray-700">
                Password reset link has been sent to <strong>{email}</strong>
              </p>
            </div>
            <Link to="/login">
              <button className="w-full px-6 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
                Back to Sign In
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPasswordPage;