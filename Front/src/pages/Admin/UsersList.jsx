import { useEffect, useState } from "react";
import { Users, Mail, Loader2 } from "lucide-react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full text-white pt-8 pb-12">
      <main className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl shadow-lg shadow-brand-500/20">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              User Management
            </h1>
          </div>
          <p className="text-gray-400 mt-2 ml-14">View all registered members on the platform.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
            {error}
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-6 font-semibold text-gray-300">User ID</th>
                    <th className="p-6 font-semibold text-gray-300">Email Address</th>
                    <th className="p-6 font-semibold text-gray-300">Password (Hashed)</th>
                    <th className="p-6 font-semibold text-gray-300">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 text-gray-400 font-mono text-sm">{user._id}</td>
                      <td className="p-6 font-medium flex items-center gap-3">
                        <Mail className="w-4 h-4 text-brand-400" />
                        {user.email}
                      </td>
                      <td className="p-6">
                        <div className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-xs font-mono text-gray-500 overflow-hidden text-ellipsis max-w-[150px]" title="Encrypted Hash">
                          {user.password || 'N/A'}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/20">
                          Member
                        </span>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-gray-400">
                        No registered users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
