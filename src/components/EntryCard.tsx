import React from 'react';
import { Eye, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Entry } from '../types';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';

interface EntryCardProps {
  entry: Entry;
  onTryItClick?: (entry: Entry) => void;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry, onTryItClick }) => {
  const { t, getLocalized, language } = useI18n();
  const { regions, kinds } = useData();

  const title = getLocalized(entry.title);
  const summary = getLocalized(entry.summary);

  const region = regions.find(r => r.id === entry.regionId);
  const kind = kinds.find(k => k.id === entry.kindId);

  const commonKey = `common_${entry.howCommon}`;
  const commonText = t(commonKey) || entry.howCommon;

  return (
    <article className="group bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img
            src={entry.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
            <div className="flex flex-wrap items-center gap-1.5">
              {region && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-stone-800 dark:text-stone-200 shadow-xs">
                  {getLocalized(region.name)}
                </span>
              )}
              {kind && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-600/90 text-white backdrop-blur-xs shadow-xs">
                  {getLocalized(kind.name)}
                </span>
              )}
            </div>

            {entry.isSponsored && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-xs">
                {t('badge_sponsored')}
              </span>
            )}
          </div>

          {/* Floating Pill on image bottom */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            {entry.isFeelsScary && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/90 backdrop-blur-xs text-white">
                <AlertTriangle className="w-3 h-3" />
                <span>{t('badge_scary_normal')}</span>
              </span>
            )}

            <span className="ml-auto flex items-center gap-1 text-[11px] text-stone-200 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
              <Eye className="w-3 h-3" />
              <span>{entry.views || 0}</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          <Link to={`/entry/${entry.slug || entry.id}`} className="block">
            <h3 className="font-bold text-base md:text-lg text-stone-900 dark:text-white leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>

          <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
            {summary}
          </p>

          {/* Prevalence Indicator */}
          <div className="pt-1 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              {t('common_rating')}
            </span>
            <span className="font-semibold text-teal-700 dark:text-teal-400 truncate">
              {commonText}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-5 pb-5 pt-1 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2 mt-auto">
        {entry.isTryIt && onTryItClick ? (
          <button
            onClick={() => onTryItClick(entry)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge_try_it')}</span>
          </button>
        ) : (
          <span />
        )}

        <Link
          to={`/entry/${entry.slug || entry.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors ml-auto"
        >
          <span>{t('read_more')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
