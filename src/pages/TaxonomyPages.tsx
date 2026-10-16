import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { EntryCard } from '../components/EntryCard';

// 1. All Regions List
export const RegionsList: React.FC = () => {
  const { t, getLocalized } = useI18n();
  const { regions, entries } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          {t('browse_by_region')}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm mt-1">
          डोक्यापासून पायापर्यंत प्रत्येक अवयवाची अनोखी कार्यपद्धती आणि विचित्र लक्षणे
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((reg) => {
          const count = entries.filter(e => e.regionId === reg.id && e.status === 'published').length;
          return (
            <Link
              key={reg.id}
              to={`/regions/${reg.id}`}
              className="group p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 hover:border-teal-500/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {count} {t('entries_count')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {getLocalized(reg.name)}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {getLocalized(reg.description)}
                </p>
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                <span>नोंदी पहा</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// 2. Single Region Detail View
export const RegionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, getLocalized } = useI18n();
  const { regions, entries } = useData();

  const region = regions.find(r => r.id === id);
  const matchingEntries = entries.filter(e => e.regionId === id && e.status === 'published');

  if (!region) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-3">
        <h2 className="text-xl font-bold">अवयव सापडला नाही</h2>
        <Link to="/regions" className="text-teal-600 underline text-xs">
          सर्व अवयवांवर परत जा
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-3">
        <button
          onClick={() => navigate('/regions')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-teal-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>सर्व अवयवांवर परत</span>
        </button>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          {getLocalized(region.name)} ({matchingEntries.length})
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          {getLocalized(region.description)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchingEntries.map(entry => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

// 3. All Kinds List
export const KindsList: React.FC = () => {
  const { t, getLocalized } = useI18n();
  const { kinds, entries } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          {t('browse_by_kind')}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm mt-1">
          प्रतिक्षिप्त क्रिया, कसरती, शारीरिक आवाज आणि संवेदनांचे वर्गीकरण
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kinds.map((k) => {
          const count = entries.filter(e => e.kindId === k.id && e.status === 'published').length;
          return (
            <Link
              key={k.id}
              to={`/kinds/${k.id}`}
              className="group p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 hover:border-teal-500/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {count} {t('entries_count')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {getLocalized(k.name)}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {getLocalized(k.description)}
                </p>
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                <span>नोंदी पहा</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// 4. Single Kind Detail View
export const KindDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, getLocalized } = useI18n();
  const { kinds, entries } = useData();

  const kind = kinds.find(k => k.id === id);
  const matchingEntries = entries.filter(e => e.kindId === id && e.status === 'published');

  if (!kind) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-3">
        <h2 className="text-xl font-bold">प्रकार सापडला नाही</h2>
        <Link to="/kinds" className="text-teal-600 underline text-xs">
          सर्व प्रकारांवर परत जा
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-3">
        <button
          onClick={() => navigate('/kinds')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-teal-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>सर्व प्रकारांवर परत</span>
        </button>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          {getLocalized(kind.name)} ({matchingEntries.length})
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          {getLocalized(kind.description)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchingEntries.map(entry => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};
