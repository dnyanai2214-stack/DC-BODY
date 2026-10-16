import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { useI18n } from '../lib/i18n';

interface ShareButtonsProps {
  title: string;
  url?: string;
  summary?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, summary }) => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title} - DC-Body\n${summary || ''}\n`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title} - ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        {t('share_entry')}:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-1.5 border border-[#25D366]/20"
      >
        <span>{t('share_whatsapp')}</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all flex items-center gap-1.5 border border-[#1877F2]/20"
      >
        <span>{t('share_facebook')}</span>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-900/10 text-stone-900 dark:bg-white/10 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-1.5 border border-stone-300 dark:border-stone-700"
      >
        <span>{t('share_x')}</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all flex items-center gap-1.5 border border-stone-200 dark:border-stone-700"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="text-teal-600 dark:text-teal-400 font-semibold">{t('link_copied')}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{t('share_copy')}</span>
          </>
        )}
      </button>
    </div>
  );
};
