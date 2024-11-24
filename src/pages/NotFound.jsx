import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
      <div
        className="max-w-2xl mx-auto text-center"
      >
        <h1 className="text-7xl lg:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="lg:text-lg text-zinc-600 mb-8 max-w-lg mx-auto">
          The page you&apos;re looking for seems to have wandered off.
          Let&apos;s help you find your way back!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            className="flex items-center justify-center px-6 py-3 rounded-lg border-2 border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-50 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          <button
            className="flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            <Link to="/">Return Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;