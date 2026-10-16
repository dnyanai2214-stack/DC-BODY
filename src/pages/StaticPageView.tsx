import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';

export const StaticPageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, getLocalized } = useI18n();
  const { pages, siteSettings } = useData();

  const page = pages[slug || 'about'];

  if (!page) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-3">
        <h2 className="text-xl font-bold">पान सापडले नाही</h2>
        <Link to="/" className="text-teal-600 underline text-xs">
          मुख्यपृष्ठावर परत जा
        </Link>
      </div>
    );
  }

  const title = getLocalized(page.title);
  const content = getLocalized(page.content);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-teal-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>मुख्यपृष्ठावर परत</span>
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white">
          {title}
        </h1>
        <div className="text-xs text-stone-400">
          शेवटचे अद्यतन: {new Date(page.updatedAt || Date.now()).toLocaleDateString()}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 leading-relaxed text-sm md:text-base whitespace-pre-line space-y-4">
          {content}
        </div>
      </div>

      {slug === 'about' && (
        <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs md:text-sm text-stone-700 dark:text-stone-300 space-y-2">
          <h3 className="font-bold text-teal-800 dark:text-teal-300 text-sm">
            अधिकृत कंपनी तपशील / Corporate Identification
          </h3>
          <p>कंपनी नाव: <strong>{siteSettings.companyName || 'D COMPANY'}</strong></p>
          <p>मोबाईल / व्हॉट्सअ‍ॅप: <strong>{siteSettings.contactPhone || '+91 9607636444'}</strong></p>
          <p>अधिकृत ईमेल: <strong>{siteSettings.contactEmail || 'dcompany1410@gmail.com'}</strong></p>
        </div>
      )}
    </div>
  );
};
