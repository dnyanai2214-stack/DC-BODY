import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  orderBy, 
  increment 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  Entry, 
  BodyRegion, 
  BodyKind, 
  BlogPost, 
  StaticPage, 
  SiteSettings, 
  AdsConfig, 
  AffiliateBlock, 
  Suggestion, 
  InboxMessage, 
  Subscriber, 
  ActivityLog,
  AdPlacement,
  Language
} from '../types';
import { 
  SEED_REGIONS, 
  SEED_KINDS, 
  SEED_ENTRIES, 
  SEED_PAGES, 
  SEED_BLOG, 
  SEED_SITE_SETTINGS, 
  SEED_ADS_CONFIG, 
  SEED_AFFILIATES 
} from '../lib/seedData';

interface DataContextType {
  entries: Entry[];
  regions: BodyRegion[];
  kinds: BodyKind[];
  blog: BlogPost[];
  pages: Record<string, StaticPage>;
  siteSettings: SiteSettings;
  adsConfig: AdsConfig;
  affiliates: AffiliateBlock[];
  suggestions: Suggestion[];
  inbox: InboxMessage[];
  subscribers: Subscriber[];
  activityLogs: ActivityLog[];
  loading: boolean;
  refreshData: () => Promise<void>;
  seedDatabase: (force?: boolean) => Promise<void>;
  
  // Entry actions
  createEntry: (entry: Omit<Entry, 'id' | 'views' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateEntry: (id: string, updates: Partial<Entry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  duplicateEntry: (id: string) => Promise<string>;
  recordEntryView: (id: string) => Promise<void>;
  
  // Blog actions
  createBlogPost: (post: Omit<BlogPost, 'id' | 'views' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  
  // Static pages
  updatePage: (slug: string, page: Partial<StaticPage>) => Promise<void>;
  
  // Ads & Affiliates
  updateAdsConfig: (newConfig: Partial<AdsConfig>) => Promise<void>;
  recordAdClick: (slot: AdPlacement) => Promise<void>;
  recordAdImpression: (slot: AdPlacement) => Promise<void>;
  updateAffiliate: (id: string, updates: Partial<AffiliateBlock>) => Promise<void>;
  recordAffiliateClick: (id: string) => Promise<void>;
  
  // Site settings
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  
  // Public submissions
  submitSuggestion: (s: Omit<Suggestion, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updateSuggestionStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  submitInboxMessage: (msg: Omit<InboxMessage, 'id' | 'read' | 'createdAt'>) => Promise<void>;
  markInboxRead: (id: string, read: boolean) => Promise<void>;
  deleteInboxMessage: (id: string) => Promise<void>;
  subscribeEmail: (email: string, language: Language) => Promise<{ success: boolean; alreadyExists?: boolean }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_entries');
    return saved ? JSON.parse(saved) : SEED_ENTRIES;
  });
  const [regions, setRegions] = useState<BodyRegion[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_regions');
    return saved ? JSON.parse(saved) : SEED_REGIONS;
  });
  const [kinds, setKinds] = useState<BodyKind[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_kinds');
    return saved ? JSON.parse(saved) : SEED_KINDS;
  });
  const [blog, setBlog] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_blog');
    return saved ? JSON.parse(saved) : SEED_BLOG;
  });
  const [pages, setPages] = useState<Record<string, StaticPage>>(() => {
    const saved = localStorage.getItem('dcbody_cache_pages');
    if (saved) return JSON.parse(saved);
    const initialPages: Record<string, StaticPage> = {};
    SEED_PAGES.forEach(p => { initialPages[p.slug] = p; });
    return initialPages;
  });
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('dcbody_cache_settings');
    return saved ? JSON.parse(saved) : SEED_SITE_SETTINGS;
  });
  const [adsConfig, setAdsConfig] = useState<AdsConfig>(() => {
    const saved = localStorage.getItem('dcbody_cache_ads');
    return saved ? JSON.parse(saved) : SEED_ADS_CONFIG;
  });
  const [affiliates, setAffiliates] = useState<AffiliateBlock[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_affiliates');
    return saved ? JSON.parse(saved) : SEED_AFFILIATES;
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_suggestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [inbox, setInbox] = useState<InboxMessage[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_inbox');
    return saved ? JSON.parse(saved) : [];
  });
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    const saved = localStorage.getItem('dcbody_cache_subscribers');
    return saved ? JSON.parse(saved) : [];
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync to local storage
  const syncCache = useCallback(() => {
    localStorage.setItem('dcbody_cache_entries', JSON.stringify(entries));
    localStorage.setItem('dcbody_cache_regions', JSON.stringify(regions));
    localStorage.setItem('dcbody_cache_kinds', JSON.stringify(kinds));
    localStorage.setItem('dcbody_cache_blog', JSON.stringify(blog));
    localStorage.setItem('dcbody_cache_pages', JSON.stringify(pages));
    localStorage.setItem('dcbody_cache_settings', JSON.stringify(siteSettings));
    localStorage.setItem('dcbody_cache_ads', JSON.stringify(adsConfig));
    localStorage.setItem('dcbody_cache_affiliates', JSON.stringify(affiliates));
    localStorage.setItem('dcbody_cache_suggestions', JSON.stringify(suggestions));
    localStorage.setItem('dcbody_cache_inbox', JSON.stringify(inbox));
    localStorage.setItem('dcbody_cache_subscribers', JSON.stringify(subscribers));
  }, [entries, regions, kinds, blog, pages, siteSettings, adsConfig, affiliates, suggestions, inbox, subscribers]);

  useEffect(() => {
    syncCache();
  }, [syncCache]);

  const refreshData = useCallback(async () => {
    try {
      // 1. Fetch entries
      const entriesSnap = await getDocs(collection(db, 'entries'));
      if (!entriesSnap.empty) {
        const loadedEntries: Entry[] = [];
        entriesSnap.forEach(d => {
          loadedEntries.push({ id: d.id, ...d.data() } as Entry);
        });
        setEntries(loadedEntries);
      } else {
        // If empty in Firestore, use local seed data in-memory/cache
        setEntries(SEED_ENTRIES);
      }

      // 2. Fetch categories (regions & kinds)
      const categoriesSnap = await getDocs(collection(db, 'categories'));
      if (!categoriesSnap.empty) {
        const rList: BodyRegion[] = [];
        const kList: BodyKind[] = [];
        categoriesSnap.forEach(d => {
          const item = d.data();
          if (item.type === 'region') rList.push({ id: d.id, ...item } as BodyRegion);
          if (item.type === 'kind') kList.push({ id: d.id, ...item } as BodyKind);
        });
        if (rList.length > 0) setRegions(rList);
        if (kList.length > 0) setKinds(kList);
      } else {
        setRegions(SEED_REGIONS);
        setKinds(SEED_KINDS);
      }

      // 3. Fetch blog
      const blogSnap = await getDocs(collection(db, 'blog'));
      if (!blogSnap.empty) {
        const bList: BlogPost[] = [];
        blogSnap.forEach(d => bList.push({ id: d.id, ...d.data() } as BlogPost));
        setBlog(bList);
      } else {
        setBlog(SEED_BLOG);
      }

      // 4. Fetch static pages
      const pagesSnap = await getDocs(collection(db, 'pages'));
      if (!pagesSnap.empty) {
        const pMap: Record<string, StaticPage> = {};
        pagesSnap.forEach(d => {
          const p = { id: d.id, ...d.data() } as StaticPage;
          pMap[p.slug] = p;
        });
        setPages(pMap);
      } else {
        const initialPages: Record<string, StaticPage> = {};
        SEED_PAGES.forEach(p => { initialPages[p.slug] = p; });
        setPages(initialPages);
      }

      // 5. Fetch site settings
      const settingsSnap = await getDocs(collection(db, 'site_settings'));
      if (!settingsSnap.empty) {
        const first = settingsSnap.docs[0].data() as SiteSettings;
        setSiteSettings(first);
      } else {
        setSiteSettings(SEED_SITE_SETTINGS);
      }

      // 6. Fetch ads config
      const adsSnap = await getDocs(collection(db, 'ads_config'));
      if (!adsSnap.empty) {
        const firstAd = adsSnap.docs[0].data() as AdsConfig;
        setAdsConfig(firstAd);
      } else {
        setAdsConfig(SEED_ADS_CONFIG);
      }

      // 7. Fetch affiliates
      const affSnap = await getDocs(collection(db, 'affiliates'));
      if (!affSnap.empty) {
        const aList: AffiliateBlock[] = [];
        affSnap.forEach(d => aList.push({ id: d.id, ...d.data() } as AffiliateBlock));
        setAffiliates(aList);
      } else {
        setAffiliates(SEED_AFFILIATES);
      }

      // 8. Fetch suggestions
      const sugSnap = await getDocs(collection(db, 'suggestions'));
      if (!sugSnap.empty) {
        const sList: Suggestion[] = [];
        sugSnap.forEach(d => sList.push({ id: d.id, ...d.data() } as Suggestion));
        setSuggestions(sList);
      }

      // 9. Fetch inbox
      const inboxSnap = await getDocs(collection(db, 'inbox'));
      if (!inboxSnap.empty) {
        const iList: InboxMessage[] = [];
        inboxSnap.forEach(d => iList.push({ id: d.id, ...d.data() } as InboxMessage));
        setInbox(iList);
      }

      // 10. Fetch subscribers
      const subSnap = await getDocs(collection(db, 'subscribers'));
      if (!subSnap.empty) {
        const subList: Subscriber[] = [];
        subSnap.forEach(d => subList.push({ id: d.id, ...d.data() } as Subscriber));
        setSubscribers(subList);
      }
    } catch (err) {
      console.warn('Note on Firestore initialization / fetch:', err);
      // Fallback is already initialized in state from seedData!
    } finally {
      setLoading(false);
    }
  }, []);

  const seedDatabase = async (force: boolean = false) => {
    setLoading(true);
    // 1. Immediately update in-memory state and local cache
    setEntries(SEED_ENTRIES);
    setRegions(SEED_REGIONS);
    setKinds(SEED_KINDS);
    setBlog(SEED_BLOG);
    const pMap: Record<string, StaticPage> = {};
    for (const p of SEED_PAGES) {
      pMap[p.slug] = p;
    }
    setPages(pMap);
    setSiteSettings(SEED_SITE_SETTINGS);
    setAdsConfig(SEED_ADS_CONFIG);
    setAffiliates(SEED_AFFILIATES);
    syncCache();

    // 2. If authenticated in Firebase, persist to Firestore
    const user = auth.currentUser;
    if (user) {
      try {
        // 1. Seed entries
        for (const e of SEED_ENTRIES) {
          await setDoc(doc(db, 'entries', e.id), e, { merge: true });
        }

        // 2. Seed regions & kinds into categories
        for (const r of SEED_REGIONS) {
          await setDoc(doc(db, 'categories', `region_${r.id}`), { ...r, type: 'region' }, { merge: true });
        }
        for (const k of SEED_KINDS) {
          await setDoc(doc(db, 'categories', `kind_${k.id}`), { ...k, type: 'kind' }, { merge: true });
        }

        // 3. Seed blog
        for (const b of SEED_BLOG) {
          await setDoc(doc(db, 'blog', b.id), b, { merge: true });
        }

        // 4. Seed pages
        for (const p of SEED_PAGES) {
          await setDoc(doc(db, 'pages', p.slug), p, { merge: true });
        }

        // 5. Seed site settings
        await setDoc(doc(db, 'site_settings', 'main'), SEED_SITE_SETTINGS, { merge: true });

        // 6. Seed ads config
        await setDoc(doc(db, 'ads_config', 'main'), SEED_ADS_CONFIG, { merge: true });

        // 7. Seed affiliates
        for (const a of SEED_AFFILIATES) {
          await setDoc(doc(db, 'affiliates', a.id), a, { merge: true });
        }

        // 8. Log activity
        const logItem: ActivityLog = {
          id: `seed_${Date.now()}`,
          userEmail: user.email || 'admin@dcbody.com',
          action: force ? 'Force Reseed Database' : 'Initial Seeding',
          details: 'Seeded 15 sample entries, 12 regions, 7 kinds, pages, and monetization slots.',
          timestamp: new Date().toISOString()
        };
        setActivityLogs(prev => [logItem, ...prev]);
      } catch (err) {
        console.warn('Firestore seeding persistence skipped or restricted:', err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Entry CRUD
  const createEntry = async (data: Omit<Entry, 'id' | 'views' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const id = data.slug || `entry_${Date.now()}`;
    const now = new Date().toISOString();
    const newEntry: Entry = {
      ...data,
      id,
      views: 0,
      createdAt: now,
      updatedAt: now
    };
    try {
      await setDoc(doc(db, 'entries', id), newEntry);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `entries/${id}`);
    }
    setEntries(prev => [newEntry, ...prev]);
    return id;
  };

  const updateEntry = async (id: string, updates: Partial<Entry>) => {
    const now = new Date().toISOString();
    const merged = { ...updates, updatedAt: now };
    try {
      await updateDoc(doc(db, 'entries', id), merged);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `entries/${id}`);
    }
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...merged } : e));
  };

  const deleteEntry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'entries', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `entries/${id}`);
    }
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const duplicateEntry = async (id: string): Promise<string> => {
    const original = entries.find(e => e.id === id);
    if (!original) throw new Error('Original entry not found');
    const newId = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;
    const duplicated: Entry = {
      ...original,
      id: newId,
      slug: newId,
      title: {
        mr: `${original.title.mr} (प्रत)`,
        hi: `${original.title.hi} (प्रतिलिपि)`,
        en: `${original.title.en} (Copy)`
      },
      status: 'draft',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'entries', newId), duplicated);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `entries/${newId}`);
    }
    setEntries(prev => [duplicated, ...prev]);
    return newId;
  };

  const recordEntryView = async (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, views: (e.views || 0) + 1 } : e));
    try {
      await updateDoc(doc(db, 'entries', id), {
        views: increment(1)
      });
    } catch {
      // Ignore background view increment errors
    }
  };

  // Blog CRUD
  const createBlogPost = async (data: Omit<BlogPost, 'id' | 'views' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const id = data.slug || `post_${Date.now()}`;
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...data,
      id,
      views: 0,
      createdAt: now,
      updatedAt: now
    };
    try {
      await setDoc(doc(db, 'blog', id), newPost);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `blog/${id}`);
    }
    setBlog(prev => [newPost, ...prev]);
    return id;
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    const now = new Date().toISOString();
    const merged = { ...updates, updatedAt: now };
    try {
      await updateDoc(doc(db, 'blog', id), merged);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `blog/${id}`);
    }
    setBlog(prev => prev.map(b => b.id === id ? { ...b, ...merged } : b));
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blog', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `blog/${id}`);
    }
    setBlog(prev => prev.filter(b => b.id !== id));
  };

  // Pages
  const updatePage = async (slug: string, pageData: Partial<StaticPage>) => {
    const now = new Date().toISOString();
    const merged = { ...pageData, slug, updatedAt: now };
    try {
      await setDoc(doc(db, 'pages', slug), merged, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `pages/${slug}`);
    }
    setPages(prev => ({
      ...prev,
      [slug]: { ...(prev[slug] || {}), ...merged } as StaticPage
    }));
  };

  // Ads & Affiliates
  const updateAdsConfig = async (newConfig: Partial<AdsConfig>) => {
    const merged = { ...adsConfig, ...newConfig };
    setAdsConfig(merged);
    try {
      await setDoc(doc(db, 'ads_config', 'main'), merged, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'ads_config/main');
    }
  };

  const recordAdClick = async (slot: AdPlacement) => {
    setAdsConfig(prev => {
      const slotConfig = prev.slots[slot];
      if (!slotConfig) return prev;
      return {
        ...prev,
        slots: {
          ...prev.slots,
          [slot]: {
            ...slotConfig,
            clicks: (slotConfig.clicks || 0) + 1
          }
        }
      };
    });
    try {
      await updateDoc(doc(db, 'ads_config', 'main'), {
        [`slots.${slot}.clicks`]: increment(1)
      });
    } catch {
      // background analytics
    }
  };

  const recordAdImpression = async (slot: AdPlacement) => {
    setAdsConfig(prev => {
      const slotConfig = prev.slots[slot];
      if (!slotConfig) return prev;
      return {
        ...prev,
        slots: {
          ...prev.slots,
          [slot]: {
            ...slotConfig,
            impressions: (slotConfig.impressions || 0) + 1
          }
        }
      };
    });
    try {
      await updateDoc(doc(db, 'ads_config', 'main'), {
        [`slots.${slot}.impressions`]: increment(1)
      });
    } catch {
      // background analytics
    }
  };

  const updateAffiliate = async (id: string, updates: Partial<AffiliateBlock>) => {
    setAffiliates(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    try {
      await updateDoc(doc(db, 'affiliates', id), updates);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `affiliates/${id}`);
    }
  };

  const recordAffiliateClick = async (id: string) => {
    setAffiliates(prev => prev.map(a => a.id === id ? { ...a, clicks: (a.clicks || 0) + 1 } : a));
    try {
      await updateDoc(doc(db, 'affiliates', id), {
        clicks: increment(1)
      });
    } catch {
      // ignore
    }
  };

  // Site Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const merged = { ...siteSettings, ...newSettings };
    setSiteSettings(merged);
    try {
      await setDoc(doc(db, 'site_settings', 'main'), merged, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'site_settings/main');
    }
  };

  // User Submissions
  const submitSuggestion = async (s: Omit<Suggestion, 'id' | 'status' | 'createdAt'>) => {
    const newSug: Suggestion = {
      ...s,
      id: `sug_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    try {
      await addDoc(collection(db, 'suggestions'), newSug);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'suggestions');
    }
    setSuggestions(prev => [newSug, ...prev]);
  };

  const updateSuggestionStatus = async (id: string, status: 'approved' | 'rejected') => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    try {
      await updateDoc(doc(db, 'suggestions', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `suggestions/${id}`);
    }
  };

  const submitInboxMessage = async (msg: Omit<InboxMessage, 'id' | 'read' | 'createdAt'>) => {
    const newMsg: InboxMessage = {
      ...msg,
      id: `msg_${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    try {
      await addDoc(collection(db, 'inbox'), newMsg);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'inbox');
    }
    setInbox(prev => [newMsg, ...prev]);
  };

  const markInboxRead = async (id: string, read: boolean) => {
    setInbox(prev => prev.map(m => m.id === id ? { ...m, read } : m));
    try {
      await updateDoc(doc(db, 'inbox', id), { read });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `inbox/${id}`);
    }
  };

  const deleteInboxMessage = async (id: string) => {
    setInbox(prev => prev.filter(m => m.id !== id));
    try {
      await deleteDoc(doc(db, 'inbox', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `inbox/${id}`);
    }
  };

  const subscribeEmail = async (email: string, language: Language) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, alreadyExists: true };
    }
    const newSub: Subscriber = {
      id: `sub_${Date.now()}`,
      email: cleanEmail,
      language,
      createdAt: new Date().toISOString()
    };
    try {
      await addDoc(collection(db, 'subscribers'), newSub);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'subscribers');
    }
    setSubscribers(prev => [newSub, ...prev]);
    return { success: true };
  };

  return (
    <DataContext.Provider
      value={{
        entries,
        regions,
        kinds,
        blog,
        pages,
        siteSettings,
        adsConfig,
        affiliates,
        suggestions,
        inbox,
        subscribers,
        activityLogs,
        loading,
        refreshData,
        seedDatabase,
        createEntry,
        updateEntry,
        deleteEntry,
        duplicateEntry,
        recordEntryView,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,
        updatePage,
        updateAdsConfig,
        recordAdClick,
        recordAdImpression,
        updateAffiliate,
        recordAffiliateClick,
        updateSettings,
        submitSuggestion,
        updateSuggestionStatus,
        submitInboxMessage,
        markInboxRead,
        deleteInboxMessage,
        subscribeEmail
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
