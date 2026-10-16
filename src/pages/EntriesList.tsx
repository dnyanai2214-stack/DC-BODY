import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Sparkles, 
  AlertTriangle, 
  ArrowUpDown,
  X
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { EntryCard } from '../components/EntryCard';
import { AdBanner } from '../components/AdBanner';
import { AffiliateCard } from '../components/AffiliateCard';
import { TryItModal } from '../components/TryItModal';
import { Entry } from '../types';

export const EntriesList: React.FC = () => {
  const { t, getLocalized, language } = useI18n();
  const { entries, regions, kinds, affiliates, adsConfig } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all');
  const [selectedKind, setSelectedKind] = useState(searchParams.get('kind') || 'all');
  const [filterMode, setFilterMode] = useState<string>(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState<'newest' | 'az' | 'views'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTryItEntry, setActiveTryItEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) setSearchQuery(qParam);
    const filterParam = searchParams.get('filter');
    if (filterParam) setFilterMode(filterParam);
    const regParam = searchParams.get('region');
    if (regParam) setSelectedRegion(regParam);
    const kindParam = searchParams.get('kind');
    if (kindParam) setSelectedKind(kindParam);
  }, [searchParams]);

  const filteredEntries = useMemo(() => {
    return entries.filter(e => {
      if (e.status !== 'published') return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const title = getLocalized(e.title).toLowerCase();
        const summary = getLocalized(e.summary).toLowerCase();
        const tags = e.tags?.join(' ').toLowerCase() || '';
        if (!title.includes(q) && !summary.includes(q) && !tags.includes(q)) {
          return false;
        }
      }

      // Region Filter
      if (selectedRegion !== 'all' && e.regionId !== selectedRegion) {
        return false;
      }

      // Kind Filter
      if (selectedKind !== 'all' && e.kindId !== selectedKind) {
        return false;
      }

      // Quick Filter Modes
      if (filterMode === 'scary' && !e.isFeelsScary) return false;
      if (filterMode === 'try_it' && !e.isTryIt) return false;
      if (filterMode === 'rare' && e.howCommon !== 'rare' && e.howCommon !== 'very_rare') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'az') {
        const titleA = getLocalized(a.title);
        const titleB = getLocalized(b.title);
        return titleA.localeCompare(titleB);
      }
      return 0;
    });
  }, [entries, searchQuery, selectedRegion, selectedKind, filterMode, sortBy, getLocalized]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedKind('all');
    setFilterMode('all');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || selectedRegion !== 'all' || selectedKind !== 'all' || filterMode !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('nav_entries')} ({filteredEntries.length})
        </h1>
        <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          मानवी शरीराच्या सर्व सुरक्षित, वैज्ञानिक आणि चक्रावून टाकणाऱ्या नैसर्गिक क्रियांचा संपूर्ण ज्ञानकोश.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-4">
        {/* Row 1: Search & View toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs md:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:border-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* View Mode */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-stone-900 shadow-xs text-teal-600 dark:text-teal-400'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-stone-900 shadow-xs text-teal-600 dark:text-teal-400'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Dropdowns & Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          {/* Region Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1">
              {t('filter_region')}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
            >
              <option value="all">{t('filter_all')} अवयव</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {getLocalized(r.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Kind Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1">
              {t('filter_kind')}
            </label>
            <select
              value={selectedKind}
              onChange={(e) => setSelectedKind(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
            >
              <option value="all">{t('filter_all')} प्रकार</option>
              {kinds.map((k) => (
                <option key={k.id} value={k.id}>
                  {getLocalized(k.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Category filter buttons */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1">
              विशेष श्रेणी / Focus
            </label>
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
            >
              <option value="all">{t('filter_all')}</option>
              <option value="scary">⚠️ {t('quick_chip_scary')}</option>
              <option value="try_it">✨ {t('quick_chip_try_now')}</option>
              <option value="rare">💎 दुर्मिळ वैशिष्ट्ये (Rare)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1">
              {t('filter_sort')}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
            >
              <option value="newest">{t('sort_newest')}</option>
              <option value="views">{t('sort_views')}</option>
              <option value="az">{t('sort_az')}</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs border-t border-stone-100 dark:border-stone-800">
            <span className="text-stone-500">
              सक्रिय निकष लागू आहेत ({filteredEntries.length} निकाल)
            </span>
            <button
              onClick={clearFilters}
              className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>निकष काढा (Clear All)</span>
            </button>
          </div>
        )}
      </div>

      {/* Entries List Render */}
      {filteredEntries.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredEntries.map((entry, index) => {
            const inFeedInterval = adsConfig?.inFeedInterval || 3;
            const showInFeedAd = (index + 1) % inFeedInterval === 0 && index !== filteredEntries.length - 1;

            return (
              <React.Fragment key={entry.id}>
                <EntryCard
                  entry={entry}
                  onTryItClick={(e) => setActiveTryItEntry(e)}
                />
                {showInFeedAd && (
                  <div className="col-span-full">
                    <AdBanner slot="in_feed" reserveHeight="min-h-[80px]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 bg-white dark:bg-[#1A1D21] rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            कोणतीही नोंद सापडली नाही
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            तुम्ही निवडलेल्या निकषांशी जुळणारी कोणतीही नोंद सध्या उपलब्ध नाही. कृपया इतर शब्द किंवा अवयव निवडून शोधा.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            सर्व नोंदी पूर्ववत पहा
          </button>
        </div>
      )}

      {/* Sidebar Affiliate Block */}
      {affiliates.length > 1 && (
        <div className="pt-6">
          <AffiliateCard affiliate={affiliates[1]} layout="horizontal" />
        </div>
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
