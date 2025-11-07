import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/VaniGo-Logo.png';
import { authService } from '../../services/authService';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.register(formData.name, formData.email, formData.password);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden py-12">
      
      <div className="absolute top-20 left-20 w-32 h-32 bg-vanigo-green opacity-10 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-green-400 opacity-15"></div>
      <div className="absolute top-1/2 right-10 w-20 h-20 bg-green-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-40 left-40 w-28 h-28 bg-vanigo-green opacity-10"></div>

      <div className="w-full max-w-md px-6 relative z-10">
        
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="VaniGo" className="h-32 mx-auto mb-4" />
          </Link>
          <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
            Create <span className="text-vanigo-green">Account</span>
          </h1>
          <p className="font-poppins text-gray-600">Join VaniGo today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 border-2 border-red-500 bg-red-50">
            <p className="font-poppins text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <span className="font-poppins text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-poppins font-semibold text-vanigo-green hover:underline">
              Sign In
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default RegisterPage;