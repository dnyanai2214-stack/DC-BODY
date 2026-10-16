import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Eye, 
  Users, 
  Inbox, 
  MousePointerClick, 
  Sparkles, 
  TrendingUp, 
  Plus, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';

export const AdminDashboard: React.FC = () => {
  const { 
    entries, 
    subscribers, 
    inbox, 
    adsConfig, 
    regions, 
    kinds, 
    seedDatabase, 
    loading 
  } = useData();
  const { getLocalized } = useI18n();

  const [seedSuccess, setSeedSuccess] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const totalViews = entries.reduce((acc, e) => acc + (e.views || 0), 0);
  const totalAdClicks = Object.values(adsConfig?.slots || {}).reduce((acc, s) => acc + (s.clicks || 0), 0);
  const unreadMessages = inbox.filter(m => !m.read).length;

  const handleSeed = async () => {
    if (!confirm('तुम्हाला खरोखर डेटाबेसमध्ये १५ मूळ नोंदी, १२ अवयव, ७ प्रकार आणि साइट सेटिंग्ज सीड करायचे आहेत का?')) return;
    setSeeding(true);
    await seedDatabase(true);
    setSeeding(false);
    setSeedSuccess(true);
    setTimeout(() => setSeedSuccess(false), 4000);
  };

  const topEntries = [...entries]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            व्यवस्थापन डॅशबोर्ड (Dashboard)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            DC-Body ज्ञानकोशाची संपूर्ण आकडेवारी, वाचक संख्या आणि कमाई ट्रॅकर.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* First run / Reseed Button */}
          <button
            onClick={handleSeed}
            disabled={seeding || loading}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1.5"
            title="Seed initial 15 entries and categories to Firestore"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'सीड होत आहे...' : 'सीडिंग स्क्रिप्ट (Seed Data)'}</span>
          </button>

          <Link
            to="/admin/entries?action=new"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>नवीन नोंद जोडा</span>
          </Link>
        </div>
      </div>

      {seedSuccess && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center gap-3 text-xs text-teal-800 dark:text-teal-300 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
          <span>डेटाबेस यशस्वीरित्या १५ मूळ नोंदी आणि सर्व अवयवांसह सीड करण्यात आला आहे!</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">एकूण नोंदी</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-white">
            {entries.length}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block">
            {entries.filter(e => e.status === 'published').length} प्रकाशित (Published)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">वाचक संख्या (Views)</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-white">
            {totalViews.toLocaleString()}
          </div>
          <span className="text-[10px] text-stone-400 block">सक्रिय वाचक ट्रॅकिंग</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">सबस्क्रायबर्स</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-white">
            {subscribers.length}
          </div>
          <span className="text-[10px] text-teal-600 font-semibold block">न्यूजलेटर सदस्य</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">अ‍ॅड क्लिक्स</span>
            <MousePointerClick className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-white">
            {totalAdClicks}
          </div>
          <span className="text-[10px] text-stone-400 block">कमाई ट्रॅकर</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">नवीन संदेश</span>
            <Inbox className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-white">
            {unreadMessages}
          </div>
          <span className="text-[10px] text-rose-500 font-semibold block">वाचकांचे संदेश / जाहिरात</span>
        </div>
      </div>

      {/* Visual Distribution Chart & Top Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simple Bar Chart by Region */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">
              अवयवांनुसार नोंदींचे वितरण (Entries by Region)
            </h3>
            <span className="text-xs text-stone-400">एकूण १२ अवयव</span>
          </div>

          <div className="space-y-2.5 pt-2">
            {regions.slice(0, 6).map((r) => {
              const count = entries.filter(e => e.regionId === r.id).length;
              const pct = entries.length > 0 ? (count / entries.length) * 100 : 0;
              return (
                <div key={r.id} className="space-y-1">
                  <div className="flex justify-between text-xs text-stone-600 dark:text-stone-300">
                    <span className="font-semibold">{getLocalized(r.name)}</span>
                    <span>{count} नोंदी ({Math.round(pct)}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Most Viewed Entries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">
              सर्वाधिक लोकप्रिय नोंदी (Top Viewed)
            </h3>
            <Link to="/admin/entries" className="text-xs text-teal-600 hover:underline">
              सर्व पहा
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {topEntries.map((entry, idx) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <span className="font-semibold text-stone-900 dark:text-white block truncate">
                      {getLocalized(entry.title)}
                    </span>
                    <span className="text-[10px] text-stone-400 capitalize">
                      {entry.regionId} • {entry.kindId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono font-bold text-teal-600 shrink-0 ml-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{entry.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
