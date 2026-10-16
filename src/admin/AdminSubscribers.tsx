import React, { useState } from 'react';
import { Users, Download, Search, Mail, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AdminSubscribers: React.FC = () => {
  const { subscribers } = useData();
  const [search, setSearch] = useState('');

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));

  const exportToCsv = () => {
    const headers = ['Email', 'Language', 'Subscribed At'];
    const rows = subscribers.map(s => [
      `"${s.email}"`,
      `"${s.language || 'mr'}"`,
      `"${s.createdAt}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dcbody_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white">
            न्यूजलेटर सबस्क्रायबर्स (Subscribers)
          </h1>
          <p className="text-xs text-stone-500">
            एकूण {subscribers.length} सक्रिय वाचक ईमेल नोंदणीकृत आहेत.
          </p>
        </div>

        <button
          onClick={exportToCsv}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>CSV एक्सपोर्ट करा (Export CSV)</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ईमेल शोधा..."
          className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden"
        />
      </div>

      <div className="bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">ईमेल पत्ता (Email)</th>
                <th className="p-4">पसंतीची भाषा</th>
                <th className="p-4">नोंदणी तारीख (Subscribed Date)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((s, idx) => (
                <tr key={s.id || idx} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                  <td className="p-4 font-mono font-medium text-stone-900 dark:text-white">
                    {s.email}
                  </td>
                  <td className="p-4 uppercase text-[11px] font-semibold text-teal-600">
                    {s.language || 'mr'}
                  </td>
                  <td className="p-4 text-stone-500">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
