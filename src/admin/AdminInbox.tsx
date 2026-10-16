import React, { useState } from 'react';
import { 
  Inbox, 
  Mail, 
  Phone, 
  MessageCircle, 
  Trash2, 
  CheckCircle, 
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const AdminInbox: React.FC = () => {
  const { inbox, markInboxRead, deleteInboxMessage } = useData();
  const [filterType, setFilterType] = useState<'all' | 'contact' | 'advertise'>('all');

  const filtered = inbox.filter(msg => {
    if (filterType !== 'all' && msg.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            इनबॉक्स (Inbox & Inquiries)
          </h1>
          <p className="text-xs text-stone-500">
            वाचकांचे संपर्क संदेश आणि जाहिरातदारांचे प्रस्ताव ({inbox.length} संदेश)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'contact', 'advertise'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === t
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              {t === 'all' ? 'सर्व (All)' : t === 'contact' ? 'संपर्क संदेश (Contact)' : 'जाहिरात प्रस्ताव (Advertise)'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-3xl bg-white dark:bg-[#1A1D21] border transition-all shadow-xs space-y-4 ${
                !msg.read ? 'border-teal-500/60 ring-2 ring-teal-500/10' : 'border-stone-200/80 dark:border-stone-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    msg.type === 'advertise' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-teal-500/20 text-teal-700 dark:text-teal-400'
                  }`}>
                    {msg.type === 'advertise' ? 'जाहिरात प्रस्ताव' : 'सामान्य संपर्क'}
                  </span>
                  <span className="font-bold text-sm text-stone-900 dark:text-white">
                    {msg.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line bg-stone-50 dark:bg-stone-900/60 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
                {msg.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href={`mailto:${msg.email}?subject=Reply%20from%20DC-Body%20(D%20COMPANY)`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-teal-500 hover:text-white transition-colors font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{msg.email}</span>
                  </a>

                  {msg.phone && (
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hello%20from%20D%20COMPANY%20DC-Body`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{msg.phone}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  {!msg.read ? (
                    <button
                      onClick={() => markInboxRead(msg.id, true)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
                    >
                      वाचले म्हणून खूण करा (Mark Read)
                    </button>
                  ) : (
                    <span className="text-[11px] text-stone-400 font-medium">वाचलेले</span>
                  )}

                  <button
                    onClick={() => deleteInboxMessage(msg.id)}
                    className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-[#1A1D21] rounded-3xl border border-stone-200 dark:border-stone-800">
          <Inbox className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            इनबॉक्स रिकामा आहे
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            सध्या कोणताही नवीन संदेश किंवा जाहिरात प्रस्ताव आलेला नाही.
          </p>
        </div>
      )}
    </div>
  );
};
