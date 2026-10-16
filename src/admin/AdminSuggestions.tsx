import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lightbulb, 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  Layers,
  User
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const AdminSuggestions: React.FC = () => {
  const { suggestions, updateSuggestionStatus, createEntry } = useData();
  const navigate = useNavigate();

  const [convertingId, setConvertingId] = useState<string | null>(null);

  const handleConvertToEntry = async (sug: any) => {
    setConvertingId(sug.id);
    const slug = sug.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `user-sug-${Date.now()}`;
    await createEntry({
      slug,
      title: { mr: sug.title, hi: sug.title, en: sug.title },
      summary: { mr: sug.description.slice(0, 150), hi: sug.description.slice(0, 150), en: sug.description.slice(0, 150) },
      body: { mr: sug.description, hi: sug.description, en: sug.description },
      regionId: sug.bodyRegion || 'brain',
      kindId: 'variation',
      tags: ['community', 'user-suggestion'],
      howCommon: (sug.howCommon as any) || 'common',
      isTryIt: false,
      isFeelsScary: false,
      isFeatured: false,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      status: 'draft'
    });
    await updateSuggestionStatus(sug.id, 'approved');
    setConvertingId(null);
    navigate('/admin/entries');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-white">
          वाचकांनी सुचवलेली लक्षणे (User Suggestions)
        </h1>
        <p className="text-xs text-stone-500">
          वाचकांनी पाठवलेल्या अजब शारीरिक लक्षणांचे पुनरावलोकन करा आणि १-क्लिकने अधिकृत नोंदीत रूपांतरित करा.
        </p>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                      {sug.title}
                    </h3>
                    <span className="text-[10px] text-stone-400 capitalize">
                      अवयव: {sug.bodyRegion} • प्रमाण: {sug.howCommon || 'सामान्य'}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  sug.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600' : sug.status === 'rejected' ? 'bg-rose-500/10 text-rose-600' : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {sug.status}
                </span>
              </div>

              <p className="text-xs md:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line bg-stone-50 dark:bg-stone-900/60 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
                {sug.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-stone-500">
                <div className="flex items-center gap-3">
                  {sug.name && <span>सुचवणारे: <strong className="text-stone-800 dark:text-stone-200">{sug.name}</strong></span>}
                  {sug.email && <span>ईमेल: {sug.email}</span>}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  {sug.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateSuggestionStatus(sug.id, 'rejected')}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      >
                        नाकारा (Reject)
                      </button>

                      <button
                        onClick={() => handleConvertToEntry(sug)}
                        disabled={convertingId === sug.id}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>नोंदीत रूपांतरित करा (Convert)</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-[#1A1D21] rounded-3xl border border-stone-200 dark:border-stone-800">
          <Lightbulb className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            सध्या कोणतेही नवीन सुझाव नाहीत
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            वाचक जेव्हा मुख्य साइटवरील "नोंद सुचवा" फॉर्म भरतील तेव्हा ते येथे दिसतील.
          </p>
        </div>
      )}
    </div>
  );
};
