import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useData } from '../context/DataContext';
import { ShareButtons } from '../components/ShareButtons';
import { AdBanner } from '../components/AdBanner';

export const BlogList: React.FC = () => {
  const { t, getLocalized } = useI18n();
  const { blog } = useData();

  const published = useMemo(() => {
    return blog.filter(b => b.status === 'published');
  }, [blog]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          {t('nav_blog')}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm mt-1">
          मानवी शरीर विज्ञानावरील सविस्तर लेख, संशोधन आणि रंजक विश्लेषण
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {published.map((post) => {
          const title = getLocalized(post.title);
          const summary = getLocalized(post.summary);

          return (
            <article
              key={post.id}
              className="group bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {post.imageUrl && (
                  <div className="aspect-16/9 overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={post.imageUrl}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug || post.id}`} className="block">
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {title}
                    </h2>
                  </Link>

                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/blog/${post.slug || post.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>{t('read_more')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, getLocalized } = useI18n();
  const { blog } = useData();

  const post = blog.find(b => b.slug === slug || b.id === slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-3">
        <h2 className="text-xl font-bold">लेख सापडला नाही</h2>
        <Link to="/blog" className="text-teal-600 underline text-xs">
          ब्लॉग सूचीवर परत जा
        </Link>
      </div>
    );
  }

  const title = getLocalized(post.title);
  const body = getLocalized(post.body);
  const summary = getLocalized(post.summary);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <button
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-teal-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>सर्व लेखांवर परत जा</span>
      </button>

      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-4">
          <span>लेखक: <strong className="text-stone-800 dark:text-stone-200">{post.author}</strong></span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {post.imageUrl && (
        <div className="aspect-16/9 rounded-3xl overflow-hidden shadow-lg">
          <img src={post.imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
        {body}
      </div>

      <AdBanner slot="inside_entry" />

      <div className="p-6 bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 rounded-3xl space-y-3">
        <ShareButtons title={title} summary={summary} />
      </div>
    </article>
  );
};
