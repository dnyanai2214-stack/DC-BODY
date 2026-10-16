import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export const CookieBanner: React.FC = () => {
  const { t } = useI18n();
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('dcbody_cookie_consent');
    if (!saved) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dcbody_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-md text-stone-100 p-4 rounded-2xl shadow-2xl border border-stone-700/80 transition-all animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 flex-1">
          <p className="text-xs text-stone-300 leading-relaxed">
            {t('cookie_notice')}{' '}
            <Link to="/page/privacy" className="text-teal-400 hover:underline font-medium">
              {t('cookie_privacy')}
            </Link>
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t('cookie_accept')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
