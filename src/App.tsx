import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Public Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

// Public Pages
import { Home } from './pages/Home';
import { EntriesList } from './pages/EntriesList';
import { EntryDetail } from './pages/EntryDetail';
import { RegionsList, RegionDetail, KindsList, KindDetail } from './pages/TaxonomyPages';
import { BlogList, BlogDetail } from './pages/BlogPages';
import { StaticPageView } from './pages/StaticPageView';
import { AdvertisePage } from './pages/AdvertisePage';
import { ContactPage } from './pages/ContactPage';
import { SuggestEntryPage } from './pages/SuggestEntryPage';
import { SitemapRss } from './pages/SitemapRss';

// Admin Components
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminEntries } from './admin/AdminEntries';
import { AdminCategories } from './admin/AdminCategories';
import { AdminBlog } from './admin/AdminBlog';
import { AdminPages } from './admin/AdminPages';
import { AdminAds } from './admin/AdminAds';
import { AdminAffiliates } from './admin/AdminAffiliates';
import { AdminSettings } from './admin/AdminSettings';
import { AdminInbox } from './admin/AdminInbox';
import { AdminSuggestions } from './admin/AdminSuggestions';
import { AdminSubscribers } from './admin/AdminSubscribers';
import { AdminMedia } from './admin/AdminMedia';

// Protected Admin Route Guard
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode; tab: string }> = ({ children, tab }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout activeTab={tab}>{children}</AdminLayout>;
};

// Main App shell with public Header & Footer
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#121417] text-stone-900 dark:text-stone-100 selection:bg-teal-500 selection:text-white transition-colors duration-200">
      {!isAdminRoute && <Header onSearchTrigger={() => {
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }} />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/mr" element={<Home />} />
          <Route path="/hi" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="/entries" element={<EntriesList />} />
          <Route path="/entry/:slug" element={<EntryDetail />} />
          <Route path="/regions" element={<RegionsList />} />
          <Route path="/regions/:id" element={<RegionDetail />} />
          <Route path="/kinds" element={<KindsList />} />
          <Route path="/kinds/:id" element={<KindDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/page/:slug" element={<StaticPageView />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/suggest" element={<SuggestEntryPage />} />
          <Route path="/sitemap-rss" element={<SitemapRss />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute tab="dashboard">
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/entries"
            element={
              <ProtectedAdminRoute tab="entries">
                <AdminEntries />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedAdminRoute tab="categories">
                <AdminCategories />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedAdminRoute tab="blog">
                <AdminBlog />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/pages"
            element={
              <ProtectedAdminRoute tab="pages">
                <AdminPages />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/ads"
            element={
              <ProtectedAdminRoute tab="ads">
                <AdminAds />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/affiliates"
            element={
              <ProtectedAdminRoute tab="affiliates">
                <AdminAffiliates />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/inbox"
            element={
              <ProtectedAdminRoute tab="inbox">
                <AdminInbox />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/suggestions"
            element={
              <ProtectedAdminRoute tab="suggestions">
                <AdminSuggestions />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/subscribers"
            element={
              <ProtectedAdminRoute tab="subscribers">
                <AdminSubscribers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedAdminRoute tab="media">
                <AdminMedia />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute tab="settings">
                <AdminSettings />
              </ProtectedAdminRoute>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      <CookieBanner />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
