import React, { useEffect, useRef } from 'react';
import { ExternalLink, Megaphone } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';
import { AdPlacement } from '../types';
import { Link } from 'react-router-dom';

interface AdBannerProps {
  slot: AdPlacement;
  className?: string;
  reserveHeight?: string; // e.g. 'min-h-[100px]'
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '', reserveHeight = 'min-h-[90px]' }) => {
  const { adsConfig, recordAdClick, recordAdImpression } = useData();
  const { language } = useI18n();
  const hasTrackedImpression = useRef(false);

  const slotConfig = adsConfig?.slots?.[slot];

  useEffect(() => {
    if (slotConfig?.enabled && !hasTrackedImpression.current) {
      recordAdImpression(slot);
      hasTrackedImpression.current = true;
    }
  }, [slotConfig?.enabled, slot, recordAdImpression]);

  if (!slotConfig || !slotConfig.enabled) {
    return null;
  }

  // Language targeting check for direct sponsor
  if (
    slotConfig.type === 'sponsor' &&
    slotConfig.sponsorTargetLanguage &&
    slotConfig.sponsorTargetLanguage !== 'all' &&
    slotConfig.sponsorTargetLanguage !== language
  ) {
    return null;
  }

  const labelText = language === 'mr' ? 'जाहिरात' : language === 'hi' ? 'विज्ञापन' : 'Advertisement';

  return (
    <div className={`w-full my-4 flex flex-col items-center overflow-hidden ${className}`}>
      {/* Label to prevent deceptive ads */}
      <div className="w-full max-w-4xl flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 px-2 py-0.5 font-medium">
        <span>{labelText}</span>
        <Link to="/advertise" className="hover:underline flex items-center gap-1 text-teal-600 dark:text-teal-400">
          <Megaphone className="w-2.5 h-2.5" />
          <span>Advertise with us</span>
        </Link>
      </div>

      <div
        className={`w-full max-w-4xl bg-stone-100 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/60 overflow-hidden flex items-center justify-center p-1.5 transition-all shadow-xs ${reserveHeight}`}
      >
        {slotConfig.type === 'sponsor' && slotConfig.sponsorImageUrl ? (
          <a
            href={slotConfig.sponsorLinkUrl || 'https://wa.me/919607636444?text=Advertising%20Inquiry'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordAdClick(slot)}
            className="group relative w-full block overflow-hidden rounded-lg"
          >
            <img
              src={slotConfig.sponsorImageUrl}
              alt={slotConfig.sponsorAltText || 'Sponsor Banner'}
              className="w-full h-auto max-h-40 object-cover object-center rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
              <span>Visit Partner</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </div>
          </a>
        ) : slotConfig.type === 'custom' && slotConfig.customHtml ? (
          <div
            className="w-full overflow-hidden text-center"
            dangerouslySetInnerHTML={{ __html: slotConfig.customHtml }}
          />
        ) : (
          /* Google AdSense container */
          <div className="w-full py-4 text-center text-xs text-stone-500 dark:text-stone-400 flex flex-col items-center justify-center gap-1">
            <span className="font-semibold text-stone-600 dark:text-stone-300">Google AdSense Slot</span>
            <span className="text-[11px] font-mono text-stone-500">
              {adsConfig.adsensePublisherId || 'ca-pub-9607636444000000'} | {slot}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
