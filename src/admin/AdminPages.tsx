import React, { useState } from 'react';
import { FileText, Save, Check, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Language, StaticPage } from '../types';

export const AdminPages: React.FC = () => {
  const { pages, updatePage } = useData();
  const pageSlugs = ['about', 'disclaimer', 'privacy', 'terms'];

  const [activeSlug, setActiveSlug] = useState('about');
  const [activeLang, setActiveLang] = useState<Language>('mr');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentPage = pages[activeSlug] || {
    id: activeSlug,
    slug: activeSlug,
    title: { mr: '', hi: '', en: '' },
    content: { mr: '', hi: '', en: '' },
    updatedAt: new Date().toISOString()
  };

  const [title, setTitle] = useState(currentPage.title);
  const [content, setContent] = useState(currentPage.content);

  const handleSelectPage = (slug: string) => {
    setActiveSlug(slug);
    const p = pages[slug] || {
      id: slug,
      slug: slug,
      title: { mr: '', hi: '', en: '' },
      content: { mr: '', hi: '', en: '' },
      updatedAt: new Date().toISOString()
    };
    setTitle(p.title);
    setContent(p.content);
  };

  const handleSave = async () => {
    await updatePage(activeSlug, {
      title,
      content
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            स्थिर पाने व्यवस्थापक (Pages Manager)
          </h1>
          <p className="text-xs text-stone-500">
            About, Disclaimer, Privacy Policy, Terms पाने ३ भाषांमध्ये संपादन करा.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'जतन झाले!' : 'पान सेव्ह करा'}</span>
        </button>
      </div>

      {/* Page Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        {pageSlugs.map((slug) => (
          <button
            key={slug}
            onClick={() => handleSelectPage(slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              activeSlug === slug
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            {slug}
          </button>
        ))}
      </div>

      {/* Language Switcher */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
            संपादन भाषा (Language):
          </span>
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
            {(['mr', 'hi', 'en'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setActiveLang(l)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeLang === l ? 'bg-white dark:bg-stone-900 text-teal-600 shadow-xs' : 'text-stone-500'
                }`}
              >
                {l === 'mr' ? 'मराठी' : l === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              पानाचे नाव / शीर्षक ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={title[activeLang] || ''}
              onChange={(e) => setTitle({ ...title, [activeLang]: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              मजकूर सामग्री / Content ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={12}
              value={content[activeLang] || ''}
              onChange={(e) => setContent({ ...content, [activeLang]: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
