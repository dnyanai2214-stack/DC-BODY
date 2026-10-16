import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { MedicalNoticeBanner } from '../components/MedicalNoticeBanner';

export const SuggestEntryPage: React.FC = () => {
  const { t, getLocalized } = useI18n();
  const { regions, submitSuggestion } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bodyRegion, setBodyRegion] = useState(regions[0]?.id || 'brain');
  const [howCommon, setHowCommon] = useState('common');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setLoading(true);
    await submitSuggestion({
      title,
      description,
      bodyRegion,
      howCommon,
      name,
      email
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>समुदाय योगदान / Community Contribution</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white">
          {t('suggest_title')}
        </h1>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
          {t('suggest_sub')}
        </p>
      </div>

      <MedicalNoticeBanner />

      <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">
              {t('form_success')}
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              आमची संपादकीय टीम या लक्षणामागील वैज्ञानिक तथ्यांची पडताळणी करेल आणि पडताळणी झाल्यावर DC-Body ज्ञानकोशात प्रसिद्ध करेल.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setDescription('');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              आणखी एक नोंद सुचवा
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {t('form_title')} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="उदा. डोळे चोळल्यावर दिसणारे रंग, खाताना जबड्याचा आवाज..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {t('form_region')}
                </label>
                <select
                  value={bodyRegion}
                  onChange={(e) => setBodyRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {getLocalized(r.name)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  किती लोकांमध्ये आढळते असा अंदाज आहे?
                </label>
                <select
                  value={howCommon}
                  onChange={(e) => setHowCommon(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-teal-500"
                >
                  <option value="very_common">अतिशय सामान्य (80%+)</option>
                  <option value="common">सामान्य (~50%)</option>
                  <option value="uncommon">कमी लोकांमध्ये (10-20%)</option>
                  <option value="rare">दुर्मिळ (&lt;5%)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {t('form_desc')} *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="शरीरात नेमके काय घडते? आवाज येतो, थरकाप होतो की दृष्टीभ्रम? ते कधी घडते?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {t('form_name')} (ऐच्छिक)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="तुमचे नाव"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {t('form_email')} (ऐच्छिक)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="अद्यतने मिळवण्यासाठी ईमेल"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? t('form_submitting') : t('form_submit')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
