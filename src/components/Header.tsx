import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MessageCircle, 
  Globe, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

export const Header: React.FC<{ onSearchTrigger?: () => void }> = ({ onSearchTrigger }) => {
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/entries', label: t('nav_entries') },
    { to: '/regions', label: t('nav_regions') },
    { to: '/kinds', label: t('nav_kinds') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/suggest', label: t('nav_suggest') },
    { to: '/advertise', label: t('nav_advertise') },
    { to: '/contact', label: t('nav_contact') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#121417]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      {/* Top Details Bar */}
      <div className="bg-stone-900 text-stone-200 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-teal-400 tracking-wide uppercase text-[11px]">
              D COMPANY
            </span>
            <div className="hidden sm:flex items-center gap-3 text-stone-300">
              <a
                href="tel:+919607636444"
                className="hover:text-white flex items-center gap-1 transition-colors"
                title="Call D COMPANY"
              >
                <Phone className="w-3 h-3 text-teal-400" />
                <span>+91 9607636444</span>
              </a>
              <span className="text-stone-600">|</span>
              <a
                href="https://wa.me/919607636444?text=Hello%20D%20COMPANY%20DC-Body"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors text-emerald-400"
                title="WhatsApp D COMPANY"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <span className="text-stone-600">|</span>
              <a
                href="mailto:dcompany1410@gmail.com"
                className="hover:text-white flex items-center gap-1 transition-colors"
                title="Email D COMPANY"
              >
                <Mail className="w-3 h-3 text-teal-400" />
                <span>dcompany1410@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Language Switcher Pill */}
          <div className="flex items-center gap-1.5 ml-auto">
            <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <div className="flex items-center bg-stone-800/80 rounded-full p-0.5 border border-stone-700/80 text-[11px]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                    language === l.code
                      ? 'bg-teal-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-stone-900 dark:text-white flex items-center gap-0.5">
              <span>DC-</span>
              <span className="text-teal-600 dark:text-teal-400">Body</span>
            </span>
            <span className="hidden lg:block text-[10px] text-stone-600 dark:text-stone-300 font-medium tracking-tight -mt-1 truncate max-w-xs">
              {t('site_tagline')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive(item.to)
                  ? 'bg-stone-200/80 dark:bg-stone-800 text-teal-700 dark:text-teal-400 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Tools (Theme, Search, Admin, Mobile Toggle) */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          {onSearchTrigger && (
            <button
              onClick={onSearchTrigger}
              aria-label="Search"
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin portal link */}
          <Link
            to="/admin"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${
              isAdmin
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Dashboard' : t('nav_admin')}</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="xl:hidden p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] dark:bg-[#121417] border-b border-stone-200 dark:border-stone-800 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  isActive(item.to)
                    ? 'bg-teal-500/10 text-teal-700 dark:text-teal-400 font-bold'
                    : 'text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex flex-col gap-1 text-xs text-stone-600 dark:text-stone-400">
              <span className="font-bold text-stone-900 dark:text-white uppercase text-[10px]">
                D COMPANY Contact
              </span>
              <a href="tel:+919607636444" className="hover:underline flex items-center gap-1.5 py-0.5">
                <Phone className="w-3.5 h-3.5 text-teal-500" />
                <span>+91 9607636444</span>
              </a>
              <a href="mailto:dcompany1410@gmail.com" className="hover:underline flex items-center gap-1.5 py-0.5">
                <Mail className="w-3.5 h-3.5 text-teal-500" />
                <span>dcompany1410@gmail.com</span>
              </a>
            </div>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('nav_admin')} Login / Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
