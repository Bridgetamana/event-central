import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../../config/auth";
import { showToast } from "../../utils/toast";
import ButtonSpinner from "../../components/ui/ButtonSpinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateForm = () => {
    setEmailError("");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(email);
      showToast.success(result.message);
      navigate('/login');
    } catch (error) {
      showToast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Reset Password
          </h2>
          <p className="mt-2 text-zinc-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-600 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                emailError ? 'border-red-500' : 'border-zinc-300'
              } rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <ButtonSpinner /> : "Send Reset Link"}
          </button>

          <div className="text-center">
            <p className="text-sm text-zinc-600">
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;