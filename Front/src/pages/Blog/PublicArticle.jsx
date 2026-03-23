import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Loader2, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PublicArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${articleId}`);
        if (!response.ok) throw new Error('Article not found');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center pt-24">
        <Navbar />
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
        <p className="text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center pt-24">
        <Navbar />
        <p className="text-red-400 mb-4 text-xl font-bold">Error: {error || "Not Found"}</p>
        <Link to="/" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">Return Home</Link>
      </div>
    );
  }

  const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-white pt-24">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-4 text-sm text-brand-400 font-medium mb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {date}</span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1.5 text-purple-400"><Clock className="w-4 h-4" /> 5 min read</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-200">StaxTech Authored</p>
              <p className="text-sm text-gray-500">Official Tech Blog</p>
            </div>
          </div>
        </div>

        <article className="prose prose-invert prose-brand max-w-none text-gray-300 prose-lg">
          {article.content?.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>
      </main>

      <Footer />
    </div>
  );
}
