import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { Entry } from '../types';
import { useI18n } from '../lib/i18n';

interface TryItModalProps {
  entry: Entry | null;
  onClose: () => void;
}

export const TryItModal: React.FC<TryItModalProps> = ({ entry, onClose }) => {
  const { t, getLocalized } = useI18n();
  const [done, setDone] = useState(false);

  if (!entry) return null;

  const title = getLocalized(entry.title);
  const instructions = getLocalized(entry.tryItInstructions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {t('badge_try_it')}
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-stone-100 dark:bg-stone-800/60 rounded-2xl p-4 border border-stone-200/60 dark:border-stone-700/60 space-y-3">
          <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            {t('try_it_steps')}
          </div>
          <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
            {instructions || getLocalized(entry.summary)}
          </p>
        </div>

        {/* Action feedback */}
        <div className="pt-2 flex items-center justify-between">
          {!done ? (
            <button
              onClick={() => setDone(true)}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>मी करून पाहिले! / I Tried It!</span>
            </button>
          ) : (
            <div className="w-full p-3 bg-teal-500/15 border border-teal-500/30 rounded-xl text-center space-y-2">
              <p className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                🎉 छान! हे तुमच्या शरीराचे एक नैसर्गिक आश्चर्य आहे.
              </p>
              <button
                onClick={() => setDone(false)}
                className="text-xs text-stone-600 dark:text-stone-400 hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>पुन्हा करा / Reset</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
