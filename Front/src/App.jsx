import { Link } from "react-router-dom";
import { ArrowRight, Terminal, BookOpen, Code2 } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col pt-24">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto w-full">
        {/* Hero Section */}
        <div className="relative w-full py-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-500/30 text-brand-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <p className="px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 font-semibold text-sm inline-block shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Micro-Project
          </p></div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Elevate Your Voice with <br />
            <span className="text-gradient">Next-Gen Blogging</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A premium blogging platform designed for developers. Share your thoughts, learn from peers, and elevate your coding journey with stunning aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/admin/blog" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-dark-bg font-bold hover:bg-gray-200 transition-colors shadow-xl shadow-white/10"
            >
              Start Reading <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/admin/blog/create" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl glass border-white/20 hover:bg-white/10 transition-colors font-medium text-white"
            >
              <Terminal className="w-5 h-5" /> Create Post
            </Link>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">
          <div className="glass-card p-8 text-left">
            <div className="p-3 bg-brand-500/20 w-fit rounded-xl mb-4 text-brand-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Rich Articles</h3>
            <p className="text-gray-400 text-sm">Deep dive into technical topics with beautifully formatted markdown articles.</p>
          </div>
          
          <div className="glass-card p-8 text-left">
            <div className="p-3 bg-purple-500/20 w-fit rounded-xl mb-4 text-purple-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Modern Stack</h3>
            <p className="text-gray-400 text-sm">Built with React, Tailwind CSS v4, and Node.js for ultra-fast performance.</p>
          </div>

          <div className="glass-card p-8 text-left">
            <div className="p-3 bg-blue-500/20 w-fit rounded-xl mb-4 text-blue-400">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Developer First</h3>
            <p className="text-gray-400 text-sm">A distraction-free reading and writing experience tailored for software engineers.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
