import React, { useState } from 'react';
import { Settings, Save, Check, ShieldCheck, Phone, Mail, Building } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AdminSettings: React.FC = () => {
  const { siteSettings, updateSettings } = useData();
  const [form, setForm] = useState(siteSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            साइट सेटिंग्ज (Site Settings & Branding)
          </h1>
          <p className="text-xs text-stone-500">
            D COMPANY संपर्क माहिती, ब्रँडिंग आणि कायदेशीर सूचना.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'सेव्ह झाले!' : 'बदल सेव्ह करा'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company & Contact Details (D COMPANY mandatory) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
          <h2 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-600" />
            <span>कंपनी आणि अधिकृत संपर्क माहिती (D COMPANY)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                कंपनी नाव (Company Name) *
              </label>
              <input
                type="text"
                required
                value={form.companyName || 'D COMPANY'}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-bold text-teal-700 dark:text-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                संकेतस्थळ नाव (Site Title) *
              </label>
              <input
                type="text"
                required
                value={form.siteName || 'DC-Body'}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                मोबाईल / व्हॉट्सअ‍ॅप नंबर *
              </label>
              <input
                type="text"
                required
                value={form.contactPhone || '+91 9607636444'}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                अधिकृत ईमेल पत्ता *
              </label>
              <input
                type="email"
                required
                value={form.contactEmail || 'dcompany1410@gmail.com'}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Disclaimer Notice Text in 3 languages */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
          <h2 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>वैद्यकीय अस्वीकरण मजकूर (Medical Disclaimer Text)</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                मराठी अस्वीकरण (MR)
              </label>
              <textarea
                rows={2}
                value={form.disclaimerNotice?.mr || ''}
                onChange={(e) => setForm({
                  ...form,
                  disclaimerNotice: { ...form.disclaimerNotice, mr: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                हिंदी अस्वीकरण (HI)
              </label>
              <textarea
                rows={2}
                value={form.disclaimerNotice?.hi || ''}
                onChange={(e) => setForm({
                  ...form,
                  disclaimerNotice: { ...form.disclaimerNotice, hi: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                English Disclaimer (EN)
              </label>
              <textarea
                rows={2}
                value={form.disclaimerNotice?.en || ''}
                onChange={(e) => setForm({
                  ...form,
                  disclaimerNotice: { ...form.disclaimerNotice, en: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Maintenance mode and Analytics */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                देखभाल मोड (Maintenance Mode)
              </h3>
              <p className="text-xs text-stone-500">
                चालू केल्यास सर्वसामान्य वाचकांसाठी तात्पुरती देखभाल स्क्रीन दिसेल.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.maintenanceMode}
                onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
