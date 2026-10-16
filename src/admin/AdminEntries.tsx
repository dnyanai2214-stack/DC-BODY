import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Sparkles, 
  Check, 
  Eye, 
  X, 
  Upload, 
  Download, 
  Globe, 
  Filter,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';
import { Entry, Language, LocalizedText } from '../types';
import { translateTextWithGemini } from '../lib/gemini';

export const AdminEntries: React.FC = () => {
  const { entries, regions, kinds, createEntry, updateEntry, deleteEntry, duplicateEntry } = useData();
  const { getLocalized } = useI18n();

  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modal / Drawer state
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  // Form State
  const [formSlug, setFormSlug] = useState('');
  const [formTitle, setFormTitle] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formSummary, setFormSummary] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formBody, setFormBody] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formTryItInstructions, setFormTryItInstructions] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formRegionId, setFormRegionId] = useState(regions[0]?.id || 'brain');
  const [formKindId, setFormKindId] = useState(kinds[0]?.id || 'trick');
  const [formTags, setFormTags] = useState('');
  const [formHowCommon, setFormHowCommon] = useState<'very_common' | 'common' | 'uncommon' | 'rare' | 'very_rare'>('common');
  const [formIsTryIt, setFormIsTryIt] = useState(false);
  const [formIsFeelsScary, setFormIsFeelsScary] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsSponsored, setFormIsSponsored] = useState(false);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');

  // Active language tab in editor: 'mr' | 'hi' | 'en'
  const [activeLangTab, setActiveLangTab] = useState<Language>('mr');
  const [translating, setTranslating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filtered list
  const filteredList = useMemo(() => {
    return entries.filter(e => {
      if (filterStatus !== 'all' && e.status !== filterStatus) return false;
      if (filterRegion !== 'all' && e.regionId !== filterRegion) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const t = (e.title.mr + e.title.hi + e.title.en).toLowerCase();
        return t.includes(q) || e.slug.includes(q);
      }
      return true;
    });
  }, [entries, filterStatus, filterRegion, search]);

  const openNewEntry = () => {
    setEditingEntryId(null);
    setFormSlug('');
    setFormTitle({ mr: '', hi: '', en: '' });
    setFormSummary({ mr: '', hi: '', en: '' });
    setFormBody({ mr: '', hi: '', en: '' });
    setFormTryItInstructions({ mr: '', hi: '', en: '' });
    setFormRegionId(regions[0]?.id || 'brain');
    setFormKindId(kinds[0]?.id || 'trick');
    setFormTags('brain, reflex');
    setFormHowCommon('common');
    setFormIsTryIt(false);
    setFormIsFeelsScary(false);
    setFormIsFeatured(false);
    setFormIsSponsored(false);
    setFormImageUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80');
    setFormStatus('published');
    setActiveLangTab('mr');
    setIsEditing(true);
  };

  const openEditEntry = (e: Entry) => {
    setEditingEntryId(e.id);
    setFormSlug(e.slug);
    setFormTitle(e.title || { mr: '', hi: '', en: '' });
    setFormSummary(e.summary || { mr: '', hi: '', en: '' });
    setFormBody(e.body || { mr: '', hi: '', en: '' });
    setFormTryItInstructions(e.tryItInstructions || { mr: '', hi: '', en: '' });
    setFormRegionId(e.regionId);
    setFormKindId(e.kindId);
    setFormTags(e.tags?.join(', ') || '');
    setFormHowCommon(e.howCommon);
    setFormIsTryIt(!!e.isTryIt);
    setFormIsFeelsScary(!!e.isFeelsScary);
    setFormIsFeatured(!!e.isFeatured);
    setFormIsSponsored(!!e.isSponsored);
    setFormImageUrl(e.imageUrl);
    setFormStatus(e.status === 'published' ? 'published' : 'draft');
    setActiveLangTab('mr');
    setIsEditing(true);
  };

  // "Auto-translate with Gemini" button handler!
  const handleAutoTranslate = async () => {
    setTranslating(true);
    const sourceLang = activeLangTab;
    const targetLangs: Language[] = (['mr', 'hi', 'en'] as Language[]).filter(l => l !== sourceLang);

    try {
      // 1. Translate Title
      if (formTitle[sourceLang]?.trim()) {
        const trans = await translateTextWithGemini(formTitle[sourceLang], sourceLang, targetLangs);
        setFormTitle(prev => ({
          ...prev,
          mr: trans.mr || prev.mr,
          hi: trans.hi || prev.hi,
          en: trans.en || prev.en,
        }));
      }

      // 2. Translate Summary
      if (formSummary[sourceLang]?.trim()) {
        const trans = await translateTextWithGemini(formSummary[sourceLang], sourceLang, targetLangs);
        setFormSummary(prev => ({
          ...prev,
          mr: trans.mr || prev.mr,
          hi: trans.hi || prev.hi,
          en: trans.en || prev.en,
        }));
      }

      // 3. Translate Body
      if (formBody[sourceLang]?.trim()) {
        const trans = await translateTextWithGemini(formBody[sourceLang], sourceLang, targetLangs);
        setFormBody(prev => ({
          ...prev,
          mr: trans.mr || prev.mr,
          hi: trans.hi || prev.hi,
          en: trans.en || prev.en,
        }));
      }

      // 4. Translate Try-It instructions if any
      if (formTryItInstructions[sourceLang]?.trim()) {
        const trans = await translateTextWithGemini(formTryItInstructions[sourceLang], sourceLang, targetLangs);
        setFormTryItInstructions(prev => ({
          ...prev,
          mr: trans.mr || prev.mr,
          hi: trans.hi || prev.hi,
          en: trans.en || prev.en,
        }));
      }
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setTranslating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formTags.split(',').map(s => s.trim()).filter(Boolean);
    const slug = formSlug.trim() || formTitle.en.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `entry-${Date.now()}`;

    const payload = {
      slug,
      title: formTitle,
      summary: formSummary,
      body: formBody,
      tryItInstructions: formTryItInstructions,
      regionId: formRegionId,
      kindId: formKindId,
      tags: tagArray,
      howCommon: formHowCommon,
      isTryIt: formIsTryIt,
      isFeelsScary: formIsFeelsScary,
      isFeatured: formIsFeatured,
      isSponsored: formIsSponsored,
      imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      status: formStatus
    };

    if (editingEntryId) {
      await updateEntry(editingEntryId, payload);
    } else {
      await createEntry(payload);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 800);
  };

  const handleDelete = async (id: string) => {
    if (confirm('ही नोंद कायमची हटवायची आहे का? (Are you sure you want to delete this entry?)')) {
      await deleteEntry(id);
    }
  };

  const handleDuplicate = async (id: string) => {
    await duplicateEntry(id);
  };

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dcbody_entries_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            नोंदी व्यवस्थापक (Body Entries Manager)
          </h1>
          <p className="text-xs text-stone-500">
            एकूण {entries.length} नोंदी | ३ भाषांमध्ये संपादन (मराठी, हिंदी, English)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportToJson}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5"
            title="Export entries as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={openNewEntry}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>नवीन नोंद जोडा</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="शीर्षक किंवा स्लग शोधा..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs focus:outline-hidden focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
          >
            <option value="all">सर्व अवयव (All Regions)</option>
            {regions.map(r => (
              <option key={r.id} value={r.id}>{getLocalized(r.name)}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
          >
            <option value="all">सर्व स्थिती (All Status)</option>
            <option value="published">प्रकाशित (Published)</option>
            <option value="draft">ड्राफ्ट (Draft)</option>
          </select>
        </div>
      </div>

      {/* Table of Entries */}
      <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">प्रतिमा & शीर्षक</th>
                <th className="p-4">अवयव / प्रकार</th>
                <th className="p-4">प्रमाण</th>
                <th className="p-4">वैशिष्ट्ये</th>
                <th className="p-4">वाचक</th>
                <th className="p-4">स्थिती</th>
                <th className="p-4 text-right">कृती</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 text-stone-800 dark:text-stone-200">
              {filteredList.map((entry) => (
                <tr key={entry.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.imageUrl}
                        alt=""
                        className="w-12 h-10 rounded-xl object-cover shrink-0 bg-stone-200"
                      />
                      <div className="min-w-0 max-w-xs">
                        <span className="font-bold text-stone-900 dark:text-white block truncate">
                          {entry.title.mr || entry.title.en}
                        </span>
                        <span className="text-[10px] text-stone-400 block truncate font-mono">
                          /{entry.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold block capitalize">{entry.regionId}</span>
                    <span className="text-[10px] text-stone-400 capitalize">{entry.kindId}</span>
                  </td>

                  <td className="p-4 font-mono text-[11px] text-stone-600 dark:text-stone-300">
                    {entry.howCommon}
                  </td>

                  <td className="p-4 space-x-1">
                    {entry.isTryIt && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-500/10 text-teal-700 dark:text-teal-300 font-semibold">
                        Try It
                      </span>
                    )}
                    {entry.isFeelsScary && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold">
                        Scary
                      </span>
                    )}
                    {entry.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-800 dark:text-amber-300 font-semibold">
                        Featured
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-bold text-teal-600 font-mono">
                    {entry.views || 0}
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      entry.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-stone-500/10 text-stone-500'
                    }`}>
                      {entry.status === 'published' ? 'प्रकाशित' : 'ड्राफ्ट'}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => openEditEntry(entry)}
                      className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(entry.id)}
                      className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Drawer */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-stone-900 dark:text-white">
                  {editingEntryId ? 'नोंद संपादित करा (Edit Entry)' : 'नवीन नोंद तयार करा (Create Entry)'}
                </h2>
                <p className="text-xs text-stone-500">
                  सर्व माहिती ३ भाषांमध्ये (मराठी, हिंदी, इंग्रजी) सेव्ह केली जाईल.
                </p>
              </div>

              {/* Gemini Auto-translate button */}
              <button
                type="button"
                onClick={handleAutoTranslate}
                disabled={translating}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${translating ? 'animate-spin' : ''}`} />
                <span>{translating ? 'Gemini भाषांतर करत आहे...' : 'Auto-translate with Gemini'}</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* 3-Language Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      भाषा निवडा (Active Language Tab):
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                    {(['mr', 'hi', 'en'] as Language[]).map(langCode => (
                      <button
                        key={langCode}
                        type="button"
                        onClick={() => setActiveLangTab(langCode)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeLangTab === langCode
                            ? 'bg-white dark:bg-stone-900 text-teal-600 dark:text-teal-400 shadow-xs'
                            : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                        }`}
                      >
                        {langCode === 'mr' ? 'मराठी (MR)' : langCode === 'hi' ? 'हिंदी (HI)' : 'English (EN)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multilingual Fields for Current Tab */}
                <div className="space-y-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      शीर्षक / Title ({activeLangTab.toUpperCase()}) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle[activeLangTab]}
                      onChange={(e) => setFormTitle(prev => ({ ...prev, [activeLangTab]: e.target.value }))}
                      placeholder={activeLangTab === 'mr' ? 'उदा. कानात घरघर निर्माण करण्याची क्षमता' : activeLangTab === 'hi' ? 'उदा. कानों में गड़गड़ाहट' : 'e.g. Ear Rumbling'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      थोडक्यात माहिती / Summary ({activeLangTab.toUpperCase()}) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formSummary[activeLangTab]}
                      onChange={(e) => setFormSummary(prev => ({ ...prev, [activeLangTab]: e.target.value }))}
                      placeholder="१-२ ओळींत सोपे स्पष्टीकरण..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      सविस्तर वैज्ञानिक माहिती / Detailed Body ({activeLangTab.toUpperCase()}) *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formBody[activeLangTab]}
                      onChange={(e) => setFormBody(prev => ({ ...prev, [activeLangTab]: e.target.value }))}
                      placeholder="सविस्तर जैविक व शारीरिक कारणे, स्नायूंची नावे आणि सुरक्षितता..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs leading-relaxed focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  {formIsTryIt && (
                    <div>
                      <label className="block text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">
                        प्रयोग कसा करायचा? / Try-It Instructions ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={formTryItInstructions[activeLangTab]}
                        onChange={(e) => setFormTryItInstructions(prev => ({ ...prev, [activeLangTab]: e.target.value }))}
                        placeholder="वाचकाने स्वतः करून पाहण्याच्या सूचना..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:outline-hidden focus:border-teal-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Taxonomy and Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    स्लग (URL Slug)
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="ear-rumbling"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    शरीराचा अवयव (Region)
                  </label>
                  <select
                    value={formRegionId}
                    onChange={(e) => setFormRegionId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                  >
                    {regions.map(r => (
                      <option key={r.id} value={r.id}>{getLocalized(r.name)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    प्रकार (Kind)
                  </label>
                  <select
                    value={formKindId}
                    onChange={(e) => setFormKindId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                  >
                    {kinds.map(k => (
                      <option key={k.id} value={k.id}>{getLocalized(k.name)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    प्रमाण (How Common)
                  </label>
                  <select
                    value={formHowCommon}
                    onChange={(e) => setFormHowCommon(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                  >
                    <option value="very_common">अतिशय सामान्य (80%+)</option>
                    <option value="common">सामान्य (~50%)</option>
                    <option value="uncommon">कमी लोकांमध्ये (10-20%)</option>
                    <option value="rare">दुर्मिळ (&lt;5%)</option>
                    <option value="very_rare">अत्यंत दुर्मिळ (&lt;1%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    टॅग्स (स्वल्पविरामाने वेगळे करा)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="ear, sound, muscle"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    स्थिती (Status)
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                  >
                    <option value="published">प्रकाशित (Published)</option>
                    <option value="draft">ड्राफ्ट (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  प्रतिमा लिंक (Image URL)
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                  />
                  {formImageUrl && (
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="w-16 h-10 rounded-xl object-cover border border-stone-300 dark:border-stone-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Checkbox Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formIsTryIt}
                    onChange={(e) => setFormIsTryIt(e.target.checked)}
                    className="rounded-sm text-teal-600"
                  />
                  <span>Try It Right Now?</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formIsFeelsScary}
                    onChange={(e) => setFormIsFeelsScary(e.target.checked)}
                    className="rounded-sm text-rose-600"
                  />
                  <span>Feels Scary But Normal?</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="rounded-sm text-amber-600"
                  />
                  <span>Featured Daily Quirk?</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formIsSponsored}
                    onChange={(e) => setFormIsSponsored(e.target.checked)}
                    className="rounded-sm text-purple-600"
                  />
                  <span>Sponsored Post?</span>
                </label>
              </div>

              {/* Footer Save Actions */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  रद्द करा (Cancel)
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-md transition-all"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>जतन झाले!</span>
                    </>
                  ) : (
                    <span>जतन करा (Save Entry)</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
