import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { AffiliateBlock } from '../types';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';

interface AffiliateCardProps {
  affiliate: AffiliateBlock;
  layout?: 'horizontal' | 'vertical';
}

export const AffiliateCard: React.FC<AffiliateCardProps> = ({ affiliate, layout = 'vertical' }) => {
  const { recordAffiliateClick } = useData();
  const { getLocalized } = useI18n();

  const title = getLocalized(affiliate.title);
  const desc = getLocalized(affiliate.description);
  const btn = getLocalized(affiliate.buttonText) || 'View Details';

  return (
    <div
      className={`rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/5 via-stone-50 to-amber-500/5 dark:from-teal-950/20 dark:via-stone-900 dark:to-amber-950/20 p-4 transition-all hover:border-teal-500/40 hover:shadow-md ${
        layout === 'horizontal' ? 'flex flex-col sm:flex-row items-center gap-4' : 'flex flex-col gap-3'
      }`}
    >
      {affiliate.imageUrl && (
        <img
          src={affiliate.imageUrl}
          alt={title}
          className={`${
            layout === 'horizontal' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-full h-36'
          } rounded-xl object-cover shrink-0 shadow-xs`}
          loading="lazy"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-1">
          <ShoppingBag className="w-3 h-3" />
          <span>शिफारस / Recommended Resource</span>
        </div>
        <h4 className="font-semibold text-sm text-stone-900 dark:text-white leading-snug line-clamp-2">
          {title}
        </h4>
        {desc && (
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        )}
        <div className="mt-3">
          <a
            href={affiliate.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordAffiliateClick(affiliate.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-xs"
          >
            <span>{btn}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
