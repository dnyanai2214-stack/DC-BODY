import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const MedicalNoticeBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useI18n();

  if (compact) {
    return (
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1.5 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2 text-center">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        <span>{t('medical_disclaimer')}</span>
      </div>
    );
  }

  return (
    <aside aria-label="Medical Disclaimer" className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-teal-500/10 border border-amber-500/30 dark:border-amber-500/20 rounded-2xl p-4 my-4 flex items-start gap-3.5 shadow-xs">
      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
        <ShieldAlert className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <div className="text-xs font-bold tracking-wider uppercase text-amber-800 dark:text-amber-300">
          महत्त्वाची नोंद / आवश्यक सूचना / Essential Notice
        </div>
        <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {t('medical_disclaimer')}
        </p>
      </div>
    </aside>
  );
};
