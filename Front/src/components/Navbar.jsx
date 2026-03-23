import { Link, useLocation } from "react-router-dom";
import { BookOpen, User, LogIn, Sparkles } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            StaxTech Blog
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-brand-400 ${location.pathname === '/' ? 'text-brand-400' : 'text-gray-300'}`}
          >
            Home
          </Link>
          <Link 
            to="/admin/blog" 
            className={`text-sm font-medium transition-colors hover:text-brand-400 flex items-center gap-2 ${location.pathname.includes('/admin/blog') ? 'text-brand-400' : 'text-gray-300'}`}
          >
            <BookOpen className="w-4 h-4" />
            Dashboard
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link 
            to="/blog/Login" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link 
            to="/blog/Login" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-sm font-medium text-white hover:opacity-90 transition-opacity shadow-lg shadow-brand-500/20"
          >
            <User className="w-4 h-4" />
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
