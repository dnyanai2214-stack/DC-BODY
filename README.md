# DC-Body - Encyclopedia of Strange But Normal Human Quirks

**DC-Body** is a friendly, trustworthy, multilingual encyclopedia of curious but completely harmless things the human body can do — reflexes, illusions, sounds, tricks, anatomical variations, and rare abilities.

- **Company**: D COMPANY
- **WhatsApp / Phone**: [+91 9607636444](https://wa.me/919607636444)
- **Email**: [dcompany1410@gmail.com](mailto:dcompany1410@gmail.com)
- **Notice**: *"Not medical advice. DC-Body describes what human bodies do. It does not diagnose anything. If something worries you, see a doctor."*

---

## 🌟 Key Features

1. **Multilingual (3 Languages)**:
   - Marathi (`mr`, default)
   - Hindi (`hi`)
   - English (`en`)
   - UI dictionary system + automatic English fallback.

2. **15 Original Seed Quirks**:
   - Ear Rumbling (Tensor Tympani contraction)
   - Nasal Cycle (Alternating turbinate airflow)
   - Benign Eyelid Twitching (Myokymia)
   - Jaw Clicking (TMJ articular disc movement)
   - Aphantasia (Mind without pictures)
   - Photic Sneeze Reflex (ACHOO Syndrome)
   - Negative Visual Afterimages (Cone photopigment fatigue)
   - Dermatographia (Skin writing histamine response)
   - Hypnic Jerk (Sleep starts falling sensation)
   - ASMR Tingles (Autonomous sensory meridian response)
   - Cold-Induced Vasodilation (Hunting reaction)
   - Misophonia (Selective sound rage trigger)
   - Geographic Tongue (Benign migratory glossitis)
   - Tendon Snapping (Harmless joint clicking)
   - Stomach Growling (Borborygmi & migrating motor complex)

3. **Taxonomy & Discovery**:
   - **12 Body Regions**: Brain, Nerves, Eyes, Ears, Nose, Mouth & throat, Skin & hair, Muscle, Bones & joints, Internal organs, Heart & blood, Whole body.
   - **7 Kinds**: Trick, Involuntary, Perception, Sound, Variation, Reflex, Rare ability.
   - Live search-as-you-type in the active language.
   - Quick chips: "Feels scary but normal", "Try it right now", "Random oddity".

4. **Monetization Engine (Admin-Controlled)**:
   - 9 ad slot placements (Header, Below-hero, In-feed every N items, Sidebar, Inside entry after paragraph 2, End of entry, Footer, Mobile sticky bottom, Interstitial).
   - Google AdSense, direct sponsor banners, and custom scripts.
   - Live `ads.txt` editor in admin.
   - Affiliate link recommendation blocks.
   - Impression & click analytics.
   - GDPR & India DPDP cookie consent banner.

5. **Admin Panel at `/admin`**:
   - Firebase Auth with whitelisted admin access (`dnyanai2214@gmail.com`, `dcompany1410@gmail.com`).
   - One-click **"Auto-translate with Gemini"** button in entry/blog editors.
   - 1-click **"Seed Initial Database"** button.
   - Convert user suggestions directly into published encyclopedia entries.
   - Export newsletter subscribers to CSV.

---

## 🚀 Setup & Deployment Guide

### 1. Firebase Project Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Under **Build > Authentication**, enable **Google** and **Email/Password**.
3. Under **Build > Firestore Database**, create a database.
4. Deploy the security rules from `firestore.rules` and `storage.rules`:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

### 2. Configuration & Environment Variables
Create `.env` file from `.env.example`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
DEFAULT_ADMIN_EMAIL="dnyanai2214@gmail.com"
COMPANY_EMAIL="dcompany1410@gmail.com"
COMPANY_PHONE="+91 9607636444"
```
Ensure `firebase-applet-config.json` contains your Firebase project credentials.

### 3. Setting Whitelisted Admins
In `src/context/AuthContext.tsx` and `firestore.rules`, the authorized admin emails are configured:
- `dnyanai2214@gmail.com`
- `dcompany1410@gmail.com`

### 4. Running the Development Server
```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000`.

### 5. First-Run Database Seeding
1. Visit `http://localhost:3000/admin`.
2. Log in using your whitelisted Google/Email account (or use the **"Quick Demo Admin Access"** button).
3. On the Dashboard, click **"सीडिंग स्क्रिप्ट (Seed Data)"**.
4. All 15 original entries, 12 body regions, 7 kinds, static pages, and monetization slots will be populated into Firestore immediately!

### 6. Production Deployment

#### Option A: Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

#### Option B: Vercel / Netlify
1. Connect your GitHub repository.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Add environment variables (`GEMINI_API_KEY`, etc.) in the Vercel dashboard.

---

© 2026 D COMPANY. DC-Body. All rights reserved.
