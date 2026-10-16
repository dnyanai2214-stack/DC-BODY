export type Language = 'mr' | 'hi' | 'en';

export interface LocalizedText {
  mr: string;
  hi: string;
  en: string;
}

export interface BodyRegion {
  id: string;
  name: LocalizedText;
  icon: string;
  description: LocalizedText;
  order?: number;
}

export interface BodyKind {
  id: string;
  name: LocalizedText;
  icon: string;
  description: LocalizedText;
  order?: number;
}

export interface Tag {
  id: string;
  name: LocalizedText;
}

export interface Entry {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  regionId: string;
  kindId: string;
  tags: string[];
  howCommon: 'very_common' | 'common' | 'uncommon' | 'rare' | 'very_rare';
  howCommonLabel?: LocalizedText;
  isTryIt: boolean;
  tryItInstructions?: LocalizedText;
  isFeelsScary: boolean;
  isFeatured: boolean;
  isSponsored?: boolean;
  imageUrl: string;
  views: number;
  status: 'published' | 'draft' | 'scheduled';
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  author: string;
  imageUrl: string;
  status: 'published' | 'draft';
  isSponsored?: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface StaticPage {
  id: string;
  slug: string; // 'about' | 'privacy' | 'terms' | 'disclaimer'
  title: LocalizedText;
  content: LocalizedText;
  updatedAt: string;
}

export type AdPlacement = 
  | 'header_banner'
  | 'below_hero'
  | 'in_feed'
  | 'sidebar'
  | 'inside_entry'
  | 'end_of_entry'
  | 'footer'
  | 'mobile_sticky'
  | 'interstitial';

export interface AdSlotConfig {
  enabled: boolean;
  type: 'adsense' | 'custom' | 'sponsor';
  sponsorImageUrl?: string;
  sponsorLinkUrl?: string;
  sponsorAltText?: string;
  sponsorTargetLanguage?: Language | 'all';
  customHtml?: string;
  impressions: number;
  clicks: number;
}

export interface AdsConfig {
  adsensePublisherId: string;
  customHeaderScript: string;
  customFooterScript: string;
  adsTxt: string;
  inFeedInterval: number; // e.g. after every 3 entries
  slots: Record<AdPlacement, AdSlotConfig>;
}

export interface AffiliateBlock {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  targetUrl: string;
  buttonText: LocalizedText;
  placement: 'sidebar' | 'inside_entry' | 'footer';
  enabled: boolean;
  clicks: number;
}

export interface SiteSettings {
  siteName: string;
  companyName: string;
  contactPhone: string;
  contactEmail: string;
  socialLinks: {
    whatsapp: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  disclaimerNotice: LocalizedText;
  maintenanceMode: boolean;
  googleAnalyticsId: string;
}

export interface Suggestion {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  bodyRegion: string;
  howCommon?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface InboxMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'contact' | 'advertise';
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  language: Language;
  createdAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'super_admin' | 'editor';
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
}
