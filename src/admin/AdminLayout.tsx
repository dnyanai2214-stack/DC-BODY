import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  FileText, 
  DollarSign, 
  ShoppingBag, 
  Settings, 
  Inbox, 
  Lightbulb, 
  Users, 
  Image as ImageIcon, 
  Activity, 
  LogOut, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { currentUser, logout, isSuperAdmin, isDemoAdmin } = useAuth();
  const { inbox, suggestions } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadMessages = inbox.filter(m => !m.read).length;
  const pendingSuggestions = suggestions.filter(s => s.status === 'pending').length;

  const menuItems = [
    { id: 'dashboard', label: 'डॅशबोर्ड (Dashboard)', icon: LayoutDashboard, path: '/admin' },
    { id: 'entries', label: 'नोंदी व्यवस्थापक (Entries)', icon: BookOpen, path: '/admin/entries' },
    { id: 'categories', label: 'अवयव व प्रकार (Categories)', icon: Layers, path: '/admin/categories' },
    { id: 'blog', label: 'ब्लॉग लेख (Blog Posts)', icon: FileText, path: '/admin/blog' },
    { id: 'pages', label: 'पाने (Pages)', icon: FileText, path: '/admin/pages' },
    { id: 'ads', label: 'जाहिरात व्यवस्थापक (Ads)', icon: DollarSign, path: '/admin/ads' },
    { id: 'affiliates', label: 'अ‍ॅफिलिएट ब्लॉक्स (Affiliates)', icon: ShoppingBag, path: '/admin/affiliates' },
    { 
      id: 'inbox', 
      label: 'इनबॉक्स (Inbox)', 
      icon: Inbox, 
      path: '/admin/inbox',
      badge: unreadMessages > 0 ? unreadMessages : undefined 
    },
    { 
      id: 'suggestions', 
      label: 'सुझाव (Suggestions)', 
      icon: Lightbulb, 
      path: '/admin/suggestions',
      badge: pendingSuggestions > 0 ? pendingSuggestions : undefined 
    },
    { id: 'subscribers', label: 'सबस्क्रायबर्स (Subscribers)', icon: Users, path: '/admin/subscribers' },
    { id: 'media', label: 'मीडिया लायब्ररी (Media)', icon: ImageIcon, path: '/admin/media' },
    { id: 'settings', label: 'साइट सेटिंग्ज (Settings)', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-[#0E1013] text-stone-900 dark:text-stone-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span className="font-bold text-sm tracking-wide">DC-Body Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-stone-800 text-stone-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-stone-900 text-stone-300 p-5 flex flex-col justify-between z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Logo / Title */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-stone-950 flex items-center justify-center font-bold">
                DC
              </div>
              <div>
                <span className="font-extrabold text-white text-base">DC-Body</span>
                <span className="block text-[10px] text-teal-400 font-semibold tracking-wider uppercase">
                  Admin Console
                </span>
              </div>
            </Link>
            <Link
              to="/"
              target="_blank"
              title="View Public Site"
              className="p-1 text-stone-400 hover:text-white"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* User profile snippet */}
          <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                {isSuperAdmin ? 'Super Admin' : 'Editor'}
              </span>
              {isDemoAdmin && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  DEMO
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {currentUser?.email || 'dnyanai2214@gmail.com'}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <Link
            to="/"
            className="text-xs text-stone-400 hover:text-white flex items-center gap-1"
          >
            <span>सार्वजनिक साइट</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="लॉगआउट (Logout)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};
