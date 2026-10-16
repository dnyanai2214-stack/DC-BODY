import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit2, Check, X, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { BlogPost, Language, LocalizedText } from '../types';
import { translateTextWithGemini } from '../lib/gemini';

export const AdminBlog: React.FC = () => {
  const { blog, createBlogPost, updateBlogPost, deleteBlogPost } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formSlug, setFormSlug] = useState('');
  const [formTitle, setFormTitle] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formSummary, setFormSummary] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formBody, setFormBody] = useState<LocalizedText>({ mr: '', hi: '', en: '' });
  const [formAuthor, setFormAuthor] = useState('D COMPANY Editorial');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [activeLang, setActiveLang] = useState<Language>('mr');
  const [translating, setTranslating] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setFormSlug('');
    setFormTitle({ mr: '', hi: '', en: '' });
    setFormSummary({ mr: '', hi: '', en: '' });
    setFormBody({ mr: '', hi: '', en: '' });
    setFormAuthor('D COMPANY Editorial');
    setFormImageUrl('https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80');
    setFormStatus('published');
    setActiveLang('mr');
    setIsEditing(true);
  };

  const openEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setFormSlug(b.slug);
    setFormTitle(b.title);
    setFormSummary(b.summary);
    setFormBody(b.body);
    setFormAuthor(b.author || 'D COMPANY Editorial');
    setFormImageUrl(b.imageUrl);
    setFormStatus(b.status);
    setActiveLang('mr');
    setIsEditing(true);
  };

  const handleTranslate = async () => {
    setTranslating(true);
    const source = activeLang;
    const targets: Language[] = (['mr', 'hi', 'en'] as Language[]).filter(l => l !== source);
    try {
      if (formTitle[source]) {
        const trans = await translateTextWithGemini(formTitle[source], source, targets);
        setFormTitle(prev => ({ ...prev, ...trans }));
      }
      if (formSummary[source]) {
        const trans = await translateTextWithGemini(formSummary[source], source, targets);
        setFormSummary(prev => ({ ...prev, ...trans }));
      }
      if (formBody[source]) {
        const trans = await translateTextWithGemini(formBody[source], source, targets);
        setFormBody(prev => ({ ...prev, ...trans }));
      }
    } finally {
      setTranslating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formSlug.trim() || formTitle.en.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `post-${Date.now()}`;
    const payload = {
      slug,
      title: formTitle,
      summary: formSummary,
      body: formBody,
      author: formAuthor,
      imageUrl: formImageUrl,
      status: formStatus
    };
    if (editingId) {
      await updateBlogPost(editingId, payload);
    } else {
      await createBlogPost(payload);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            ब्लॉग व्यवस्थापक (Editorial Posts)
          </h1>
          <p className="text-xs text-stone-500">
            दीर्घ लेख, वैज्ञानिक विश्लेषणे आणि संशोधन कथा.
          </p>
        </div>

        <button
          onClick={openNew}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नवीन लेख लिहा</span>
        </button>
      </div>

      <div className="space-y-4">
        {blog.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              {post.imageUrl && (
                <img src={post.imageUrl} alt="" className="w-16 h-12 rounded-xl object-cover shrink-0" />
              )}
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-stone-900 dark:text-white truncate">
                  {post.title.mr || post.title.en}
                </h3>
                <span className="text-[10px] text-stone-400 block truncate">
                  /{post.slug} • लेखक: {post.author}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openEdit(post)}
                className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteBlogPost(post.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-base text-stone-900 dark:text-white">
                {editingId ? 'लेख संपादित करा' : 'नवीन लेख लिहा'}
              </h3>
              <button
                type="button"
                onClick={handleTranslate}
                disabled={translating}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{translating ? 'भाषांतर होत आहे...' : 'Auto-translate with Gemini'}</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl w-fit">
                {(['mr', 'hi', 'en'] as Language[]).map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setActiveLang(l)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeLang === l ? 'bg-white dark:bg-stone-900 text-teal-600 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    {l === 'mr' ? 'मराठी' : l === 'hi' ? 'हिंदी' : 'English'}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  शीर्षक ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={formTitle[activeLang]}
                  onChange={(e) => setFormTitle({ ...formTitle, [activeLang]: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  थोडक्यात सारांश ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={formSummary[activeLang]}
                  onChange={(e) => setFormSummary({ ...formSummary, [activeLang]: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  संपूर्ण लेख ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={8}
                  required
                  value={formBody[activeLang]}
                  onChange={(e) => setFormBody({ ...formBody, [activeLang]: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    लेखक नाव (Author)
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    प्रतिमा लिंक (Image URL)
                  </label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs text-stone-500 hover:bg-stone-100"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700"
                >
                  जतन करा (Save Post)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
