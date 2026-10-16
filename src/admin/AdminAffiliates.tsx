import React, { useState } from 'react';
import { ShoppingBag, Plus, Edit2, Trash2, ExternalLink, MousePointerClick, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';
import { AffiliateBlock, Language } from '../types';

export const AdminAffiliates: React.FC = () => {
  const { affiliates, updateAffiliate } = useData();
  const { getLocalized } = useI18n();

  const [editingAffiliate, setEditingAffiliate] = useState<AffiliateBlock | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = async (aff: AffiliateBlock) => {
    await updateAffiliate(aff.id, { enabled: !aff.enabled });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAffiliate) return;
    await updateAffiliate(editingAffiliate.id, editingAffiliate);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingAffiliate(null);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            अ‍ॅफिलिएट उत्पादने (Affiliate Blocks)
          </h1>
          <p className="text-xs text-stone-500">
            लेखांच्या आत आणि साइडबारमध्ये शिफारस केलेले प्रॉडक्ट ब्लॉक्स.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {affiliates.map((aff) => (
          <div
            key={aff.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-full">
                  {aff.placement}
                </span>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-mono font-bold" title="Total clicks">
                    <MousePointerClick className="w-3.5 h-3.5" />
                    <span>{aff.clicks || 0}</span>
                  </span>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aff.enabled}
                      onChange={() => handleToggle(aff)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-300 peer-focus:outline-hidden rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>

              {aff.imageUrl && (
                <img src={aff.imageUrl} alt="" className="w-full h-32 rounded-xl object-cover" />
              )}

              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                  {getLocalized(aff.title)}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                  {getLocalized(aff.description)}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <a
                href={aff.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1"
              >
                <span>{getLocalized(aff.buttonText) || 'View Product'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setEditingAffiliate({ ...aff })}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200"
              >
                संपादित करा (Edit)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingAffiliate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              अ‍ॅफिलिएट ब्लॉक संपादित करा
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  उत्पादन शीर्षक (Title MR)
                </label>
                <input
                  type="text"
                  value={editingAffiliate.title.mr}
                  onChange={(e) => setEditingAffiliate({
                    ...editingAffiliate,
                    title: { ...editingAffiliate.title, mr: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  उत्पादन शीर्षक (Title EN)
                </label>
                <input
                  type="text"
                  value={editingAffiliate.title.en}
                  onChange={(e) => setEditingAffiliate({
                    ...editingAffiliate,
                    title: { ...editingAffiliate.title, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  टार्गेट लिंक / WhatsApp URL
                </label>
                <input
                  type="url"
                  value={editingAffiliate.targetUrl}
                  onChange={(e) => setEditingAffiliate({ ...editingAffiliate, targetUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  इमेज लिंक (Image URL)
                </label>
                <input
                  type="url"
                  value={editingAffiliate.imageUrl}
                  onChange={(e) => setEditingAffiliate({ ...editingAffiliate, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingAffiliate(null)}
                  className="px-4 py-2 rounded-xl text-xs text-stone-500 hover:bg-stone-100"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700"
                >
                  {saveSuccess ? 'जतन झाले!' : 'सेव्ह करा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
