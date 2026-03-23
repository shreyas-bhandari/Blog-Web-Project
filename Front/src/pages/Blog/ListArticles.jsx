import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, LayoutGrid, Search, Loader2 } from "lucide-react";
import AnimatedCard from "../../components/AnimatedCard";

export default function ListArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/blogs/");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="w-full text-white pt-8 pb-12">
      <main className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">Manage and oversee all published articles.</p>
          </div>
          
          <div className="flex w-full md:w-auto items-center gap-4">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            
            <Link
              to="/admin/blog/create"
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-brand-500/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Post</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-brand-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Loading articles...</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <AnimatedCard key={article._id} article={article} isAdmin={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 glass border border-white/5 rounded-3xl">
            <div className="p-4 bg-white/5 rounded-full mb-6 text-gray-500">
              <LayoutGrid className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Articles Found</h3>
            <p className="text-gray-400 text-center max-w-sm mb-8">
              It looks like you haven't published any articles yet. Start sharing your knowledge!
            </p>
            <Link
              to="/admin/blog/create"
              className="flex items-center gap-2 px-6 py-3 bg-white text-dark-bg hover:bg-gray-200 font-bold rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create First Post
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
