import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle, 
  Eye, 
  Layers, 
  CheckCircle2, 
  Calendar,
  Share2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { MedicalNoticeBanner } from '../components/MedicalNoticeBanner';
import { ShareButtons } from '../components/ShareButtons';
import { AdBanner } from '../components/AdBanner';
import { AffiliateCard } from '../components/AffiliateCard';
import { EntryCard } from '../components/EntryCard';
import { TryItModal } from '../components/TryItModal';
import { Entry } from '../types';

export const EntryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, getLocalized, language } = useI18n();
  const { entries, regions, kinds, affiliates, recordEntryView } = useData();

  const [activeTryItModal, setActiveTryItModal] = useState<Entry | null>(null);

  const entry = useMemo(() => {
    return entries.find(e => e.slug === slug || e.id === slug);
  }, [entries, slug]);

  useEffect(() => {
    if (entry) {
      recordEntryView(entry.id);
      window.scrollTo(0, 0);
    }
  }, [entry?.id]);

  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
          नोंद सापडली नाही / Entry Not Found
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          कदाचित ही नोंद हलवली गेली आहे किंवा अस्तित्वात नाही.
        </p>
        <Link
          to="/entries"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व नोंदींवर परत जा</span>
        </Link>
      </div>
    );
  }

  const region = regions.find(r => r.id === entry.regionId);
  const kind = kinds.find(k => k.id === entry.kindId);

  const title = getLocalized(entry.title);
  const summary = getLocalized(entry.summary);
  const body = getLocalized(entry.body);
  const tryItSteps = getLocalized(entry.tryItInstructions);

  const commonKey = `common_${entry.howCommon}`;
  const commonText = t(commonKey) || entry.howCommon;

  // Related entries: same region or same kind
  const relatedEntries = useMemo(() => {
    return entries
      .filter(e => e.id !== entry.id && e.status === 'published' && (e.regionId === entry.regionId || e.kindId === entry.kindId))
      .slice(0, 3);
  }, [entries, entry]);

  // Split body paragraphs to insert in-entry ad after paragraph 2
  const bodyParagraphs = useMemo(() => {
    return body.split('\n\n').filter(p => p.trim().length > 0);
  }, [body]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back navigation & Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मागे जा (Back)</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {region && (
            <Link
              to={`/regions/${region.id}`}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
            >
              {getLocalized(region.name)}
            </Link>
          )}
          {kind && (
            <Link
              to={`/kinds/${kind.id}`}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 transition-colors"
            >
              {getLocalized(kind.name)}
            </Link>
          )}
          {entry.isSponsored && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950">
              {t('badge_sponsored')}
            </span>
          )}
        </div>
      </div>

      {/* Main Title & Summary */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-white leading-[1.2] tracking-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
          {summary}
        </p>

        {/* Meta Bar: Prevalence, Scary but normal, views */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-y border-stone-200/80 dark:border-stone-800 py-3">
          <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
            <span className="text-stone-400">{t('common_rating')}</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">{commonText}</span>
          </div>

          <span className="text-stone-300 dark:text-stone-700">|</span>

          <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{entry.views || 0} {t('views_label')}</span>
          </div>

          {entry.isFeelsScary && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 ml-auto">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>{t('badge_scary_normal')}</span>
            </span>
          )}
        </div>
      </div>

      {/* Hero Image */}
      {entry.imageUrl && (
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden shadow-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-800">
          <img
            src={entry.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Mandatory Medical Reassurance Notice */}
      <MedicalNoticeBanner />

      {/* "Try It Yourself" interactive callout box */}
      {entry.isTryIt && tryItSteps && (
        <div className="bg-gradient-to-br from-teal-500/15 via-teal-500/5 to-amber-500/15 border-2 border-teal-500/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-teal-600 text-white rounded-2xl shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  {t('badge_try_it')}
                </span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  {t('try_it_steps')}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setActiveTryItModal(entry)}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
            >
              इंटरॅक्टिव्ह मोड (Interactive)
            </button>
          </div>

          <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-medium bg-white/70 dark:bg-stone-900/70 p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800">
            {tryItSteps}
          </p>
        </div>
      )}

      {/* Body Text with in-entry Ad slot & affiliate block */}
      <div className="prose dark:prose-invert max-w-none space-y-5 text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
        {bodyParagraphs.map((para, idx) => (
          <React.Fragment key={idx}>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed">
              {para}
            </p>

            {/* Ad inside entry after paragraph 1 or 2 */}
            {idx === 1 && (
              <div className="not-prose my-6">
                <AdBanner slot="inside_entry" reserveHeight="min-h-[100px]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Inside Entry Affiliate Recommendation */}
      {affiliates.length > 0 && (
        <div className="pt-2">
          <AffiliateCard affiliate={affiliates[0]} layout="horizontal" />
        </div>
      )}

      {/* End of Entry Ad slot */}
      <AdBanner slot="end_of_entry" reserveHeight="min-h-[90px]" />

      {/* Social Share Section */}
      <div className="p-6 bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl space-y-3">
        <h3 className="font-bold text-sm text-stone-900 dark:text-white">
          ही आश्चर्यकारक माहिती मित्रांसोबत शेअर करा:
        </h3>
        <ShareButtons title={title} summary={summary} />
      </div>

      {/* Related Entries */}
      {relatedEntries.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">
            {t('related_entries')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEntries.map(rel => (
              <EntryCard
                key={rel.id}
                entry={rel}
                onTryItClick={(e) => setActiveTryItModal(e)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Interactive Modal */}
      {activeTryItModal && (
        <TryItModal
          entry={activeTryItModal}
          onClose={() => setActiveTryItModal(null)}
        />
      )}
    </article>
  );
};
