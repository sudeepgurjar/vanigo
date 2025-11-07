import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/VaniGo-Logo.png';
import { authService } from '../../services/authService';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
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
      await authService.resetPassword(token, formData.password);
      alert('Password reset successful!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-20 left-20 w-32 h-32 bg-vanigo-green opacity-10 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-green-400 opacity-15"></div>

      <div className="w-full max-w-md px-6 relative z-10">
        
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="VaniGo" className="h-32 mx-auto mb-4" />
          </Link>
          <h1 className="font-montserrat text-4xl font-bold text-gray-900 mb-2">
            Reset <span className="text-vanigo-green">Password</span>
          </h1>
          <p className="font-poppins text-gray-600">Enter your new password</p>
        </div>

        {error && (
          <div className="mb-4 p-3 border-2 border-red-500 bg-red-50">
            <p className="font-poppins text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border-2 border-gray-300 font-poppins focus:outline-none focus:border-vanigo-green transition-all duration-300"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 border-2 border-black font-poppins font-semibold text-black hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPasswordPage;