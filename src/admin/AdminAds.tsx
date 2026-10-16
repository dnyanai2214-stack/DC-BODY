import React, { useState } from 'react';
import { 
  DollarSign, 
  Megaphone, 
  Check, 
  Eye, 
  MousePointerClick, 
  Code, 
  FileText, 
  Save, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { AdPlacement, AdSlotConfig } from '../types';

export const AdminAds: React.FC = () => {
  const { adsConfig, updateAdsConfig } = useData();
  const [config, setConfig] = useState(adsConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const slotsList: { id: AdPlacement; label: string; desc: string }[] = [
    { id: 'header_banner', label: 'हेडर बॅनर (Header Banner)', desc: 'मुख्यपृष्ठ आणि सर्व पानांच्या सर्वात वर' },
    { id: 'below_hero', label: 'हिरो खालील बॅनर (Below Hero)', desc: 'सर्च बार आणि मुख्य मथळ्याच्या खाली' },
    { id: 'in_feed', label: 'इन-फीड बॅनर (In-Feed)', desc: 'नोंदींच्या ग्रिडमध्ये दर N नोंदींनंतर' },
    { id: 'sidebar', label: 'साइडबार बॅनर (Sticky Sidebar)', desc: 'डेस्कटॉप साइडबारमध्ये स्क्रोल होताना' },
    { id: 'inside_entry', label: 'लेखातील बॅनर (Inside Entry)', desc: 'लक्षणाच्या लेखात दुसऱ्या परिच्छेदानंतर' },
    { id: 'end_of_entry', label: 'लेखाच्या शेवटी (End of Entry)', desc: 'लेखाच्या अगदी शेवटी' },
    { id: 'footer', label: 'फूटर बॅनर (Footer Banner)', desc: 'फूटरच्या वर सर्व पानांवर' },
    { id: 'mobile_sticky', label: 'मोबाईल स्टिकी बॉटम (Mobile Sticky)', desc: 'मोबाईल स्क्रीनच्या तळाशी स्थिर' },
    { id: 'interstitial', label: 'इंटरस्टिशियल पॉपअप (Interstitial Modal)', desc: 'पूर्ण स्क्रीन प्रायोजक पॉपअप' }
  ];

  const handleSlotToggle = (slot: AdPlacement, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      slots: {
        ...prev.slots,
        [slot]: {
          ...prev.slots[slot],
          enabled
        }
      }
    }));
  };

  const handleSlotChange = (slot: AdPlacement, updates: Partial<AdSlotConfig>) => {
    setConfig(prev => ({
      ...prev,
      slots: {
        ...prev.slots,
        [slot]: {
          ...prev.slots[slot],
          ...updates
        }
      }
    }));
  };

  const handleSave = async () => {
    await updateAdsConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            जाहिरात व कमाई व्यवस्थापन (Ads & Monetization)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Google AdSense, Adsterra, Media.net, थेट स्पॉन्सर बॅनर आणि ads.txt व्यवस्थापन.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'सेटिंग्ज सेव्ह झाल्या!' : 'बदल सेव्ह करा'}</span>
        </button>
      </div>

      {/* Global Monetization Settings (Publisher ID, inFeed Interval) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
        <h2 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-amber-500" />
          <span>ग्लोबल जाहिरात सेटिंग्ज</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Google AdSense Publisher ID
            </label>
            <input
              type="text"
              value={config.adsensePublisherId}
              onChange={(e) => setConfig({ ...config, adsensePublisherId: e.target.value })}
              placeholder="ca-pub-9607636444000000"
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              इन-फीड जाहिरात अंतर (दर N नोंदींनंतर)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={config.inFeedInterval || 3}
              onChange={(e) => setConfig({ ...config, inFeedInterval: parseInt(e.target.value) || 3 })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Individual Ad Slots List */}
      <div className="space-y-4">
        <h2 className="font-bold text-sm text-stone-900 dark:text-white">
          सर्व जाहिरात स्लॉट्स (9 Placements)
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {slotsList.map((slot) => {
            const currentSlot = config.slots[slot.id] || {
              enabled: false,
              type: 'sponsor',
              impressions: 0,
              clicks: 0
            };

            return (
              <div
                key={slot.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                      {slot.label}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      {slot.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Impressions & Clicks count */}
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
                      <span className="flex items-center gap-1" title="Impressions">
                        <Eye className="w-3.5 h-3.5 text-stone-400" />
                        <span>{currentSlot.impressions || 0}</span>
                      </span>
                      <span className="flex items-center gap-1" title="Clicks">
                        <MousePointerClick className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-bold text-amber-600">{currentSlot.clicks || 0}</span>
                      </span>
                    </div>

                    {/* Enable toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentSlot.enabled}
                        onChange={(e) => handleSlotToggle(slot.id, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>

                {currentSlot.enabled && (
                  <div className="space-y-4 pt-1 animate-in fade-in">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                        प्रकार:
                      </label>
                      <div className="flex items-center gap-2">
                        {(['sponsor', 'adsense', 'custom'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleSlotChange(slot.id, { type: t })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              currentSlot.type === t
                                ? 'bg-teal-600 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                            }`}
                          >
                            {t === 'sponsor' ? 'Direct Sponsor Banner' : t === 'adsense' ? 'Google AdSense' : 'Custom Script/HTML'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {currentSlot.type === 'sponsor' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                            स्पॉन्सर प्रतिमा लिंक (Image URL)
                          </label>
                          <input
                            type="url"
                            value={currentSlot.sponsorImageUrl || ''}
                            onChange={(e) => handleSlotChange(slot.id, { sponsorImageUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                            लक्ष्य लिंक (Target Link / WhatsApp)
                          </label>
                          <input
                            type="url"
                            value={currentSlot.sponsorLinkUrl || ''}
                            onChange={(e) => handleSlotChange(slot.id, { sponsorLinkUrl: e.target.value })}
                            placeholder="https://wa.me/919607636444"
                            className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                            भाषा लक्ष्य (Language Target)
                          </label>
                          <select
                            value={currentSlot.sponsorTargetLanguage || 'all'}
                            onChange={(e) => handleSlotChange(slot.id, { sponsorTargetLanguage: e.target.value as any })}
                            className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
                          >
                            <option value="all">सर्व भाषा (All Languages)</option>
                            <option value="mr">मराठी फक्त (Marathi only)</option>
                            <option value="hi">हिंदी फक्त (Hindi only)</option>
                            <option value="en">English only</option>
                          </select>
                        </div>
                      </div>
                    ) : currentSlot.type === 'custom' ? (
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Custom HTML / JavaScript Code (Adsterra, Media.net, etc.)
                        </label>
                        <textarea
                          rows={3}
                          value={currentSlot.customHtml || ''}
                          onChange={(e) => handleSlotChange(slot.id, { customHtml: e.target.value })}
                          placeholder="<script>...</script>"
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 text-emerald-400 font-mono text-xs border border-stone-700"
                        />
                      </div>
                    ) : (
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-700 dark:text-blue-300">
                        Google AdSense स्वयंचलितपणे <code className="font-mono">{config.adsensePublisherId}</code> या खात्यावरून जाहिराती दाखवेल.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ads.txt Editor */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-3 shadow-xs">
        <h2 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600" />
          <span>ads.txt संपादक (Ads.txt Editor)</span>
        </h2>
        <p className="text-xs text-stone-500">
          Google AdSense आणि Ad Exchange च्या अधिकृत व्हेरिफिकेशनसाठी ads.txt डेटा टाका.
        </p>
        <textarea
          rows={4}
          value={config.adsTxt}
          onChange={(e) => setConfig({ ...config, adsTxt: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-stone-900 text-amber-300 font-mono text-xs border border-stone-700"
          placeholder="google.com, pub-9607636444000000, DIRECT, f08c47fec0942fa0"
        />
      </div>

      {/* Header and Footer Scripts Injection */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
        <h2 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
          <Code className="w-4 h-4 text-purple-600" />
          <span>हेडर व फूटर स्क्रिप्ट्स (Custom Scripts Injection)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Header Script (Head Tag)
            </label>
            <textarea
              rows={3}
              value={config.customHeaderScript}
              onChange={(e) => setConfig({ ...config, customHeaderScript: e.target.value })}
              placeholder="<!-- Google Tag Manager, Analytics, etc. -->"
              className="w-full px-3 py-2 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs border border-stone-700"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Footer Script (Body End)
            </label>
            <textarea
              rows={3}
              value={config.customFooterScript}
              onChange={(e) => setConfig({ ...config, customFooterScript: e.target.value })}
              placeholder="<!-- Conversion tracking scripts -->"
              className="w-full px-3 py-2 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs border border-stone-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
