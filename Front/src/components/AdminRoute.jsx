import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const token = localStorage.getItem('blog_token');

  if (!token) {
    return <Navigate to="/blog/Login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check for explicit admin rights restricted to the specific user admin@gmail.com
    if (payload.email !== "admin@gmail.com") {
      return (
        <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
           
           <div className="glass-card p-12 text-center max-w-lg z-10 border-red-500/20 shadow-2xl shadow-red-500/10">
             <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
               <span className="text-3xl">🔒</span>
             </div>
             <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">Restricted Route</h1>
             <p className="text-gray-400 mb-8 leading-relaxed">
               The user accounts directory is restricted. Your account (<span className="text-white font-mono">{payload.email}</span>) does not have the authority to manage other users. Only the Chief Administrator can access this view.
             </p>
             <a href="/admin/blog" className="inline-block px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl transition-all font-bold shadow-lg shadow-red-500/25 blur-0">
               Return to Dashboard
             </a>
           </div>
        </div>
      );
    }
  } catch (error) {
    return <Navigate to="/blog/Login" replace />;
  }

  // If the payload explicitly defines admin@gmail.com, grant access
  return <Outlet />;
}
