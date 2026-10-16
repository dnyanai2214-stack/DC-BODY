import React, { useState } from 'react';
import { 
  Megaphone, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';

export const AdvertisePage: React.FC = () => {
  const { t } = useI18n();
  const { submitInboxMessage, siteSettings } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [slotInterest, setSlotInterest] = useState('header_banner');
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
      type: 'advertise',
      message: `[Slot: ${slotInterest}] ${message}`
    });
    setLoading(false);
    setSubmitted(true);
  };

  const adFormats = [
    {
      title: 'हेडर किंवा बिलो-हिरो बॅनर',
      enTitle: 'Top Header or Below-Hero Banner',
      desc: 'संकेतस्थळ उघडताच सर्वप्रथम दिसणारी मुख्य जागा. सर्वाधिक ब्रँड व्हिजिबिलिटी.',
      rate: '₹9,999 / महिना (Custom Rates Available)'
    },
    {
      title: 'इन-फीड प्रायोजित कार्ड्स (In-Feed)',
      enTitle: 'In-Feed Sponsored Cards',
      desc: 'वाचकांच्या वाचनाच्या ओघात दर ३ नोंदींनंतर दिसणारी आकर्षक जाहिरात.',
      rate: '₹5,999 / महिना'
    },
    {
      title: 'लेखातील इन-एंट्री बॅनर (Inside Entry)',
      enTitle: 'In-Entry / Native Content Placement',
      desc: 'वाचक जेव्हा एखाद्या लक्षणाचा सविस्तर लेख वाचतो तेव्हा परिच्छेदांच्या मधे दिसणारी जागा.',
      rate: '₹7,499 / महिना'
    },
    {
      title: 'प्रायोजित लेख (Sponsored Article)',
      enTitle: 'Sponsored Article / Clinic Feature',
      desc: 'तुमच्या हेल्थकेअर प्रॉडक्ट, क्लिनिक किंवा सेवेवर आधारित सविस्तर माहितीपूर्ण लेख.',
      rate: '₹14,999 (कायमस्वरूपी प्रकाशित)'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <Megaphone className="w-3.5 h-3.5" />
          <span>D COMPANY अधिकृत जाहिरात दालन</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('advertise_title')}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          {t('advertise_sub')}. मराठी, हिंदी आणि इंग्रजी भाषिक जागरूक वाचकांपर्यंत आपला ब्रँड पोहोचवा.
        </p>
      </div>

      {/* Direct Contact Card for D COMPANY */}
      <div className="bg-gradient-to-r from-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-teal-400 font-bold uppercase tracking-wider text-xs">
            तातडीने संपर्क साधा / Direct Business Desk
          </span>
          <h2 className="text-2xl font-bold">
            कंपनी: {siteSettings.companyName || 'D COMPANY'}
          </h2>
          <p className="text-xs text-stone-300">
            जाहिरात, ब्रँड इंटिग्रेशन आणि प्रायोजकत्वासाठी थेट कॉल किंवा व्हॉट्सअ‍ॅप करा.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/919607636444?text=Hello%20D%20COMPANY%20I%20want%20to%20advertise%20on%20DC-Body"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition-colors flex items-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: +91 9607636444</span>
          </a>
          <a
            href="tel:+919607636444"
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-teal-400" />
            <span>कॉल करा</span>
          </a>
        </div>
      </div>

      {/* Ad Formats & Rate Card */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
          जाहिरात स्लॉट्स आणि दरपत्रक (Ad Slots & Rates)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adFormats.map((fmt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                  {fmt.enTitle}
                </span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  {fmt.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {fmt.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500">अंदाजे दर:</span>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{fmt.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement Proposal Form */}
      <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            जाहिरात प्रस्ताव पाठवा (Inquiry Form)
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            हा फॉर्म भरल्यास आमची D COMPANY टीम २४ तासांत आपल्याशी संपर्क करेल.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
            <h3 className="font-bold text-lg text-teal-900 dark:text-teal-300">
              प्रस्ताव यशस्वीरित्या पाठवला आहे!
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              D COMPANY टीम लवकरच ईमेल किंवा व्हॉट्सअ‍ॅपवर आपल्याशी संपर्क साधेल.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  नाव / कंपनी नाव *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल कदम / अ‍ॅपेक्स क्लिनिक"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  ईमेल पत्ता *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  मोबाईल / व्हॉट्सअ‍ॅप नंबर
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  निवडलेला स्लॉट
                </label>
                <select
                  value={slotInterest}
                  onChange={(e) => setSlotInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
                >
                  <option value="header_banner">टॉप हेडर बॅनर</option>
                  <option value="below_hero">बिलो-हिरो बॅनर</option>
                  <option value="in_feed">इन-फीड प्रायोजित कार्ड</option>
                  <option value="inside_entry">लेखातील इन-एंट्री बॅनर</option>
                  <option value="sponsored_article">प्रायोजित लेख (Sponsored Article)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                तुमच्या ब्रँड किंवा जाहिरातीचा तपशील *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="आपल्या उत्पादनाची किंवा ब्रँडची माहिती, बजेट आणि कालावधी लिहा..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'पाठवत आहे...' : 'जाहिरात प्रस्ताव सबमिट करा'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
