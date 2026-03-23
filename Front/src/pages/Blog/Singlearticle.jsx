import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, Loader2, Sparkles } from "lucide-react";

export default function SingleArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/blogs/${articleId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/admin/blog");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete article");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center pt-24">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
        <p className="text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center pt-24">
        <p className="text-red-400 mb-4 text-xl font-bold">Error: {error || "Not Found"}</p>
        <Link to="/admin/blog" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">Return Dashboard</Link>
      </div>
    );
  }

  const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="w-full text-white pt-8 pb-12">
      <main className="max-w-4xl mx-auto px-6 w-full">
        {/* Header Section */}
        <div className="mb-12">
          <Link to="/admin/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
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
              <p className="font-bold text-gray-200">StaxTech Admin</p>
              <p className="text-sm text-gray-500">Author & Content Creator</p>
            </div>
            
            {/* Admin Actions */}
            <div className="ml-auto flex items-center gap-3">
              <Link 
                to={`/admin/blog/article-edit/${article._id}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-brand-400 hover:text-brand-300 transition-colors border border-white/5"
                title="Edit Article"
              >
                <Edit2 className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleDelete}
                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/10"
                title="Delete Article"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-invert prose-brand max-w-none text-gray-300 prose-lg">
          {article.content?.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>
      </main>
    </div>
  );
}
