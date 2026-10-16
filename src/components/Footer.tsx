import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Check, 
  AlertCircle, 
  Rss, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { AdBanner } from './AdBanner';

export const Footer: React.FC = () => {
  const { t, language, getLocalized } = useI18n();
  const { subscribeEmail, siteSettings } = useData();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    const res = await subscribeEmail(email, language);
    if (res.success) {
      setStatus('success');
      setEmail('');
    } else if (res.alreadyExists) {
      setStatus('already');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-24 md:pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Footer Ad Placement */}
        <AdBanner slot="footer" reserveHeight="min-h-[100px]" />

        {/* Newsletter Box */}
        <div className="bg-gradient-to-r from-stone-800 to-stone-800/60 border border-stone-700/60 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {t('newsletter_title')}
            </h3>
            <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
              {t('newsletter_sub')}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter_placeholder')}
                required
                className="flex-1 bg-stone-900/90 border border-stone-700 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-stone-500 focus:outline-hidden focus:border-teal-400 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-stone-950 transition-colors shrink-0 flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <span>{t('newsletter_btn')}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'success' && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>{t('newsletter_success')}</span>
              </p>
            )}
            {status === 'already' && (
              <p className="text-xs text-amber-400 flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t('newsletter_already')}</span>
              </p>
            )}
          </form>
        </div>

        {/* 4-column Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {/* Col 1: Brand & Notice */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-stone-950 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                DC-Body
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              {getLocalized(siteSettings?.disclaimerNotice) || t('medical_disclaimer')}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('nav_entries')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/entries" className="hover:text-teal-400 transition-colors">
                  {t('nav_entries')}
                </Link>
              </li>
              <li>
                <Link to="/regions" className="hover:text-teal-400 transition-colors">
                  {t('nav_regions')}
                </Link>
              </li>
              <li>
                <Link to="/kinds" className="hover:text-teal-400 transition-colors">
                  {t('nav_kinds')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-teal-400 transition-colors">
                  {t('nav_blog')}
                </Link>
              </li>
              <li>
                <Link to="/suggest" className="hover:text-teal-400 transition-colors">
                  {t('nav_suggest')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Editorial */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              माहिती व धोरणे / Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/page/about" className="hover:text-teal-400 transition-colors">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link to="/page/disclaimer" className="hover:text-teal-400 transition-colors">
                  वैद्यकीय अस्वीकरण (Disclaimer)
                </Link>
              </li>
              <li>
                <Link to="/page/privacy" className="hover:text-teal-400 transition-colors">
                  गोपनीयता धोरण (Privacy)
                </Link>
              </li>
              <li>
                <Link to="/page/terms" className="hover:text-teal-400 transition-colors">
                  नियम व अटी (Terms)
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="hover:text-teal-400 transition-colors">
                  {t('nav_advertise')}
                </Link>
              </li>
              <li>
                <Link to="/sitemap-rss" className="hover:text-teal-400 transition-colors flex items-center gap-1 text-stone-400">
                  <Rss className="w-3 h-3 text-amber-500" />
                  <span>Sitemap & RSS Feeds</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: D COMPANY Official Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_company')}
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-stone-400">
                संचालन व व्यवस्थापन: <span className="text-white font-semibold">D COMPANY</span>
              </p>
              <a
                href="tel:+919607636444"
                className="flex items-center gap-2 hover:text-white transition-colors py-1 text-teal-400"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>+91 9607636444</span>
              </a>
              <a
                href="https://wa.me/919607636444?text=Hello%20D%20COMPANY%20DC-Body"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors py-1 text-emerald-400"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: +91 9607636444</span>
              </a>
              <a
                href="mailto:dcompany1410@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors py-1 text-stone-300"
              >
                <Mail className="w-3.5 h-3.5 shrink-0 text-teal-400" />
                <span>dcompany1410@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} D COMPANY. DC-Body. {t('footer_rights')}</p>
          <div className="flex items-center gap-4">
            <Link to="/page/disclaimer" className="hover:underline">
              Not Medical Advice
            </Link>
            <span>•</span>
            <Link to="/admin" className="hover:underline text-stone-400">
              Admin Access
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Ad */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-1 flex justify-center">
        <AdBanner slot="mobile_sticky" reserveHeight="min-h-[50px]" className="!my-0" />
      </div>
    </footer>
  );
};
