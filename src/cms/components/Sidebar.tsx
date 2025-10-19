import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";

const CMSSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6 flex flex-col fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-indigo-400">CMS Panel</h1>
        <p className="text-sm text-gray-400">Portfolio Manager</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className: "bg-indigo-600 hover:bg-indigo-700"
          }}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        
        <Link
          to="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className: "bg-indigo-600 hover:bg-indigo-700"
          }}
        >
          <FolderKanban size={20} />
          <span>Projects</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full text-left"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CMSSideBar;

