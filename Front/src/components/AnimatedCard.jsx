import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Edit2 } from "lucide-react";

export default function AnimatedCard({ article, isAdmin }) {
  // Mock date if backend doesn't provide one
  const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="group relative w-full glass-card overflow-hidden hover:-translate-y-2 transition-transform duration-500">
      {/* Decorative gradient blob inside card */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl group-hover:bg-brand-400/30 transition-colors pointer-events-none"></div>
      
      <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
        <div className="flex items-center gap-3 text-sm text-brand-400 mb-4 font-medium">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-brand-300 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-400 line-clamp-3 mb-8 flex-grow">
          {article.content || "No abstract available. Click to read the full article."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <Link 
            to={isAdmin ? `/admin/blog/articles/${article._id}` : `/article/${article._id}`}
            className="group/btn flex items-center gap-2 text-white font-medium hover:text-brand-400 transition-colors"
          >
            Read Article 
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Link>

          {isAdmin && (
            <Link 
              to={`/admin/blog/article-edit/${article._id}`}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-brand-400 transition-colors"
              title="Edit Article"
            >
              <Edit2 className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
