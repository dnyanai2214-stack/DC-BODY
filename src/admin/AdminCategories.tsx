import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, Check, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';
import { BodyRegion, BodyKind, Language } from '../types';

export const AdminCategories: React.FC = () => {
  const { regions, kinds } = useData();
  const { getLocalized } = useI18n();

  const [activeTab, setActiveTab] = useState<'regions' | 'kinds'>('regions');

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            अवयव व प्रकार व्यवस्थापक (Taxonomy Manager)
          </h1>
          <p className="text-xs text-stone-500">
            १२ शरीराचे अवयव आणि ७ प्रकार (३ भाषांमध्ये समर्थित).
          </p>
        </div>

        <div className="flex items-center bg-stone-200 dark:bg-stone-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('regions')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'regions' ? 'bg-white dark:bg-stone-900 text-teal-600 shadow-xs' : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            शरीराचे अवयव ({regions.length})
          </button>
          <button
            onClick={() => setActiveTab('kinds')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'kinds' ? 'bg-white dark:bg-stone-900 text-teal-600 shadow-xs' : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            प्रकार ({kinds.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeTab === 'regions' ? (
          regions.map((reg) => (
            <div
              key={reg.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md">
                  ID: {reg.id}
                </span>
                <span className="text-xs text-stone-400 font-mono">Icon: {reg.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                {reg.name.mr} / {reg.name.hi} / {reg.name.en}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {getLocalized(reg.description)}
              </p>
            </div>
          ))
        ) : (
          kinds.map((k) => (
            <div
              key={k.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md">
                  ID: {k.id}
                </span>
                <span className="text-xs text-stone-400 font-mono">Icon: {k.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                {k.name.mr} / {k.name.hi} / {k.name.en}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {getLocalized(k.description)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
