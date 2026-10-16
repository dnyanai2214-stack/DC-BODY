import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  AlertTriangle, 
  Dna, 
  ArrowRight, 
  Shuffle, 
  Layers, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  TrendingUp,
  Brain,
  Eye,
  Ear,
  Wind,
  Smile,
  Activity,
  Bone,
  Heart,
  User
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { EntryCard } from '../components/EntryCard';
import { MedicalNoticeBanner } from '../components/MedicalNoticeBanner';
import { AdBanner } from '../components/AdBanner';
import { AffiliateCard } from '../components/AffiliateCard';
import { TryItModal } from '../components/TryItModal';
import { Entry } from '../types';

export const Home: React.FC = () => {
  const { t, getLocalized, language } = useI18n();
  const { entries, regions, kinds, affiliates } = useData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTryItEntry, setActiveTryItEntry] = useState<Entry | null>(null);

  // Icon mapping helper for regions
  const getRegionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Eye': return <Eye className="w-5 h-5 text-blue-500" />;
      case 'Ear': return <Ear className="w-5 h-5 text-purple-500" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-500" />;
      case 'Smile': return <Smile className="w-5 h-5 text-emerald-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-rose-500" />;
      case 'Bone': return <Bone className="w-5 h-5 text-stone-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-red-500" />;
      case 'User': return <User className="w-5 h-5 text-indigo-500" />;
      default: return <Layers className="w-5 h-5 text-teal-500" />;
    }
  };

  // Published entries only
  const publishedEntries = useMemo(() => {
    return entries.filter(e => e.status === 'published');
  }, [entries]);

  // Live search as you type
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return publishedEntries.filter(e => {
      const title = getLocalized(e.title).toLowerCase();
      const summary = getLocalized(e.summary).toLowerCase();
      const tags = e.tags?.join(' ').toLowerCase() || '';
      return title.includes(q) || summary.includes(q) || tags.includes(q);
    }).slice(0, 5);
  }, [searchQuery, publishedEntries, getLocalized]);

  // Daily featured entry
  const featuredEntry = useMemo(() => {
    return publishedEntries.find(e => e.isFeatured) || publishedEntries[0];
  }, [publishedEntries]);

  // "Try one right now" sample
  const tryItEntries = useMemo(() => {
    return publishedEntries.filter(e => e.isTryIt);
  }, [publishedEntries]);

  // Recently added (sorted by date)
  const recentEntries = useMemo(() => {
    return [...publishedEntries]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [publishedEntries]);

  // Counts per region
  const regionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    publishedEntries.forEach(e => {
      map[e.regionId] = (map[e.regionId] || 0) + 1;
    });
    return map;
  }, [publishedEntries]);

  // Counts per kind
  const kindCounts = useMemo(() => {
    const map: Record<string, number> = {};
    publishedEntries.forEach(e => {
      map[e.kindId] = (map[e.kindId] || 0) + 1;
    });
    return map;
  }, [publishedEntries]);

  const handleRandomOddity = () => {
    if (publishedEntries.length === 0) return;
    const randomIndex = Math.floor(Math.random() * publishedEntries.length);
    const chosen = publishedEntries[randomIndex];
    navigate(`/entry/${chosen.slug || chosen.id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/entries?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner slot="header_banner" reserveHeight="min-h-[80px]" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 md:py-16 bg-radial from-teal-500/10 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 dark:text-teal-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{t('hero_badge')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>{publishedEntries.length} {t('entries_count')}</span>
          </div>

          {/* Hero Titles */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-[1.15]">
            {t('hero_title')}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Large Live Search Bar */}
          <div className="relative max-w-2xl mx-auto text-left pt-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center bg-white dark:bg-[#1A1D21] border-2 border-stone-200 dark:border-stone-700 focus-within:border-teal-500 dark:focus-within:border-teal-400 rounded-3xl shadow-xl overflow-hidden transition-all">
                <Search className="w-5 h-5 text-stone-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className="w-full py-4 px-3 text-sm md:text-base bg-transparent text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="mr-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-semibold transition-colors shrink-0 shadow-sm"
                >
                  शोधा / Search
                </button>
              </div>
            </form>

            {/* Live Search Instant Dropdown Results */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden p-2 space-y-1">
                {searchResults.length > 0 ? (
                  searchResults.map(res => (
                    <Link
                      key={res.id}
                      to={`/entry/${res.slug || res.id}`}
                      className="block p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div className="font-bold text-sm text-stone-900 dark:text-white">
                        {getLocalized(res.title)}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {getLocalized(res.summary)}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-stone-500">
                    कोणतीही नोंद सापडली नाही / No matching body quirks found.
                  </div>
                )}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-center">
                  <Link
                    to={`/entries?q=${encodeURIComponent(searchQuery)}`}
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    सर्व शोध निकाल पहा (View all results) →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Link
              to="/entries?filter=scary"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-all shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>{t('quick_chip_scary')}</span>
            </Link>

            <Link
              to="/entries?filter=try_it"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 border border-teal-500/20 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{t('quick_chip_try_now')}</span>
            </Link>

            <button
              onClick={handleRandomOddity}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 transition-all shadow-xs"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t('quick_chip_random')}</span>
            </button>
          </div>

          {/* Medical Notice */}
          <div className="max-w-2xl mx-auto pt-4 text-left">
            <MedicalNoticeBanner />
          </div>
        </div>
      </section>

      {/* Ad slot: below_hero */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner slot="below_hero" reserveHeight="min-h-[100px]" />
      </div>

      {/* Did You Know / Daily Featured Quirk */}
      {featuredEntry && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-teal-900 to-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-stone-950">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('did_you_know')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                {getLocalized(featuredEntry.title)}
              </h2>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                {getLocalized(featuredEntry.summary)}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/entry/${featuredEntry.slug || featuredEntry.id}`}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-stone-950 text-xs md:text-sm font-bold transition-colors inline-flex items-center gap-1.5 shadow-md"
                >
                  <span>{t('read_more')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {featuredEntry.isTryIt && (
                  <button
                    onClick={() => setActiveTryItEntry(featuredEntry)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                    <span>{t('badge_try_it')}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 aspect-16/10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={featuredEntry.imageUrl}
                alt={getLocalized(featuredEntry.title)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* Browse by Body Region (12 regions) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 dark:text-white">
              {t('browse_by_region')}
            </h2>
            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              डोक्यापासून पायापर्यंत शरीराचे थक्क करणारे अवयव
            </p>
          </div>
          <Link
            to="/regions"
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{t('view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {regions.map((reg) => {
            const count = regionCounts[reg.id] || 0;
            return (
              <Link
                key={reg.id}
                to={`/regions/${reg.id}`}
                className="group p-4 rounded-2xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 group-hover:scale-110 transition-transform">
                  {getRegionIcon(reg.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-stone-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {getLocalized(reg.name)}
                  </h3>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    {count} {t('entries_count')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Browse by Kind (7 kinds) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 dark:text-white">
              {t('browse_by_kind')}
            </h2>
            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              प्रतिक्षिप्त क्रिया, शारीरिक आवाज, भ्रम आणि दुर्लभ क्षमता
            </p>
          </div>
          <Link
            to="/kinds"
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{t('view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {kinds.map((k) => {
            const count = kindCounts[k.id] || 0;
            return (
              <Link
                key={k.id}
                to={`/kinds/${k.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 hover:border-teal-500/50 hover:shadow-md transition-all flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs md:text-sm text-stone-900 dark:text-white truncate">
                    {getLocalized(k.name)}
                  </h3>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    {count} {t('entries_count')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* In-feed Ad Banner */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner slot="in_feed" reserveHeight="min-h-[90px]" />
      </div>

      {/* Recently Added Section (Grid of Cards) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 dark:text-white">
              {t('recently_added')}
            </h2>
            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              शरीराच्या नव्याने संकलित केलेल्या वैज्ञानिक नोंदी
            </p>
          </div>
          <Link
            to="/entries"
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{t('view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onTryItClick={(e) => setActiveTryItEntry(e)}
            />
          ))}
        </div>
      </section>

      {/* "Try It Right Now" Interactive Feature Ribbon */}
      {tryItEntries.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-500/15 via-teal-500/5 to-amber-500/15 border border-teal-500/30 rounded-3xl p-6 md:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  {t('quick_chip_try_now')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-white">
                  {t('try_one_now')} — स्वतः प्रयोग करून पाहा
                </h3>
              </div>
              <Link
                to="/entries?filter=try_it"
                className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>सर्व प्रयोग पहा</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tryItEntries.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                      {getLocalized(item.title)}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {getLocalized(item.summary)}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTryItEntry(item)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>कसे करायचे? (Try It)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Affiliate Block */}
      {affiliates.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <AffiliateCard affiliate={affiliates[0]} layout="horizontal" />
        </section>
      )}

      {/* Interactive Try It Modal */}
      {activeTryItEntry && (
        <TryItModal
          entry={activeTryItEntry}
          onClose={() => setActiveTryItEntry(null)}
        />
      )}
    </div>
  );
};
