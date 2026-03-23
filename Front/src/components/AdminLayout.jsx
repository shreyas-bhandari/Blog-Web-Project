import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, PlusCircle, Settings, LogOut, Sparkles, Users } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("blog_token");
    navigate("/blog/Login");
  };

  const token = localStorage.getItem('blog_token');
  let isAdmin = false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.email === "admin@gmail.com") {
      isAdmin = true;
    }
  } catch (e) {}

  const navLinks = [
    { name: "Dashboard", path: "/admin/blog", icon: <LayoutDashboard className="w-5 h-5" /> },
    ...(isAdmin ? [{ name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> }] : []),
    { name: "New Article", path: "/admin/blog/create", icon: <PlusCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex text-white font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 hidden md:flex flex-col border-r border-white/10 glass shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Admin Panel
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-inner"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Public Site</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-screen overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-purple-900/10 -z-10 pointer-events-none mix-blend-overlay"></div>
        {/* We render the active nested route here */}
        <Outlet />
      </main>
    </div>
  );
}
