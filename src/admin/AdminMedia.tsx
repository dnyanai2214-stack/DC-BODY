import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check, ExternalLink } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const curatedAssets = [
    { title: 'Ear / Hearing Reflexes', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Nose & Breathing', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Eye / Optical Phosphenes', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Face & Jaw Acoustics', url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Brain & Mental Imagery', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Sunlight & Sneeze Reflex', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Visual Afterimages Illusion', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Skin & Histamine Reactions', url: 'https://images.unsplash.com/photo-1512290900672-1f5be94191c0?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Sleep & Hypnic Jerk Transitions', url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Acoustic Meridian & ASMR', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Cold-Induced Vasodilation', url: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Misophonia & Sound Sensitivities', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80' },
  ];

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-white">
          मीडिया लायब्ररी (Media Library)
        </h1>
        <p className="text-xs text-stone-500">
          नोंदी आणि लेखांसाठी उच्च-गुणवत्तेची वैद्यकीय व शरीरशास्त्र छायाचित्रे. १-क्लिकने URL कॉपी करा.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {curatedAssets.map((asset, i) => (
          <div
            key={i}
            className="p-3 bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xs space-y-2 group"
          >
            <div className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={asset.url}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>

            <div className="px-1 flex items-center justify-between">
              <span className="font-bold text-xs text-stone-800 dark:text-stone-200 truncate">
                {asset.title}
              </span>

              <button
                onClick={() => handleCopy(asset.url)}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-teal-500 hover:text-white transition-colors flex items-center gap-1 shrink-0"
              >
                {copiedUrl === asset.url ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>कॉपी झाले!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>URL कॉपी</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
