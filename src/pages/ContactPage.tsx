import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';

export const ContactPage: React.FC = () => {
  const { t } = useI18n();
  const { submitInboxMessage, siteSettings } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    await submitInboxMessage({
      name,
      email,
      phone,
      type: 'contact',
      message
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white">
          {t('contact_title')}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-xl mx-auto">
          तुमच्या काही शंका, अभिप्राय किंवा सहकार्यासाठी D COMPANY व्यवस्थापनाशी थेट संपर्क साधा.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              अधिकृत कंपनी
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white mt-1">
              {siteSettings.companyName || 'D COMPANY'}
            </h2>
          </div>

          <div className="space-y-4 text-xs md:text-sm">
            <a
              href="tel:+919607636444"
              className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 hover:border-teal-500 transition-colors"
            >
              <div className="p-2 bg-teal-500/10 text-teal-600 rounded-xl">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">फोन / Mobile</span>
                <span className="font-bold text-stone-900 dark:text-white">+91 9607636444</span>
              </div>
            </a>

            <a
              href="https://wa.me/919607636444?text=Hello%20D%20COMPANY%20DC-Body"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 hover:border-emerald-500 transition-colors"
            >
              <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">व्हॉट्सअ‍ॅप / WhatsApp</span>
                <span className="font-bold text-stone-900 dark:text-white">+91 9607636444</span>
              </div>
            </a>

            <a
              href="mailto:dcompany1410@gmail.com"
              className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 hover:border-teal-500 transition-colors"
            >
              <div className="p-2 bg-teal-500/10 text-teal-600 rounded-xl">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">ईमेल / Official Email</span>
                <span className="font-bold text-stone-900 dark:text-white">dcompany1410@gmail.com</span>
              </div>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            कृपया लक्षात घ्या: DC-Body हे वैद्यकीय निदान किंवा इमर्जन्सी सल्ला देत नाही. वैद्यकीय समस्येसाठी त्वरित स्थानिक डॉक्टरांचा सल्ला घ्यावा.
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">
            आम्हाला संदेश पाठवा
          </h2>

          {submitted ? (
            <div className="p-6 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
              <h3 className="font-bold text-teal-900 dark:text-teal-300">
                संदेश पाठवला गेला आहे!
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                धन्यवाद! आमची टीम लवकरच ईमेलवर उत्तर देईल.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {t('form_name')} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {t('form_email')} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  फोन नंबर (ऐच्छिक)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  संदेश *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'पाठवत आहे...' : 'संदेश पाठवा'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
