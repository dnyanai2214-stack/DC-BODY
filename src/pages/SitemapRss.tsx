import React, { useState } from 'react';
import { Rss, Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useI18n } from '../lib/i18n';

export const SitemapRss: React.FC = () => {
  const { entries, regions, kinds, blog } = useData();
  const { getLocalized } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dcbody.com';

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>
  <url><loc>${baseUrl}/entries</loc><priority>0.9</priority></url>
  <url><loc>${baseUrl}/regions</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/kinds</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/blog</loc><priority>0.8</priority></url>
  ${entries.map(e => `  <url><loc>${baseUrl}/entry/${e.slug || e.id}</loc><lastmod>${e.updatedAt.slice(0, 10)}</lastmod><priority>0.8</priority></url>`).join('\n')}
  ${blog.map(b => `  <url><loc>${baseUrl}/blog/${b.slug || b.id}</loc><lastmod>${b.updatedAt.slice(0, 10)}</lastmod><priority>0.7</priority></url>`).join('\n')}
</urlset>`;

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>DC-Body - Strange But Normal Human Quirks</title>
    <link>${baseUrl}</link>
    <description>A friendly encyclopedia of strange but normal things the human body can do.</description>
    <language>mr</language>
    ${entries.slice(0, 15).map(e => `
    <item>
      <title><![CDATA[${getLocalized(e.title)}]]></title>
      <link>${baseUrl}/entry/${e.slug || e.id}</link>
      <description><![CDATA[${getLocalized(e.summary)}]]></description>
      <pubDate>${new Date(e.createdAt).toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-teal-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>मुख्यपृष्ठावर परत</span>
      </Link>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Rss className="w-8 h-8 text-amber-500" />
          <span>Sitemap.xml आणि RSS Feed जनरेटर</span>
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          सर्च इंजिन इंडेक्सिंग (SEO) आणि RSS वाचकांसाठी DC-Body चा लाइव्ह डेटा फीड.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sitemap Block */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              sitemap.xml (Google SEO)
            </h3>
            <button
              onClick={() => copyToClipboard(sitemapXml, 'sitemap')}
              className="p-1.5 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 hover:bg-teal-500/10 text-teal-600 flex items-center gap-1 font-semibold"
            >
              {copied === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'sitemap' ? 'कॉपी झाले!' : 'XML कॉपी करा'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-stone-900 text-stone-200 text-[10px] font-mono h-48 overflow-auto">
            {sitemapXml}
          </pre>
        </div>

        {/* RSS Block */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              rss.xml (Feed Readers)
            </h3>
            <button
              onClick={() => copyToClipboard(rssXml, 'rss')}
              className="p-1.5 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 hover:bg-amber-500/10 text-amber-600 flex items-center gap-1 font-semibold"
            >
              {copied === 'rss' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'rss' ? 'कॉपी झाले!' : 'RSS कॉपी करा'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-stone-900 text-stone-200 text-[10px] font-mono h-48 overflow-auto">
            {rssXml}
          </pre>
        </div>
      </div>
    </div>
  );
};
