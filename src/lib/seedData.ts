import { BodyRegion, BodyKind, Tag, Entry, BlogPost, StaticPage, SiteSettings, AdsConfig, AffiliateBlock } from '../types';

export const SEED_REGIONS: BodyRegion[] = [
  {
    id: 'brain',
    name: { mr: 'मेंदू', hi: 'मस्तिष्क', en: 'Brain' },
    icon: 'Brain',
    description: {
      mr: 'विचार, प्रतिमा, स्मरण आणि मानसिक जाणिवांचे आश्चर्यकारक पैलू',
      hi: 'विचार, दृश्य कल्पना और मानसिक अनुभूतियों के अनोखे पहलू',
      en: 'Fascinating mental quirks, imagery variations, and cognitive sensations'
    },
    order: 1
  },
  {
    id: 'nerves',
    name: { mr: 'चेतासंस्था (नर्व्ह्स)', hi: 'तंत्रिकाएं', en: 'Nerves' },
    icon: 'Zap',
    description: {
      mr: 'संवेदना, प्रतिक्षिप्त क्रिया आणि विद्युत लहरींचे नवल',
      hi: 'संवेदनाएं, रिफ्लेक्स और नसों के अनपेक्षित संकेत',
      en: 'Signal pathways, crossed reflexes, and sensory cross-talk'
    },
    order: 2
  },
  {
    id: 'eyes',
    name: { mr: 'डोळे', hi: 'आंखें', en: 'Eyes' },
    icon: 'Eye',
    description: {
      mr: 'दृष्टीभ्रम, तरंगणारे ठिपके आणि प्रकाशसंवेदना',
      hi: 'दृष्टि भ्रम, तैरते बिंदु और प्रकाश के अद्भुत अनुभव',
      en: 'Visual illusions, light adaptations, and ocular phenomena'
    },
    order: 3
  },
  {
    id: 'ears',
    name: { mr: 'कान', hi: 'कान', en: 'Ears' },
    icon: 'Ear',
    description: {
      mr: 'आतील स्नायूंचे आवाज, कंपने आणि ऐकण्याची रहस्ये',
      hi: 'कान के भीतरी कंपन, गड़गड़ाहट और सुनने के रहस्य',
      en: 'Acoustic illusions, internal rumble muscles, and resonance'
    },
    order: 4
  },
  {
    id: 'nose',
    name: { mr: 'नाक', hi: 'नाक', en: 'Nose' },
    icon: 'Wind',
    description: {
      mr: 'हवेचा प्रवाह, गंधसंवेदना आणि चक्राकार बदल',
      hi: 'सांस का प्रवाह, गंध और प्राकृतिक नासिका चक्र',
      en: 'Turbinate airflow cycles, alternating breathing, and smell quirks'
    },
    order: 5
  },
  {
    id: 'mouth_throat',
    name: { mr: 'तोंड व घसा', hi: 'मुंह और गला', en: 'Mouth & throat' },
    icon: 'Smile',
    description: {
      mr: 'जीभ, जबडा, लाळ ग्रंथी आणि घशातील हालचाली',
      hi: 'जीभ, जबड़ा, लार ग्रंथियां और गले की दिलचस्प क्रियाएं',
      en: 'Jaw mechanics, tongue variations, and salivary reflexes'
    },
    order: 6
  },
  {
    id: 'skin_hair',
    name: { mr: 'त्वचा व केस', hi: 'त्वचा और बाल', en: 'Skin & hair' },
    icon: 'Sparkles',
    description: {
      mr: 'काटा येणे, त्वचेवर उमटणारे नकाशे आणि केस उभे राहणे',
      hi: 'रोंगटे खड़े होना, त्वचा पर उभार और संवेदी प्रतिक्रियाएं',
      en: 'Goosebumps, skin reactivity, and dermic responses'
    },
    order: 7
  },
  {
    id: 'muscle',
    name: { mr: 'स्नायू', hi: 'मांसपेशियां', en: 'Muscle' },
    icon: 'Activity',
    description: {
      mr: 'अचानक होणारी हालचाल, कंपने आणि स्नायूंचे ताण',
      hi: 'अनियंत्रित फड़कन, खिंचाव और सूक्ष्म मांसपेशी कंपन',
      en: 'Fasciculations, harmless twitches, and contraction loops'
    },
    order: 8
  },
  {
    id: 'bones_joints',
    name: { mr: 'हाडे व सांधे', hi: 'हड्डियां और जोड़', en: 'Bones & joints' },
    icon: 'Bone',
    description: {
      mr: 'सांधे वाजणे, कंडरांचा खटका आणि लवचिकता',
      hi: 'जोड़ों से चटकने की आवाज, लचीलापन और कंडराएं',
      en: 'Joint cracking, tendon snapping, and hypermobility traits'
    },
    order: 9
  },
  {
    id: 'internal_organs',
    name: { mr: 'अंतर्गत अवयव', hi: 'आंतरिक अंग', en: 'Internal organs' },
    icon: 'Layers',
    description: {
      mr: 'पोटाचे आवाज, पचनसंस्थेचे आकुंचन आणि जैविक घड्याळ',
      hi: 'पाचन तंत्र की ध्वनियां, संकुचन और जैविक लय',
      en: 'Gut peristalsis, digestive gurgles, and visceral mechanics'
    },
    order: 10
  },
  {
    id: 'heart_blood',
    name: { mr: 'हृदय व रक्तवाहिन्या', hi: 'हृदय और रक्त', en: 'Heart & blood' },
    icon: 'Heart',
    description: {
      mr: 'रक्तवाहिन्यांचे आकुंचन, नाडीचे ठोके आणि तापमानाचे प्रतिसाद',
      hi: 'रक्त वाहिकाओं का संकुचन, नाड़ी और तापमान प्रतिक्रिया',
      en: 'Vascular dilation, temperature hunting, and circulatory pulses'
    },
    order: 11
  },
  {
    id: 'whole_body',
    name: { mr: 'संपूर्ण शरीर', hi: 'संपूर्ण शरीर', en: 'Whole body' },
    icon: 'User',
    description: {
      mr: 'झोपेत बसणारे धक्के, तापमान नियमन आणि संपूर्ण शरीराचे प्रतिसाद',
      hi: 'नींद के झटके, कंपकपी और समग्र शारीरिक अनुभव',
      en: 'Sleep transitions, whole-body shivers, and systemic reflexes'
    },
    order: 12
  }
];

export const SEED_KINDS: BodyKind[] = [
  {
    id: 'trick',
    name: { mr: 'युक्ती / कसरत', hi: 'ट्रिक / करतब', en: 'Trick' },
    icon: 'Wand2',
    description: {
      mr: 'काही लोक स्वेच्छेने करू शकणाऱ्या शरीराच्या करामती',
      hi: 'शारीरिक करतब जो कुछ लोग अपनी मर्जी से कर सकते हैं',
      en: 'Voluntary physical techniques or motor party tricks'
    },
    order: 1
  },
  {
    id: 'involuntary',
    name: { mr: 'अनैच्छिक क्रिया', hi: 'अनैच्छिक क्रिया', en: 'Involuntary' },
    icon: 'RefreshCw',
    description: {
      mr: 'आपोआप घडणाऱ्या पण पूर्णतः सुरक्षित शारीरिक हालचाली',
      hi: 'स्वचालित लेकिन पूरी तरह सुरक्षित शारीरिक हरकतें',
      en: 'Automatic bodily actions outside conscious control'
    },
    order: 2
  },
  {
    id: 'perception',
    name: { mr: 'संवेदना व भ्रम', hi: 'संवेदना और भ्रम', en: 'Perception' },
    icon: 'EyeOff',
    description: {
      mr: 'मेंदू आणि ज्ञानेंद्रियांचे थक्क करणारे अनुभव',
      hi: 'मस्तिष्क और इंद्रियों के दिलचस्प अनुभव और भ्रम',
      en: 'Subjective sensory experiences, synesthesia, and illusions'
    },
    order: 3
  },
  {
    id: 'sound',
    name: { mr: 'शारीरिक आवाज', hi: 'शारीरिक आवाजें', en: 'Sound' },
    icon: 'Volume2',
    description: {
      mr: 'शरीरातून नैसर्गिकपणे निर्माण होणारे निरुपद्रवी नाद',
      hi: 'शरीर से स्वाभाविक रूप से उत्पन्न होने वाली हानिरहित ध्वनियां',
      en: 'Audible clicks, pops, rumbles, and gurgles'
    },
    order: 4
  },
  {
    id: 'variation',
    name: { mr: 'शारीरिक विविधता', hi: 'शारीरिक विविधता', en: 'Variation' },
    icon: 'Dna',
    description: {
      mr: 'मानवी शरीररचनेतील सामान्य नैसर्गिक फरक',
      hi: 'मानव शरीर रचना में सामान्य प्राकृतिक विविधता',
      en: 'Harmless anatomical and physiological variations across humans'
    },
    order: 5
  },
  {
    id: 'reflex',
    name: { mr: 'प्रतिक्षिप्त क्रिया (रिफ्लेक्स)', hi: 'रिफ्लेक्स', en: 'Reflex' },
    icon: 'Sparkle',
    description: {
      mr: 'बाह्य घटकांमुळे नसांनी दिलेला तात्काळ प्रतिसाद',
      hi: 'बाहरी उत्तेजना पर तंत्रिकाओं की तत्काल प्रतिक्रिया',
      en: 'Rapid nerve-mediated automatic responses to stimuli'
    },
    order: 6
  },
  {
    id: 'rare_ability',
    name: { mr: 'दुर्मिळ क्षमता', hi: 'दुर्लभ क्षमता', en: 'Rare ability' },
    icon: 'Award',
    description: {
      mr: 'केवळ काही टक्के लोकांकडे असणारी विशेष शारीरिक वैशिष्ट्ये',
      hi: 'बहुत कम लोगों में पाई जाने वाली विशेष शारीरिक खूबी',
      en: 'Uncommon abilities found in a small percentage of humans'
    },
    order: 7
  }
];

export const SEED_ENTRIES: Entry[] = [
  {
    id: 'ear-rumbling',
    slug: 'ear-rumbling',
    title: {
      mr: 'कानात घरघर निर्माण करण्याची क्षमता (टेन्सर टिम्पॅनी)',
      hi: 'कानों में बादलों जैसी गड़गड़ाहट (टेंसर टिम्पैनी संकुचन)',
      en: 'Ear Rumbling (Tensor Tympani Contraction)'
    },
    summary: {
      mr: 'मध्य कर्णातील एक सूक्ष्म स्नायू आकुंचन पावून कानात ढगांसारखा किंवा विमानासारखा मंद गडगडाट निर्माण होतो.',
      hi: 'मध्य कान की एक छोटी मांसपेशी को सिकोड़कर कानों के भीतर एक मंद गड़गड़ाहट पैदा करने की क्षमता।',
      en: 'The voluntary ability to contract the tensor tympani muscle inside the middle ear, producing a low, thunder-like rumble.'
    },
    body: {
      mr: 'आपल्या कानाच्या आत "टेन्सर टिम्पॅनी" (Tensor Tympani) नावाचा एक छोटा स्नायू असतो. याचे मुख्य काम म्हणजे आपण स्वतः जोरात बोलतो किंवा अन्न चावतो तेव्हा कानाचा पडदा जास्त कंप पावून कान दुखू नये म्हणून पडद्याला थोडे घट्ट खेचणे. काही लोकांमध्ये या स्नायूवर ऐच्छिक नियंत्रण असते. जेव्हा ते चेहऱ्याचे स्नायू किंवा जबडा विशिष्ट प्रकारे तणावात आणतात, तेव्हा हा स्नायू थरथरतो आणि कानात वादळाच्या वाऱ्यासारखा मंद घरघर आवाज येतो. हा आवाज बाहेरील कोणालाही ऐकू येत नाही. ही पूर्णतः सुरक्षित आणि मजेदार शारीरिक क्षमता आहे.',
      hi: 'हमारे कान के भीतरी भाग में "टेंसर टिम्पैनी" नाम की एक नन्ही मांसपेशी स्थित होती है। इसका प्राकृतिक कार्य जबड़ा चबाते समय या जोर से चिल्लाते समय कान के पर्दे को अत्यधिक कंपन से बचाना है। दुनिया में लगभग १५-२०% लोगों में इस मांसपेशी पर स्वैच्छिक नियंत्रण होता है। जब वे इसे सिकोड़ते हैं, तो कानों के अंदर बादलों की गड़गड़ाहट जैसा कम आवृत्ति का कंपन सुनाई देता है। यह किसी भी तरह की बीमारी नहीं है बल्कि कान की सुरक्षा प्रणाली का एक हानिरहित करतब है।',
      en: 'Deep inside the middle ear lies a minute muscle called the tensor tympani. Its evolutionary role is acoustic damping: protecting the hearing apparatus from loud self-generated sounds like chewing, yelling, or coughing by tightening the eardrum. While mostly reflex-driven, an estimated 10 to 20 percent of people can voluntarily contract this muscle at will. The physical vibration of the muscle contracting against the auditory ossicles produces a low-frequency roar resembling distant thunder or a jet engine. It is entirely benign, non-progressive, and a classic example of vestigial motor control.'
    },
    regionId: 'ears',
    kindId: 'trick',
    tags: ['ear', 'muscle', 'sound', 'trick'],
    howCommon: 'uncommon',
    isTryIt: true,
    tryItInstructions: {
      mr: 'डोळे घट्ट मिटून घ्या किंवा जांभई देताना घशाच्या मागचा भाग हलका ताणा. तुम्हाला कानाच्या आत एक मंद घरघर ऐकू येते का ते तपासा.',
      hi: 'अपनी आंखों को बहुत कसकर बंद करें या जम्हाई लेते समय गले के पिछले हिस्से में हल्का तनाव लाएं। क्या आपको कानों में हल्की गड़गड़ाहट सुनाई दी?',
      en: 'Close your eyes tightly, or stifle a deep yawn while tensing the back of your palate. Listen for a deep vibrating roar inside your skull.'
    },
    isFeelsScary: false,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    views: 1420,
    status: 'published',
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'nasal-cycle',
    slug: 'nasal-cycle',
    title: {
      mr: 'नाकाचे चक्र: एकाच नाकपुडीने श्वास घेणे',
      hi: 'नासिका चक्र: एक समय में एक ही नथुने से प्रमुख सांस',
      en: 'The Nasal Cycle: Alternating Nostril Dominance'
    },
    summary: {
      mr: 'आपले नाक दर २ ते ६ तासांनी आपोआप एका नाकपुडीतून दुसऱ्या नाकपुडीत श्वासाचा मुख्य प्रवाह बदलते.',
      hi: 'हमारा शरीर स्वाभाविक रूप से हर 2 से 6 घंटे में एक नथुने से दूसरे नथुने में सांस का मुख्य प्रवाह बदलता रहता है।',
      en: 'Your autonomic nervous system continuously alternates airflow congestion between nostrils every few hours.'
    },
    body: {
      mr: 'अनेक लोकांना वाटते की दोन्ही नाकपुड्यांमधून एकाच वेळी समान प्रमाणात श्वास घेतला जातो. परंतु प्रत्यक्षात स्वायत्त चेतासंस्था (Autonomic Nervous System) एका नाकपुडीतील रक्तवाहिन्या फुगवून तिचा मार्ग थोडा अरुंद करते, तर दुसऱ्या नाकपुडीतील मार्ग मोकळा करते. काही तासांनंतर ही क्रिया उलट होते. यामुळे प्रत्येक नाकपुडीच्या आतील ओलसर अस्तराला विश्रांती मिळते, धूळ गाळण्याची क्षमता सुधारते आणि गंधांचे वेगवेगळे सूक्ष्म रेणू ओळखणे मेंदूला सोपे जाते. झोपताना एका कुशीवर झोपल्यास खालची नाकपुडी भरल्यासारखी वाटणे हे याच चक्राचा भाग आहे.',
      hi: 'अक्सर लोग जब देखते हैं कि उनका एक नथुना बंद है, तो उन्हें लगता है कि उन्हें जुकाम हो गया है। वास्तव में इसे "नेजल साइकिल" कहा जाता है। स्वायत्त तंत्रिका तंत्र हर २ से ६ घंटे में एक तरफ के ऊतकों में रक्त प्रवाह बढ़ाकर उसे आंशिक रूप से सिकोड़ देता है, जबकि दूसरी तरफ का मार्ग पूरी तरह खुला रहता है। यह प्रक्रिया नाक की अंदरूनी नमी बनाए रखने और विभिन्न प्रकार की गंधों को बेहतर तरीके से सूंघने के लिए कुदरत की एक अचूक व्यवस्था है।',
      en: 'Contrary to intuition, we rarely breathe equally through both nostrils. Through a physiological rhythm governed by the autonomic nervous system, erectile turbinate tissues in one nostril swell with venous blood while the other decongests. The dominant nostril handles up to 85% of airflow before switching 2 to 6 hours later. This alternating cycle serves vital protective purposes: it prevents mucous membranes from drying out, allows cilia time to recover, and dramatically enhances olfactory acuity, as different scent molecules require different airflow velocities to bind with receptors.'
    },
    regionId: 'nose',
    kindId: 'involuntary',
    tags: ['nose', 'breathing', 'cycle', 'reflex'],
    howCommon: 'very_common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'आपल्या ओठांच्या वर बोट आडवे धरा आणि नाकाने सावकाश उसासा सोडा. तुम्हाला स्पष्ट जाणवेल की एका बाजूने जास्त गरम हवा बाहेर येत आहे.',
      hi: 'अपनी तर्जनी उंगली को नाक के ठीक नीचे रखें और धीरे से सांस छोड़ें। आप पाएंगे कि एक नथुने से हवा का झोंका काफी तेज है और दूसरे से धीमा।',
      en: 'Hold your index finger horizontally beneath your nostrils and exhale gently. Notice how one side produces a much stronger jet of warm air.'
    },
    isFeelsScary: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    views: 2890,
    status: 'published',
    createdAt: '2026-03-02T11:00:00.000Z',
    updatedAt: '2026-03-02T11:00:00.000Z'
  },
  {
    id: 'eyelid-twitching',
    slug: 'eyelid-twitching',
    title: {
      mr: 'डोळा लवणे (ऑर्बिक्युलरिस मायोकेमिया)',
      hi: 'आंख फड़कना (सौम्य पलक कंपन)',
      en: 'Benign Eyelid Twitching (Myokymia)'
    },
    summary: {
      mr: 'डोळ्याच्या पापणीतील स्नायूंचे अचानक होणारे निरुपद्रवी फडफडणे, जे सहसा थकवा किंवा कॅफिनमुळे होते.',
      hi: 'पलकों की सूक्ष्म मांसपेशियों का अचानक और हानिरहित कंपन, जो तनाव, नींद की कमी या चाय-कॉफी से होता है।',
      en: 'Harmless involuntary micro-spasms of the eyelid muscle fibers, commonly triggered by fatigue or stress.'
    },
    body: {
      mr: 'आपल्याकडे डोळा लवण्याबाबत अनेक शुभ-अशुभ समजुती आहेत. विज्ञानाच्या दृष्टीने याला "मायोकेमिया" (Myokymia) म्हणतात. डोळ्याभोवती असलेल्या "ऑर्बिक्युलरिस ऑक्युलाय" स्नायूमधील काही मोजके तंतू चेतासंस्थेच्या तात्पुरत्या उत्तेजनेमुळे आपोआप थरथरतात. झोप पूर्ण न होणे, संगणक किंवा मोबाईलच्या स्क्रीनचा ताण, चहा-कॉफीचे अतिसेवन आणि मानसिक थकवा ही याची मुख्य कारणे असतात. हे काही मिनिटांपासून काही दिवस राहू शकते आणि विश्रांती घेतल्यावर स्वतःहून थांबते. याचा कोणत्याही गंभीर आजाराशी संबंध नसतो.',
      hi: 'आंख फड़कने को लेकर भारतीय समाज में कई लोककथाएं और शकुन-अपशकुन प्रचलित हैं। लेकिन चिकित्सीय दृष्टि से इसे "सौम्य मायोकेमिया" कहा जाता है। यह पलक की मांसपेशियों के तंतुओं का एक छोटा सा स्वचालित संकुचन है। देर रात तक जागना, अत्यधिक स्क्रीन टाइम, तनाव और कैफीन का अधिक सेवन इसकी सबसे आम वजहें हैं। यह पूरी तरह हानिरहित होता है और थोड़ी नींद और आराम से स्वतः ठीक हो जाता है।',
      en: 'Benign eyelid myokymia is the spontaneous, fine, fascicular contraction of the orbicularis oculi muscle, typically confined to the lower eyelid. Though culturally surrounded by omens and superstitions, physiologically it is a transient peripheral nerve irritation. Common drivers include sleep deprivation, prolonged visual display terminal use, high caffeine intake, dehydration, and acute psychological stress. Because only localized motor units fire without spreading across the facial nerve, the phenomenon is benign and self-limiting.'
    },
    regionId: 'eyes',
    kindId: 'involuntary',
    tags: ['eye', 'muscle', 'twitch', 'stress'],
    howCommon: 'very_common',
    isTryIt: false,
    isFeelsScary: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    views: 3120,
    status: 'published',
    createdAt: '2026-03-03T12:00:00.000Z',
    updatedAt: '2026-03-03T12:00:00.000Z'
  },
  {
    id: 'jaw-clicking',
    slug: 'jaw-clicking',
    title: {
      mr: 'जबडा उघडताना होणारा खटका (टीएमजे क्लिक)',
      hi: 'जबड़ा खोलते समय कट-कट की आवाज (टीएमजे डिस्क स्लिप)',
      en: 'Jaw Clicking and Popping (TMJ Disc Relocation)'
    },
    summary: {
      mr: 'जांभई देताना किंवा मोठे तोंड उघडताना जबड्याच्या सांध्यातून येणारा वेदनारहित बारीक आवाज.',
      hi: 'बड़ा निवाला खाते या जम्हाई लेते समय जबड़े के जोड़ से आने वाली बिना दर्द की हल्की कट-कट ध्वनि।',
      en: 'A soft, painless audible snap in the temporomandibular joint caused by the articular disc shifting.'
    },
    body: {
      mr: 'आपल्या कानाच्या अगदी समोर जबड्याचा सांधा (Temporomandibular Joint - TMJ) असतो. या सांध्यामध्ये हाडांचे घर्षण टाळण्यासाठी एक लहान उपास्थि डिस्क (कार्टिलेज डिस्क) असते. जेव्हा आपण तोंड उघडतो, तेव्हा जबड्याचे हाड पुढे सरकते. अनेकांमध्ये ही गादी थोडी मागे-पुढे सरकते आणि जागेवर परत जाताना हलका "क्लिक" आवाज येतो. जोपर्यंत यात कोणतीही तीव्र वेदना किंवा जबडा अडकणे (lock jaw) नसते, तोपर्यंत हा आवाज पूर्णपणे निरुपद्रवी मानला जातो. जगभरातील सुमारे ३० ते ५० टक्के लोकांमध्ये ही स्थिती सामान्यपणे आढळते.',
      hi: 'कान के ठीक सामने जहां ऊपरी और निचला जबड़ा मिलता है, उसे टीएमजे (TMJ) जोड़ कहते हैं। इस जोड़ के बीच में एक गद्दीदार डिस्क होती है। जब हम मुंह चौड़ा खोलते हैं, तो यह डिस्क कभी-कभी अपनी जगह से थोड़ा फिसलकर वापस आती है, जिससे एक सूक्ष्म "क्लिक" की ध्वनि उत्पन्न होती है। यदि इसके साथ कोई असहनीय दर्द या सूजन न हो, तो यह बेहद आम और हानिरहित स्थिति है जो आधी से अधिक आबादी में देखी जाती है।',
      en: 'The temporomandibular joint (TMJ) connects your jawbone to your skull with a small fibrocartilaginous articular disc acting as a shock absorber. In roughly 30 to 50% of healthy adults, when opening the jaw wide to yawn or chew, the condyle momentarily slips over the posterior band of this disc, snapping back into place with an audible "pop" or "click". Absent sharp pain, swelling, or limited jaw mobility (trismus), isolated clicking is considered a benign anatomical variation of joint mechanics.'
    },
    regionId: 'mouth_throat',
    kindId: 'sound',
    tags: ['jaw', 'joint', 'sound', 'bone'],
    howCommon: 'common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'आपली बोटे दोन्ही कानांच्या अगदी पुढे गालावर ठेवा आणि तोंड हळूच मोठे उघडा. तुम्हाला सांध्याची हलकी हालचाल जाणवेल.',
      hi: 'अपनी दोनों तर्जनी उंगलियों को कानों के ठीक सामने चेहरे पर रखें और धीरे-धीरे मुंह पूरा खोलें। क्या आपको जोड़ की हरकत या हल्की क्लिक महसूस हुई?',
      en: 'Place your fingertips just in front of your ear canals on both sides and open your mouth wide slowly. Feel the smooth gliding of the mandibular condyle.'
    },
    isFeelsScary: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
    views: 1980,
    status: 'published',
    createdAt: '2026-03-04T13:00:00.000Z',
    updatedAt: '2026-03-04T13:00:00.000Z'
  },
  {
    id: 'aphantasia',
    slug: 'aphantasia',
    title: {
      mr: 'डोळे मिटल्यावर काहीही न दिसणे: अफँटासिया',
      hi: 'मन की आंखों में तस्वीर न बनना: अफैंटेसिया',
      en: 'Aphantasia: The Mind Without Pictures'
    },
    summary: {
      mr: 'मनात कोणत्याही वस्तूचे किंवा दृश्याचे चित्र उभे न राहण्याची एक दुर्मिळ पण निरोगी मेंदूची अवस्था.',
      hi: 'आंखें बंद करने पर विचारों में किसी दृश्य या वस्तु की छवि न देख पाने की एक सुरक्षित न्यूरोलॉजिकल विविधता।',
      en: 'A cognitive variation where an individual cannot voluntarily generate mental imagery in their mind’s eye.'
    },
    body: {
      mr: 'जेव्हा आपण एखाद्याला "समुद्रकिनाऱ्यावर सूर्यास्त होतोय अशी कल्पना करा" असे सांगतो, तेव्हा बहुतांश लोक त्यांच्या मनात लाल सूर्य आणि लाटांचे चित्र स्पष्टपणे पाहू शकतात. परंतु लोकसंख्येच्या सुमारे २ ते ३ टक्के लोकांना डोळे मिटल्यावर केवळ अंधार दिसतो. याला "अफँटासिया" (Aphantasia) म्हणतात. याचा अर्थ त्यांची कल्पनाशक्ती कमी असते असा अजिबात नाही; ते संकल्पना, तथ्ये आणि तर्काच्या माध्यमातून हुशारीने विचार करतात, परंतु त्यांच्या मेंदूत दृश्य पडदा नसतो. ही कोणतीही अपंगता नसून मानवी मेंदूच्या वैविध्याचा एक भाग आहे.',
      hi: 'जब हम किसी से कहते हैं कि "लाल सेब की कल्पना करो", तो अधिकांश लोग अपने दिमाग में एक चमकते सेब की तस्वीर देख लेते हैं। लेकिन लगभग 2 से 3 प्रतिशत लोगों के लिए आंखें बंद करने पर सिर्फ काला अंधेरा होता है। इसे अफैंटेसिया कहते हैं। ऐसे लोग सब कुछ समझते हैं और याद रखते हैं, लेकिन वे विचारों को दृश्य रूप में नहीं "देख" सकते। यह कोई बीमारी नहीं, बल्कि इंसानी सोच की एक दुर्लभ प्राकृतिक विविधता है।',
      en: 'While most humans report seeing vivid mental pictures when daydreaming or recalling memories, individuals with aphantasia possess a blind "mind’s eye". Coined in 2015 by neurologist Adam Zeman, aphantasia describes the condition where voluntary visual imagination is entirely absent. People with aphantasia understand abstract concepts, recognize faces effortlessly in the physical world, and recall facts accurately, but their cognitive processing relies on semantic, spatial, or propositional data rather than mental simulations.'
    },
    regionId: 'brain',
    kindId: 'rare_ability',
    tags: ['brain', 'mind', 'perception', 'rare'],
    howCommon: 'rare',
    isTryIt: true,
    tryItInstructions: {
      mr: 'डोळे बंद करा आणि तुमच्या आवडीच्या मित्राचा चेहरा किंवा पिवळा सूर्यफूल मनात स्पष्ट पाहण्याचा प्रयत्न करा. तुम्हाला प्रत्यक्ष चित्र दिसते की केवळ माहिती आठवते?',
      hi: 'आंखें बंद करें और अपने सबसे प्यारे दोस्त के चेहरे को याद करने की कोशिश करें। क्या आपको असली तस्वीर जैसी छवि दिखती है या सिर्फ विचार आते हैं?',
      en: 'Close your eyes and try to mentally project a ripe yellow lemon. Rank the vividness on a scale of 1 (total darkness) to 5 (as crisp as real life).'
    },
    isFeelsScary: false,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    views: 4210,
    status: 'published',
    createdAt: '2026-03-05T14:00:00.000Z',
    updatedAt: '2026-03-05T14:00:00.000Z'
  },
  {
    id: 'photic-sneeze-reflex',
    slug: 'photic-sneeze-reflex',
    title: {
      mr: 'उन्हात गेल्यावर शिंक येणे (अचू सिंड्रोम)',
      hi: 'धूप में निकलते ही छींक आना (अचू सिंड्रोम)',
      en: 'Photic Sneeze Reflex (ACHOO Syndrome)'
    },
    summary: {
      mr: 'अचानक कडक सूर्यप्रकाशात किंवा प्रखर प्रकाशात गेल्यावर न थांबवता येणारी शिंक येणे.',
      hi: 'अचानक तेज धूप या चमकदार रोशनी देखने पर अनैच्छिक रूप से छींक आ जाना।',
      en: 'An autosomal dominant genetic trait causing involuntary sneezing when exposed to sudden bright light.'
    },
    body: {
      mr: 'अंधाऱ्या खोलीतून बाहेर पडताच डोळ्यांवर कडक ऊन पडल्यास सलग दोन-तीन शिंका येतात असा अनुभव अनेकांना येतो. याला वैद्यकीय भाषेत ACHOO सिंड्रोम (Autosomal Dominant Compelling Helio-Ophthalmic Outburst) म्हणतात. हा एक अनुवांशिक गुणधर्म आहे जो जगातील सुमारे २५ ते ३० टक्के लोकांमध्ये आढळतो. डोळ्यांच्या बाहुलीला आकुंचन पावणारी दृष्टीचेता (Optic Nerve) आणि नाकातील संवेदना वाहून नेणारी ट्रायजेमिनल चेता (Trigeminal Nerve) मेंदूत अगदी जवळून जातात. अतिप्रकाशाचे संकेत मेंदूत जाताना नाकाच्या चेतेमध्ये "सिग्नल क्रॉस" होतात आणि मेंदू नाकात काहीतरी अडकले आहे समजून शिंकण्याची आज्ञा देतो.',
      hi: 'अंधेरे कमरे या सिनेमा हॉल से बाहर तेज धूप में निकलते ही अचानक छींक आ जाना एक बहुत ही रोचक जैविक घटना है जिसे "अचू सिंड्रोम" कहते हैं। यह कोई एलर्जी नहीं है, बल्कि आंखों की ऑप्टिक नर्व और नाक की ट्राइजेमिनल नर्व के बीच मस्तिष्क में तारों के उलझने जैसा है। तेज रोशनी का तेज सिग्नल नाक की नस को उत्तेजित कर देता है और मस्तिष्क छींकने का संदेश भेज देता है। यह पूरी तरह से हानिरहित वंशानुगत गुण है।',
      en: 'Stepping from a dim interior into dazzling sunlight triggers a sudden fit of sneezing in roughly 18 to 35% of the human population. Formally named the ACHOO (Autosomal Dominant Compelling Helio-Ophthalmic Outburst) syndrome, it is caused by neural crosstalk in the brainstem. The optic nerve transmits an intense burst of electrical signals to constrict the pupils; in susceptible individuals, some of this electrical signal inadvertently leaks into the adjacent trigeminal nerve, causing the brain to misinterpret light intensity as a nasal irritant.'
    },
    regionId: 'nerves',
    kindId: 'reflex',
    tags: ['nerves', 'reflex', 'sun', 'sneeze'],
    howCommon: 'uncommon',
    isTryIt: true,
    tryItInstructions: {
      mr: 'जेव्हा शिंक अडकलेली वाटते, तेव्हा सुरक्षितपणे एखाद्या दिव्याकडे किंवा खिडकीबाहेरील उजेडाकडे नजर टाका.',
      hi: 'जब छींक आते-आते रुक जाए, तो सुरक्षित रूप से किसी तेज रोशनी या खिड़की की तरफ देखें। क्या छींक तुरंत आ गई?',
      en: 'Next time a sneeze feels stuck halfway in your nose, safely gaze upward toward ambient daylight (do not look directly at the sun).'
    },
    isFeelsScary: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=900&q=80',
    views: 2650,
    status: 'published',
    createdAt: '2026-03-06T15:00:00.000Z',
    updatedAt: '2026-03-06T15:00:00.000Z'
  },
  {
    id: 'afterimages',
    slug: 'afterimages',
    title: {
      mr: 'डोळे मिटल्यावर दिसणारे तरंगते रंग (दृष्टीची प्रतिप्रतिमा)',
      hi: 'टकटकी लगाने के बाद तैरने वाली छाया (आफ्टरइमेज)',
      en: 'Negative Visual Afterimages'
    },
    summary: {
      mr: 'एखाद्या चमकदार रंगाकडे एकटक पाहिल्यानंतर पांढऱ्या भिंतीवर त्याचा विरोधी रंग तरंगताना दिसणे.',
      hi: 'किसी रंगीन वस्तु को कुछ सेकंड देखने के बाद खाली दीवार पर उसका उलटा रंग तैरता हुआ नजर आना।',
      en: 'An optical illusion caused by photo-pigment depletion in retinal cone cells after prolonged staring.'
    },
    body: {
      mr: 'आपल्या डोळ्यांच्या पडद्यावर (Retina) रंग ओळखणाऱ्या तीन प्रकारच्या शंकूपेशी (Cone cells) असतात: तांबड्या, हिरव्या आणि निळ्या. जेव्हा आपण एखाद्या लाल रंगाच्या ठिपक्याकडे सलग ३० सेकंद न हलता पाहतो, तेव्हा लाल रंग ओळखणाऱ्या पेशी थकतात आणि मंदावतात. त्यानंतर जेव्हा आपण पांढऱ्या कागदाकडे किंवा भिंतीकडे पाहतो, तेव्हा थकलेल्या पेशी कमी प्रतिसाद देतात, पण हिरव्या व निळ्या पेशी सक्रिय असतात. त्यामुळे त्या ठिकाणी लाल रंगाऐवजी त्याचा विरोधी म्हणजे हिरवट-निळसर रंगाचा ठिपका दिसतो. हा डोळ्यांचा एक नैसर्गिक प्रकाश-अनुकूलन खेळ आहे.',
      hi: 'रेटीना में रंगों को पहचानने वाले विशेष शंकु (कोन सेल्स) पाए जाते हैं। जब आप किसी चमकीले लाल रंग को 30 सेकंड तक लगातार घूरते हैं, तो उस रंग के प्रति संवेदनशील रिसेप्टर्स थक जाते हैं। इसके बाद जब आप किसी सफेद सतह पर देखते हैं, तो वो थके हुए रिसेप्टर्स धीमे पड़ जाते हैं जबकि विपरीत रंग वाले रिसेप्टर्स अधिक संकेत भेजते हैं। परिणामस्वरूप आपको लाल की जगह हरा या नीला साया तैरता दिखाई देता है। यह आंखों की सुरक्षा का स्वाभाविक प्रमाण है।',
      en: 'Negative afterimages demonstrate the opponent-process theory of human color vision. Staring fixedly at a saturated color (such as bright red) desensitizes and bleaches the photopigments in that specific subset of retinal cone photoreceptors. When your gaze shifts to a neutral white or gray surface, the un-fatigued opponent photoreceptors (green/cyan) fire at full baseline strength, causing your visual cortex to perceive an ethereal, complementary-colored ghost shape that drifts with your eye movements.'
    },
    regionId: 'eyes',
    kindId: 'perception',
    tags: ['eye', 'vision', 'illusion', 'perception'],
    howCommon: 'very_common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'एखाद्या लाल किंवा गडद ठिपक्याकडे न पापणी लवता २० सेकंद पाहा, आणि मग लगेच पांढऱ्या भिंतीकडे पाहून जलद पापण्या मिचकावा.',
      hi: 'किसी लाल बिंदु को बिना पलक झपकाए 20 सेकंड तक घूरें, फिर तुरंत किसी सफेद दीवार की ओर देखकर जल्दी-जल्दी पलकें झपकाएं।',
      en: 'Stare unblinkingly at a bright red object for 30 seconds, then quickly shift your gaze to a blank white ceiling or sheet of paper.'
    },
    isFeelsScary: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
    views: 1830,
    status: 'published',
    createdAt: '2026-03-07T16:00:00.000Z',
    updatedAt: '2026-03-07T16:00:00.000Z'
  },
  {
    id: 'dermatographia',
    slug: 'dermatographia',
    title: {
      mr: 'त्वचेवर उमटणारी अक्षरे (डर्मेटोग्राफिया)',
      hi: 'त्वचा पर लिखावट का उभर आना (डर्मेटोग्राफिया)',
      en: 'Dermatographia: Skin Writing'
    },
    summary: {
      mr: 'त्वचेवर नखाने हलके खरवडल्यास काही मिनिटांत तिथे उठावदार लाल रेष किंवा अक्षर उमटणे.',
      hi: 'त्वचा पर नाखून या पेन से हल्का खरोंचने पर वहां उभरी हुई लाल रेखाएं या शब्द बन जाना।',
      en: 'An exaggerated histamine response where mild mechanical pressure on skin causes raised red welts.'
    },
    body: {
      mr: 'डर्मेटोग्राफिया (Dermatographia) या शब्दाचा अर्थच "त्वचेवर लिहिणे" असा होतो. जगातील सुमारे २ ते ५ टक्के लोकांमध्ये त्वचेखालील मास्ट पेशी (Mast cells) अत्यंत संवेदनशील असतात. जेव्हा एखादी टोकदार वस्तू त्वचेवरून हलकेच घासली जाते, तेव्हा या पेशी तात्काळ हिस्टामिन नावाचे रसायन सोडतात. त्यामुळे तिथल्या सूक्ष्म रक्तवाहिन्या प्रसरण पावतात आणि त्वचेवर फुगलेली लाल रेघ तयार होते. ही रेघ अर्ध्या तासात कोणतीही खूण न ठेवता आपोआप नाहीशी होते. यामुळे कोणतीही हानी होत नाही.',
      hi: 'डर्मेटोग्राफिया को "स्किन राइटिंग" भी कहा जाता है। दुनिया में 2 से 5 प्रतिशत लोगों की त्वचा बहुत संवेदनशील होती है। जब वे किसी ब्लंट पेंसिल या नाखून से अपनी बांह पर कुछ लिखते हैं, तो कुछ ही मिनटों में वहां एक लाल, उभरा हुआ अक्षर स्पष्ट दिखने लगता है जैसे कोई टैटू हो। यह त्वचा की कोशिकाओं द्वारा हिस्टामाइन छोड़ने के कारण होता है और लगभग 30 मिनट में बिना किसी दवा के अपने आप गायब हो जाता है।',
      en: 'Often called "skin writing", dermatographia is a form of physical urticaria affecting roughly 2 to 5% of individuals. In people with this benign trait, cutaneous mast cells are hypersensitive to mechanical shear stress. Lightly scratching or pressing a dull stylus along the forearm causes localized mast cell degranulation, triggering histamine release. This dilates microcapillaries and produces a sharply defined, raised erythematous wheal mirroring the exact trace of the pressure, which resolves spontaneously within 30 minutes.'
    },
    regionId: 'skin_hair',
    kindId: 'variation',
    tags: ['skin', 'histamine', 'writing', 'rare'],
    howCommon: 'rare',
    isTryIt: true,
    tryItInstructions: {
      mr: 'हाताच्या त्वचेवर नखाने अगदी हलका ओरखडा ओढा. ५ मिनिटांत ती जागा उठावदार लाल होते का ते पाहा.',
      hi: 'अपनी कलाई के पिछले हिस्से पर बिना ज्यादा दबाव दिए नाखून से एक रेखा खींचें। 5 मिनट बाद देखें क्या वह उभर आई है।',
      en: 'Firmly drag the cap of a pen across your inner forearm. Wait 5 minutes to see if an unmistakable raised red line emerges.'
    },
    isFeelsScary: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f5be94191c0?auto=format&fit=crop&w=900&q=80',
    views: 3740,
    status: 'published',
    createdAt: '2026-03-08T17:00:00.000Z',
    updatedAt: '2026-03-08T17:00:00.000Z'
  },
  {
    id: 'hypnic-jerk',
    slug: 'hypnic-jerk',
    title: {
      mr: 'झोपताना बसणारा अचानक धक्का (हायप्निक जर्क)',
      hi: 'सोते समय अचानक गिरने का अहसास और झटका (हिप्निक जर्क)',
      en: 'Hypnic Jerk: The Falling Sensation as You Fall Asleep'
    },
    summary: {
      mr: 'गाढ झोपेत जाण्याच्या क्षणी संपूर्ण शरीराला बसणारा जोरदार झटका आणि उंचावरून पडल्याचा भास.',
      hi: 'नींद की शुरुआत में अचानक पूरे शरीर का जोर से हिलना और ऊंचाई से गिरने का भ्रम होना।',
      en: 'A sudden, strong involuntary muscle twitch occurring during the transition from wakefulness to sleep.'
    },
    body: {
      mr: 'दिवसभराच्या थकव्यानंतर आपण झोपेच्या स्वाधीन होत असताना अनेकदा अचानक संपूर्ण शरीर थरथरते किंवा पाय हवेत फेकला जातो, जणू आपण कुठूनतरी खाली पडत आहोत. याला "हायप्निक जर्क" (Hypnic Jerk किंवा Sleep Start) म्हणतात. जेव्हा मेंदू जागृत अवस्थेतून झोपेच्या अवस्थेत जातो, तेव्हा स्नायूंना शिथिल होण्याचे संदेश मिळतात. परंतु काही वेळा मेंदूची मोटर सिस्टीम या शिथिलतेला "शरीर कोसळत आहे" असे चुकून समजते आणि संरक्षणासाठी तात्काळ स्नायूंना जोरदार आकुंचन पावण्याचे आदेश देते. सुमारे ७० टक्क्यांहून अधिक लोकांना आयुष्यात याचा अनुभव येतो.',
      hi: 'बिस्तर पर लेटकर जैसे ही आंखें भारी होने लगती हैं, अचानक ऐसा लगता है कि हम किसी सीढ़ी से फिसल गए या गड्ढे में गिर रहे हैं और पूरा शरीर एक झटके के साथ जाग उठता है। वैज्ञानिक भाषा में इसे "हिप्निक जर्क" कहते हैं। जागने से सोने के संक्रमण के दौरान मस्तिष्क की मोटर प्रणाली मांसपेशियों के अचानक ढीले पड़ने को "गिरना" समझ लेती है और संतुलन बचाने के लिए तुरंत एक तीव्र झटका भेजती है। यह पूरी तरह सामान्य न्यूरोलॉजिकल रिफ्लेक्स है।',
      en: 'Occurring in up to 70% of healthy humans, a hypnic jerk (or sleep start) is a benign, brief myoclonic twitch during the hypnagogic state — the borderline between wakefulness and stage 1 non-REM sleep. As muscle tone naturally relaxes, the reticular activating system occasionally misinterprets this rapid loss of motor resistance as physical falling. In an ancient evolutionary reflex to prevent falling out of tree canopies, the brain fires an abrupt cortical signal to jolt the limbs back into tension.'
    },
    regionId: 'whole_body',
    kindId: 'involuntary',
    tags: ['sleep', 'muscle', 'brain', 'jerk'],
    howCommon: 'very_common',
    isTryIt: false,
    isFeelsScary: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
    views: 5120,
    status: 'published',
    createdAt: '2026-03-09T18:00:00.000Z',
    updatedAt: '2026-03-09T18:00:00.000Z'
  },
  {
    id: 'asmr-tingles',
    slug: 'asmr-tingles',
    title: {
      mr: 'मेंदूत सुखावणारी मुंग्यांची लाट (ASMR टिंगल्स)',
      hi: 'सिर में सुखद झुनझुनी की लहर (एएसएमआर)',
      en: 'ASMR: Autonomous Sensory Meridian Response'
    },
    summary: {
      mr: 'हळुवार कुजबुजणे किंवा हलका स्पर्श ऐकताना डोक्याच्या मागून पाठीत उतरणारी सुखावह मुंग्यांची लाट.',
      hi: 'फुसफुसाहट या कोमल स्पर्श से सिर के पीछे से शुरू होकर रीढ़ तक जाने वाली सुखद झुनझुनी।',
      en: 'A deeply relaxing tingling sensation triggered across the scalp and neck by gentle acoustic or visual stimuli.'
    },
    body: {
      mr: 'काही विशिष्ट मंद आवाज (उदा. पुस्तकाची पाने उलटणे, हळू आवाजात बोलणे, कात्रीने केस कापणे किंवा पेन्सिलने कागदावर लिहिणे) ऐकल्यास अनेकांना डोक्याच्या वरच्या भागात आणि मानेवर एक अतिशय शांत आणि सुखद मुंग्यांची लाट जाणवते. याला ASMR (Autonomous Sensory Meridian Response) म्हणतात. हा अनुभव तणाव कमी करतो, हृदयाचे ठोके संथ करतो आणि गाढ झोप लागण्यास मदत करतो. मेंदूतील ऑक्सिटोसिन आणि डोपामाइन या रसायनांच्या उत्सर्जनाशी याचा संबंध असल्याचे संशोधनात आढळून आले आहे.',
      hi: 'किताब के पन्नों के पलटने, धीमी फुसफुसाहट या बालों में कंघी करने की कोमल आवाज सुनकर कई लोगों को सिर के ऊपरी हिस्से और गर्दन पर एक शांत, सिहरन भरी झुनझुनी महसूस होती है जिसे एएसएमआर (ASMR) कहा जाता है। यह कोई बीमारी नहीं बल्कि मस्तिष्क का एक बेहद आरामदायक संवेदी अनुभव है जो हृदय गति को धीमा करके मन को परम शांति प्रदान करता है।',
      en: 'Autonomous Sensory Meridian Response (ASMR) describes a calming, static-like tingling sensation originating at the crown of the scalp and cascading down the cervical spine. Triggered by gentle, rhythmic sensory inputs like whispering, slow hand movements, or page turning, functional MRI studies reveal that ASMR activates brain regions associated with social bonding, empathy, and reward release (dopamine and oxytocin).'
    },
    regionId: 'brain',
    kindId: 'perception',
    tags: ['asmr', 'sound', 'brain', 'relax'],
    howCommon: 'common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'शांत जागेवर हेडफोन लावा आणि कुजबुजणारा किंवा पुस्तकाची पाने उलटणारा मंद आवाज ऐका. मानेवर मुंग्या आल्यासारखे वाटते का?',
      hi: 'शांत कमरे में हेडफोन लगाकर किसी धीमी फुसफुसाहट या पन्ने पलटने की रिकॉर्डिंग सुनें और महसूस करें कि क्या सिर में कोई सुखद सिहरन हुई।',
      en: 'Put on quality headphones in a silent room and listen to an audio recording of slow crisp page-turning or deliberate whispering.'
    },
    isFeelsScary: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    views: 3410,
    status: 'published',
    createdAt: '2026-03-10T19:00:00.000Z',
    updatedAt: '2026-03-10T19:00:00.000Z'
  },
  {
    id: 'cold-vasodilation',
    slug: 'cold-vasodilation',
    title: {
      mr: 'थंडीत बोटे लाल होणे (द हंटिंग रिएक्शन)',
      hi: 'ठंड में उंगलियों का अचानक लाल और गर्म होना (हंटिंग रिएक्शन)',
      en: 'Cold-Induced Vasodilation (The Hunting Reaction)'
    },
    summary: {
      mr: 'बर्फात हात धरल्यावर बोटे पांढरी पडतात, पण १५ मिनिटांनी शरीर बोटे वाचवण्यासाठी अचानक रक्तपुरवठा वाढवून ती लाल करते.',
      hi: 'बर्फ छूने पर पहले उंगलियां ठंडी पड़ती हैं, लेकिन कुछ देर बाद शरीर उन्हें बचाने के लिए अचानक रक्त प्रवाह बढ़ा देता है।',
      en: 'A rhythmic cyclic widening of blood vessels in cold extremities to prevent tissue freezing.'
    },
    body: {
      mr: 'जेव्हा आपण बर्फाळ पाण्यात हात घालतो किंवा कडाक्याच्या थंडीत असतो, तेव्हा आपले शरीर मुख्य अवयवांचे (हृदय, मेंदू) तापमान टिकवण्यासाठी हात-पायांच्या रक्तवाहिन्या आकुंचन पावते, ज्यामुळे बोटे फिकट व थंड पडतात. परंतु १५ मिनिटांनंतर एक आश्चर्यकारक चमत्कार घडतो: बोटांच्या रक्तवाहिन्या अचानक मोठ्या होतात आणि गरम रक्ताचा प्रवाह वेगाने बोटांकडे धाव घेतो, ज्यामुळे बोटे लालबुंद होतात. याला "हंटिंग रिएक्शन" (Hunting Reaction) म्हणतात. शरीर रक्तवाहिन्या आकुंचन आणि प्रसरण यांच्यात समन्वय साधून शरीराची उष्णताही राखते आणि बोटांना कुजण्यापासूनही वाचवते.',
      hi: 'कड़ाके की ठंड या बर्फ में हाथ डालने पर पहले उंगलियां सुन्न और पीली पड़ने लगती हैं। लेकिन लगभग 10 से 15 मिनट बाद शरीर एक चमत्कारिक सुरक्षा चक्र चालू करता है जिसे "हंटिंग रिएक्शन" कहते हैं। रक्त वाहिकाएं अचानक फैल जाती हैं और गर्म रक्त उंगलियों में तेजी से दौड़ने लगता है जिससे वे लाल और गर्म हो जाती हैं। यह शरीर की एक आत्म-रक्षा प्रणाली है जो ऊतकों को जमने और सड़ने से बचाती है।',
      en: 'Discovered in 1930 by Sir Thomas Lewis, the Hunting Reaction (or cold-induced vasodilation, CIVD) is an alternating vascular cycle. When hands or feet are exposed to near-freezing temperatures, sympathetic vasoconstriction initially starves extremities of blood to conserve core thermal energy. However, after 5 to 10 minutes of cooling, localized arteriovenous anastomoses abruptly dilate, surging warm arterial blood into the fingers to prevent frostbite before constricting again.'
    },
    regionId: 'heart_blood',
    kindId: 'reflex',
    tags: ['blood', 'cold', 'vessel', 'circulation'],
    howCommon: 'very_common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'बर्फाचा खडा काही मिनिटे बोटात धरा. सुरुवातीला बोट थंड पडेल, पण नंतर ते अचानक लाल आणि उबदार झाल्याचे दिसेल.',
      hi: 'बर्फ का एक छोटा टुकड़ा कुछ मिनट उंगलियों में पकड़ें। पहले ठंडक महसूस होगी, फिर उंगली लाल और हल्की गर्म होने लगेगी।',
      en: 'Hold an ice cube in your palm for 4 minutes. Observe how the pale skin abruptly flushes deep pinkish-red as blood vessels dilate.'
    },
    isFeelsScary: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=900&q=80',
    views: 1670,
    status: 'published',
    createdAt: '2026-03-11T20:00:00.000Z',
    updatedAt: '2026-03-11T20:00:00.000Z'
  },
  {
    id: 'misophonia',
    slug: 'misophonia',
    title: {
      mr: 'खाण्याच्या किंवा श्वासाच्या आवाजाने राग येणे (मिसोफोनिया)',
      hi: 'चबाने या सांस की आवाज से तीव्र चिढ़ होना (मिसोफोनिया)',
      en: 'Misophonia: Extreme Reaction to Trigger Sounds'
    },
    summary: {
      mr: 'अन्न चावण्याचा किंवा पेन वाजवण्याचा बारीक आवाज ऐकून मनात अचानक तीव्र चीड किंवा संताप निर्माण होणे.',
      hi: 'किसी के खाना चबाने, सूप पीने या पेन टिक-टिक करने की धीमी आवाज सुनकर अचानक असहनीय गुस्सा या बेचैनी होना।',
      en: 'A condition characterized by disproportionate emotional distress provoked by specific repetitive human sounds.'
    },
    body: {
      mr: 'जेवताना शेजारी बसलेल्या व्यक्तीच्या तोंडाचा "चप-चप" आवाज किंवा कोणाच्या जोराने श्वास घेण्याचा आवाज ऐकून तुम्हाला असह्य चिडचिड होते का? विज्ञानात याला "मिसोफोनिया" (Misophonia) म्हणतात, ज्याचा अर्थ आवाजाची तीव्र नापसंती असा होतो. हे कानाचे आजारपण नसून मेंदूच्या ऐकण्याच्या आणि भावना नियंत्रित करणाऱ्या भागांमधील अतिसंवेदनशील संबंध असतो. मेंदू या क्षुल्लक आवाजांना धोक्याचा इशारा समजून तात्काळ "फाईट ऑर फ्लाईट" (Fight or Flight) प्रतिसाद देतो. सुमारे १५ ते २० टक्के लोकांमध्ये हा स्वभावदोष नसून नैसर्गिक न्यूरोलॉजिकल पैलू असतो.',
      hi: 'क्या किसी के चिप्स चबाने, चम्मच की खटखट या सांस लेने की आवाज सुनकर आपका गुस्सा सातवें आसमान पर पहुंच जाता है? इसे मिसोफोनिया कहा जाता है। यह कोई बदतमीजी या नखरा नहीं है, बल्कि मस्तिष्क के श्रवण और भावनात्मक केंद्रों का एक सीधा जुड़ाव है। दिमाग इन सामान्य आवाजों को आक्रामक समझकर तुरंत गुस्सा और तनाव का हार्मोन रिलीज कर देता है।',
      en: 'Misophonia is a neuro-behavioral syndrome where specific ordinary acoustic patterns — most commonly mouth sounds such as chewing, lip-smacking, swallowing, or repetitive tapping — provoke involuntary irritation, distress, or rage. Neuroimaging shows that in people with misophonia, trigger sounds evoke hyper-connectivity between the auditory cortex and the anterior insular cortex (part of the salience network that regulates emotions and visceral arousal).'
    },
    regionId: 'brain',
    kindId: 'perception',
    tags: ['brain', 'sound', 'misophonia', 'nerves'],
    howCommon: 'uncommon',
    isTryIt: false,
    isFeelsScary: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
    views: 4590,
    status: 'published',
    createdAt: '2026-03-12T21:00:00.000Z',
    updatedAt: '2026-03-12T21:00:00.000Z'
  },
  {
    id: 'geographic-tongue',
    slug: 'geographic-tongue',
    title: {
      mr: 'जिभेवरील बदलणारे नकाशे (जिओग्राफिक टंग)',
      hi: 'जीभ पर बदलते नक्शे जैसे चकत्ते (जिओग्राफिक जीभ)',
      en: 'Geographic Tongue (Benign Migratory Glossitis)'
    },
    summary: {
      mr: 'जिभेवर गुळगुळीत लाल चट्टे तयार होणे, जे काही दिवसांत जागा बदलून नकाशासारखा आकार घेतात.',
      hi: 'जीभ पर लाल और सफेद किनारों वाले धब्बे जो समय के साथ अपनी जगह और आकार बदलते रहते हैं।',
      en: 'A harmless inflammatory condition where map-like smooth red patches shift positions across the tongue.'
    },
    body: {
      mr: 'अनेक लोकांना आरशात जीभ पाहिल्यावर त्यावर पांढऱ्या सीमारेषा असलेले लाल गुळगुळीत चट्टे दिसतात आणि कर्करोग किंवा संसर्ग झाला की काय अशी भीती वाटते. प्रत्यक्षात याला "जिओग्राफिक टंग" (Benign Migratory Glossitis) म्हणतात. जिभेच्या पृष्ठभागावरील सूक्ष्म अंकुर (Papillae) काही भागांत गळतात आणि पुन्हा नव्याने उगवतात. यामुळे जुना चट्टा भरून येतो आणि दुसऱ्या ठिकाणी नवीन चट्टा तयार होतो. हा पूर्णपणे निरुपद्रवी प्रकार असून लोकसंख्येच्या २ ते ३ टक्क्यांमध्ये आढळतो.',
      hi: 'कई बार सुबह ब्रश करते समय जीभ पर नक्शे जैसी आकृतियां दिखती हैं। इसे जिओग्राफिक टंग कहते हैं। जीभ के सूक्ष्म स्वाद कणों का कुछ हिस्सों में अस्थायी रूप से झड़ना और फिर दोबारा उगना इसका कारण होता है। यह एक जगह से गायब होकर दूसरी जगह बन जाते हैं, इसीलिए इसे "माइग्रेटरी" कहा जाता है। इसमें घबराने की कोई बात नहीं होती क्योंकि यह पूरी तरह से सौम्य और हानिरहित स्थिति है।',
      en: 'Benign migratory glossitis, popularly known as geographic tongue, manifests as smooth, erythematous patches on the dorsal surface of the tongue demarcated by slightly elevated grayish-white borders. The appearance resembles islands on an atlas. The condition occurs when the filiform papillae in localized zones are temporarily shed and subsequently regenerate. As patches heal in one area and appear in another, the pattern "migrates" over weeks. It is benign, non-contagious, and causes no loss of taste.'
    },
    regionId: 'mouth_throat',
    kindId: 'variation',
    tags: ['tongue', 'mouth', 'variation', 'map'],
    howCommon: 'rare',
    isTryIt: true,
    tryItInstructions: {
      mr: 'आरशात जीभ बाहेर काढून तिचे निरीक्षण करा. तिच्यावर हलके लाल-गुळगुळीत नकाशासारखे भाग दिसतात का ते तपासा.',
      hi: 'आईने के सामने जीभ पूरी बाहर निकालें और सतह को ध्यान से देखें। क्या आपको चिकने लाल हिस्से दिखाई दे रहे हैं?',
      en: 'Stick your tongue out in front of a bright mirror. Inspect the pink papillae to see if any smooth island-like patterns are visible.'
    },
    isFeelsScary: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=900&q=80',
    views: 2240,
    status: 'published',
    createdAt: '2026-03-13T22:00:00.000Z',
    updatedAt: '2026-03-13T22:00:00.000Z'
  },
  {
    id: 'tendon-snapping',
    slug: 'tendon-snapping',
    title: {
      mr: 'हात किंवा घोट्याच्या शिरांचा खटका (टेंडन स्नॅपिंग)',
      hi: 'हाथ या टखने की नस का चटकना (टेंडन स्नैपिंग)',
      en: 'Snapping Tendons: Harmless Joint Clicking'
    },
    summary: {
      mr: 'चालताना किंवा सांधा फिरवताना हाडावरून नस सरकून गिटारच्या तारेसारखा बारीक आवाज येणे.',
      hi: 'कदम बढ़ाते समय या कलाई घुमाते समय बिना किसी दर्द के नस का हड्डी के ऊपर से फिसलना और चटकना।',
      en: 'The harmless acoustic snap when a tendon slides rapidly over an underlying bony prominence.'
    },
    body: {
      mr: 'पायाचा घोटा गोल फिरवताना किंवा मान वळवताना बऱ्याचदा "कट" असा आवाज येतो. अनेकांना वाटते हाड तुटले किंवा सांधा खराब झाला. परंतु बहुतांश वेळा हे सांध्याचे हाड नसून त्यावर असलेली कंडरा (Tendon) असते. स्नायूंना हाडाशी जोडणाऱ्या या दोऱ्यांसारख्या कंडरा हाडाच्या उंचवट्यावरून अचानक घसरतात, जसे गिटारची ताणलेली तार सोडल्यावर आवाज येतो. जोपर्यंत यात कोणतीही सूज किंवा दुखणे नसते, तोपर्यंत हा आवाज पूर्णपणे सामान्य आणि निरुपद्रवी असतो.',
      hi: 'जब हम अपने टखने या कलाई को घुमाते हैं, तो अक्सर एक तेज "कट" की आवाज सुनाई देती है। वास्तव में यह आवाज हड्डियों के टकराने से नहीं, बल्कि टेंडन (मांसपेशी को हड्डी से जोड़ने वाली डोरियों) के किसी उभरी हड्डी पर से अचानक फिसलने से होती है। जब तक इसमें कोई दर्द या अकड़न न हो, यह पूरी तरह से हानिरहित है।',
      en: 'Tendon snapping occurs when a tendon quickly shifts position and glides over a bony projection during movement, snapping against the periosteum much like a plucked guitar string. Common sites include the ankle (peroneal tendons), wrist, and hip (iliopsoas or iliotibial band). In the absence of traumatic injury, pain, or inflammation, isolated tendon clicking is a routine consequence of normal joint excursion.'
    },
    regionId: 'bones_joints',
    kindId: 'sound',
    tags: ['tendon', 'joint', 'sound', 'bones'],
    howCommon: 'common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'आपला पाय हवेत उंच करून घोटा हळूच वर्तुळाकार फिरवा. तुम्हाला मंद खटका जाणवतो का ते पाहा.',
      hi: 'अपने पैर को ऊपर उठाएं और टखने को गोल-गोल घुमाएं। क्या आपको कोई हल्की चटकन महसूस हुई?',
      en: 'Lift your foot and slowly rotate your ankle in a full circle. Notice if a quiet elastic snap occurs at a certain angle.'
    },
    isFeelsScary: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    views: 2110,
    status: 'published',
    createdAt: '2026-03-14T23:00:00.000Z',
    updatedAt: '2026-03-14T23:00:00.000Z'
  },
  {
    id: 'stomach-growling',
    slug: 'stomach-growling',
    title: {
      mr: 'पोटात गुडगुडणे (बॉरबोरिग्मी)',
      hi: 'पेट में होने वाली गुड़गुड़ाहट (बोरबोरिग्मी)',
      en: 'Stomach Growling: The Migrating Motor Complex'
    },
    summary: {
      mr: 'भूक लागल्यावर किंवा रिकाम्या पोटी आतड्यांच्या आकुंचनामुळे पाचक रसांचा होणारा पोकळ आवाज.',
      hi: 'खाली पेट आंतों की मांसपेशियों के संकुचन से उत्पन्न होने वाली गूंजती हुई ध्वनियां।',
      en: 'The rumbling sound produced by gas and fluids propelled through intestines during cleansing cycles.'
    },
    body: {
      mr: 'शांत बैठकीत किंवा परीक्षेच्या हॉलमध्ये पोटातून अचानक मोठा "गुड-गुड" आवाज आल्यास लाजिरवाणे वाटते. या आवाजाला वैज्ञानिक भाषेत "बॉरबोरिग्मी" (Borborygmi) म्हणतात. पोट रिकामे झाल्यावर सुमारे २ तासांनी पचनसंस्थेत "मायग्रेटिंग मोटर कॉम्प्लेक्स" नावाची सफाई मोहीम सुरू होते. जठर आणि लहान आतड्यांच्या भिंती एका लयीत आकुंचन पावतात, ज्यामुळे आत राहिलेले अन्नकण, पाचक रस आणि हवेचे बुडबुडे पुढे ढकलले जातात. रिकाम्या पोटी पोकळी निर्माण झाल्यामुळे हा आवाज जास्त प्रतिध्वनित होतो. हे पचनसंस्था निरोगी असण्याचे लक्षण आहे.',
      hi: 'अक्सर जब भूख लगती है, तो पेट से अजीब सी "गुड़-गुड़" आवाज आने लगती है। इस ध्वनि को मेडिकल भाषा में बोरबोरिग्मी कहते हैं। जब पेट खाली होता है, तो आंतें एक सफाई चक्र चलाती हैं जिसे "माइग्रेटिंग मोटर कॉम्प्लेक्स" कहा जाता है। खाली पेट की गुहा एक लाउडस्पीकर की तरह काम करती है, जिससे पाचक द्रवों और गैसों के आगे बढ़ने की आवाज बाहर तक गूंजती है। यह स्वस्थ पाचन क्रिया का प्रमाण है।',
      en: 'Scientifically termed borborygmi, stomach rumbling is the acoustic result of peristaltic muscular contractions churning fluid and gas through the gastrointestinal tract. While it occurs continuously during digestion, it becomes dramatically louder when the stomach is empty. Roughly 90 to 120 minutes after fasting, the enteric nervous system initiates the Migrating Motor Complex (MMC) — a rhythmic housekeeping wave designed to sweep residual debris and bacteria into the colon.'
    },
    regionId: 'internal_organs',
    kindId: 'sound',
    tags: ['stomach', 'gut', 'sound', 'digestion'],
    howCommon: 'very_common',
    isTryIt: true,
    tryItInstructions: {
      mr: 'जेवणापूर्वी रिकाम्या पोटी पोटावर हात ठेवून शांत बसा आणि आतड्यांच्या लहरींचे निरीक्षण करा.',
      hi: 'खाली पेट अपनी हथेली को नाभि के पास रखें और गहरी सांस लें। क्या आपको अंदर कंपन महसूस हुआ?',
      en: 'Rest a warm palm gently over your abdomen two hours after eating and listen closely for internal digestive waves.'
    },
    isFeelsScary: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80',
    views: 3190,
    status: 'published',
    createdAt: '2026-03-15T09:00:00.000Z',
    updatedAt: '2026-03-15T09:00:00.000Z'
  }
];

export const SEED_PAGES: StaticPage[] = [
  {
    id: 'about',
    slug: 'about',
    title: { mr: 'आमच्याबद्दल', hi: 'हमारे बारे में', en: 'About DC-Body' },
    content: {
      mr: 'DC-Body हा मानवी शरीराच्या नैसर्गिक, आश्चर्यकारक पण निरुपद्रवी प्रतिक्षिप्त क्रिया, आवाज, भ्रम आणि विविधता यांचा एक विश्वासार्ह मराठी ज्ञानकोश आहे. आमचा उद्देश लोकांच्या मनातील अकारण भीती दूर करणे आणि मानवी शरीराचे आश्चर्यकारक विज्ञान सोप्या भाषेत पोहोचवणे हा आहे. \n\nसंचालक: D COMPANY\nसंपर्क: +91 9607636444 | dcompany1410@gmail.com',
      hi: 'DC-Body मानव शरीर के प्राकृतिक, विचित्र लेकिन पूरी तरह सुरक्षित लक्षणों, ध्वनियों, भ्रमों और विविधताओं का एक समर्पित हिंदी और बहुभाषी ज्ञानकोश है। हमारा लक्ष्य वैज्ञानिक तथ्यों के माध्यम से अकारण चिंताओं को शांत करना है।\n\nसंचालक: D COMPANY\nसंपर्क: +91 9607636444 | dcompany1410@gmail.com',
      en: 'DC-Body is a trustworthy, friendly encyclopedia dedicated to strange but completely normal human body phenomena — involuntary twitches, phantom sensations, acoustic rumbles, and harmless anatomical variations.\n\nOperated by: D COMPANY\nContact: +91 9607636444 | dcompany1410@gmail.com'
    },
    updatedAt: '2026-03-15T10:00:00.000Z'
  },
  {
    id: 'disclaimer',
    slug: 'disclaimer',
    title: { mr: 'वैद्यकीय अस्वीकरण (Disclaimer)', hi: 'चिकित्सीय अस्वीकरण (Disclaimer)', en: 'Medical Disclaimer' },
    content: {
      mr: 'वैद्यकीय सल्ला नाही. DC-Body वर उपलब्ध असलेली सर्व माहिती ही केवळ सामान्य शैक्षणिक आणि माहितीपूर्ण उद्देशांसाठी आहे. ही माहिती कोणत्याही वैद्यकीय सल्ल्याचा पर्याय नाही. DC-Body कोणत्याही रोगाचे निदान किंवा उपचार करत नाही. आपल्या शरीरात वेदना, चक्कर, तीव्र त्रास किंवा चिंता वाटत असल्यास नेहमी पात्र डॉक्टरांचा किंवा वैद्यकीय तज्ज्ञांचा सल्ला घ्यावा.',
      hi: 'चिकित्सीय सलाह नहीं। DC-Body पर उपलब्ध समस्त सामग्री केवल शैक्षिक एवं सूचनात्मक उद्देश्यों के लिए तैयार की गई है। यह किसी भी प्रकार की चिकित्सीय सलाह, निदान या उपचार का विकल्प नहीं है। यदि आपको अपने स्वास्थ्य या किसी लक्षण को लेकर कोई चिंता है, तो तुरंत किसी योग्य चिकित्सक से संपर्क करें।',
      en: 'Not medical advice. DC-Body describes what human bodies do. It does not diagnose anything. All content provided is strictly for educational, scientific, and informational purposes. If something worries you, causes persistent pain, or impairs your daily life, please consult a qualified medical professional.'
    },
    updatedAt: '2026-03-15T10:00:00.000Z'
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: { mr: 'गोपनीयता धोरण (Privacy Policy)', hi: 'गोपनीयता नीति (Privacy Policy)', en: 'Privacy Policy' },
    content: {
      mr: 'D COMPANY संचालित DC-Body आपल्या गोपनीयतेचा आदर करते. आम्ही आपल्या परवानगीशिवाय कोणतीही वैयक्तिक माहिती विकत नाही किंवा त्रयस्थांना देत नाही. वृत्तपत्रासाठी घेतलेला ईमेल केवळ नवीन नोंदी कळवण्यासाठी वापरला जातो. वेबसाइटच्या चांगल्या अनुभवासाठी आणि जाहिरातींसाठी मानक कुकीज वापरल्या जातात.',
      hi: 'D COMPANY द्वारा संचालित DC-Body आपके व्यक्तिगत डेटा की गोपनीयता का पूरा सम्मान करता है। हम आपके ईमेल या संदेशों को सुरक्षित रखते हैं और किसी तीसरे पक्ष के साथ साझा नहीं करते। वेबसाइट के बेहतर संचालन और प्रासंगिक विज्ञापनों हेतु कुकीज का प्रयोग किया जाता है।',
      en: 'DC-Body, operated by D COMPANY, respects your personal privacy. In accordance with Indian DPDP and global data guidelines, subscriber emails and form submissions are stored securely and never sold to third parties. Standard cookies are utilized for analytics and advertisement placement.'
    },
    updatedAt: '2026-03-15T10:00:00.000Z'
  },
  {
    id: 'terms',
    slug: 'terms',
    title: { mr: 'नियम व अटी (Terms & Conditions)', hi: 'नियम और शर्तें (Terms)', en: 'Terms of Use' },
    content: {
      mr: 'DC-Body चा वापर करून आपण या अटी मान्य करता. या संकेतस्थळावरील सामग्री शैक्षणिक कारणांसाठी विनामूल्य वाचण्यासाठी उपलब्ध आहे. कोणतीही माहिती अनधिकृतपणे व्यावसायिक हेतूंसाठी वापरता येणार नाही.',
      hi: 'DC-Body का उपयोग करते हुए आप हमारी उपयोग की शर्तों से सहमत होते हैं। इस वेबसाइट की सभी सामग्री ज्ञानवर्धन के लिए है। किसी भी अनधिकृत व्यावसायिक प्रतिलिपि की अनुमति नहीं है।',
      en: 'By accessing DC-Body, you agree to these terms. Content is provided as an open encyclopedia. No part of this text may be repurposed for commercial malpractice or misleading medical advice.'
    },
    updatedAt: '2026-03-15T10:00:00.000Z'
  }
];

export const SEED_BLOG: BlogPost[] = [
  {
    id: 'why-sleep-starts-happen',
    slug: 'why-sleep-starts-happen',
    title: {
      mr: 'झोप लागताना शरीराला धक्का का बसतो? विज्ञानाचे उत्तर',
      hi: 'सोने की दहलीज पर शरीर को झटका क्यों लगता है? जानिए वैज्ञानिक कारण',
      en: 'Why Does Your Body Twitch Right As You Fall Asleep?'
    },
    summary: {
      mr: 'हायप्निक जर्क हे मेंदूच्या झोपेच्या आणि जागृतीच्या नियंत्रणातील एका क्षणाच्या समन्वयाचे थक्क करणारे परिणाम आहे.',
      hi: 'हिप्निक जर्क: जब सोने और जागने के बीच दिमाग संतुलन को बचाते हुए अचानक मांसपेशी को सक्रिय करता है।',
      en: 'A fascinating neurological dive into sleep starts, canopy survival instincts, and the reticular activating system.'
    },
    body: {
      mr: 'दिवसभराच्या कामाच्या धावपळीनंतर बिछान्यावर पडताच जेव्हा डोळा लागतो, तेव्हा अचानक अख्खे शरीर दचकून जागे होते. अनेकजण याला वाईट स्वप्न किंवा भुताटकी समजतात! परंतु न्यूरोसायन्सनुसार, जेव्हा मेंदूच्या चेतापेशी स्नायूंना शिथिल करतात, तेव्हा संतुलन सांभाळणारा भाग या अचानक शिथिलतेला "खाली पडणे" समजून ताबडतोब धोक्याची घंटा वाजवतो. हा लेख या रंजक प्रक्रियेची सविस्तर उकल करतो.',
      hi: 'अक्सर जब हम दिनभर की थकान के बाद बिस्तर पर लेटते हैं और धीरे-धीरे नींद की आगोश में जा रहे होते हैं, तभी अचानक पूरा शरीर हिल जाता है और आंखें खुल जाती हैं। यह कोई भूतिया अनुभव नहीं बल्कि हमारे मस्तिष्क का एक प्राचीन रिफ्लेक्स है। वैज्ञानिक इसे हाइपनिक जर्क कहते हैं, जो हमारे पूर्वजों के पेड़ों से गिरने से बचने के विकासवादी इतिहास से जुड़ा हो सकता है।',
      en: 'As you transition from the alpha waves of quiet relaxation into the theta waves of early non-REM sleep, the motor system undergoes muscle atonia. In roughly 70% of occurrences, the evolutionary fight-or-flight circuits misinterpret this rapid collapse of muscle resistance as losing balance in high canopies. The resulting sudden myoclonic twitch is completely harmless.'
    },
    author: 'D COMPANY Science Editorial',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
    status: 'published',
    views: 890,
    createdAt: '2026-03-10T10:00:00.000Z',
    updatedAt: '2026-03-10T10:00:00.000Z'
  },
  {
    id: 'secrets-of-human-body-sounds',
    slug: 'secrets-of-human-body-sounds',
    title: {
      mr: 'आपल्या शरीरातून येणारे निरुपद्रवी ५ अजब आवाज आणि त्यांचे कारण',
      hi: 'शरीर से आने वाली 5 अजीबोगरीब ध्वनियां और उनका रहस्य',
      en: '5 Curious Sounds Your Body Makes and Why They Are Harmless'
    },
    summary: {
      mr: 'कानातली घरघर, बोटे मोडतानाचा आवाज ते पोटातील गुडगुड — जाणून घ्या या आवाजांमागील अचूक विज्ञान.',
      hi: 'कानों की गड़गड़ाहट, उंगलियों का चटकना और आंतों की आवाज — समझिए इनका वास्तविक विज्ञान।',
      en: 'An overview of the physics and biological mechanisms behind joint cracking, borborygmi, and ear roaring.'
    },
    body: {
      mr: 'मानवी शरीर हे एखाद्या जिवंत वाद्यवृंदासारखे आहे. आपल्या शरीरात सतत द्रवपदार्थ, वायू आणि स्नायूंची हालचाल चालू असते. या लेखात आपण कानातील टेन्सर टिम्पॅनी स्नायू, सांध्यांमधील नायट्रोजनचे बुडबुडे फुटणे आणि पोटातील पचन लहरी यांसारख्या निरुपद्रवी आवाजांचा वेध घेतला आहे.',
      hi: 'हमारा शरीर लगातार ध्वनियां उत्पन्न करता रहता है। उंगलियां चटकाने पर जोड़ के तरल पदार्थ में नाइट्रोजन के बुलबुले फूटते हैं, जबकि पेट में खाली आंतों की लहरें गड़गड़ाहट करती हैं। ये ध्वनियां किसी भी गंभीर बीमारी का संकेत नहीं होतीं बल्कि शरीर के सामान्य कार्यकलाप का हिस्सा हैं।',
      en: 'From the cavitation of nitrogen micro-bubbles in synovial fluid during joint cracking to the hollow resonance of the migrating motor complex, our internal acoustics are often alarming yet thoroughly physiological. Here is a calm breakdown of the top 5 sounds humans produce.'
    },
    author: 'Dr. A. Deshmukh (Advisor)',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    status: 'published',
    views: 1250,
    createdAt: '2026-03-12T10:00:00.000Z',
    updatedAt: '2026-03-12T10:00:00.000Z'
  }
];

export const SEED_SITE_SETTINGS: SiteSettings = {
  siteName: 'DC-Body',
  companyName: 'D COMPANY',
  contactPhone: '+91 9607636444',
  contactEmail: 'dcompany1410@gmail.com',
  socialLinks: {
    whatsapp: 'https://wa.me/919607636444?text=Hello%20D%20COMPANY%20DC-Body',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com'
  },
  disclaimerNotice: {
    mr: 'वैद्यकीय सल्ला नाही. DC-Body मानवी शरीर काय करते याचे वर्णन करते. ते कोणत्याही रोगाचे निदान करत नाही. काही चिंता वाटल्यास कृपया डॉक्टरांचा सल्ला घ्या.',
    hi: 'चिकित्सीय सलाह नहीं। DC-Body केवल यह बताता है कि मानव शरीर क्या करता है, यह किसी भी बीमारी का निदान नहीं करता। यदि आपको कोई चिंता है, तो कृपया डॉक्टर से संपर्क करें।',
    en: 'Not medical advice. DC-Body describes what human bodies do. It does not diagnose anything. If something worries you, see a doctor.'
  },
  maintenanceMode: false,
  googleAnalyticsId: ''
};

export const SEED_ADS_CONFIG: AdsConfig = {
  adsensePublisherId: 'ca-pub-9607636444000000',
  customHeaderScript: '',
  customFooterScript: '',
  adsTxt: 'google.com, pub-9607636444000000, DIRECT, f08c47fec0942fa0',
  inFeedInterval: 3,
  slots: {
    header_banner: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Interested%20in%20Header%20Banner%20Ad',
      sponsorAltText: 'D COMPANY Verified Health & Wellness - Partner With Us',
      sponsorTargetLanguage: 'all',
      impressions: 1240,
      clicks: 86
    },
    below_hero: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Advertise%20on%20DC-Body%20Below%20Hero',
      sponsorAltText: 'D COMPANY Advertising Showcase - Tap to Advertise',
      sponsorTargetLanguage: 'all',
      impressions: 2180,
      clicks: 142
    },
    in_feed: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=In-Feed%20Sponsorship%20Inquiry',
      sponsorAltText: 'Featured Sponsor - D COMPANY Health Solutions',
      sponsorTargetLanguage: 'all',
      impressions: 1530,
      clicks: 94
    },
    sidebar: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Sidebar%20Sponsorship',
      sponsorAltText: 'D COMPANY Health & Biology Books - Available Now',
      sponsorTargetLanguage: 'all',
      impressions: 980,
      clicks: 65
    },
    inside_entry: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Inside%20Entry%20Ad',
      sponsorAltText: 'Promote Your Clinic or Brand with DC-Body',
      sponsorTargetLanguage: 'all',
      impressions: 1820,
      clicks: 110
    },
    end_of_entry: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=End%20of%20Entry%20Sponsor',
      sponsorAltText: 'D COMPANY Sponsor Showcase',
      sponsorTargetLanguage: 'all',
      impressions: 1120,
      clicks: 72
    },
    footer: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Footer%20Banner%20Ad',
      sponsorAltText: 'D COMPANY Official Partner',
      sponsorTargetLanguage: 'all',
      impressions: 890,
      clicks: 45
    },
    mobile_sticky: {
      enabled: true,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Mobile%20Sticky%20Banner',
      sponsorAltText: 'D COMPANY Mobile Sponsor',
      sponsorTargetLanguage: 'all',
      impressions: 3410,
      clicks: 220
    },
    interstitial: {
      enabled: false,
      type: 'sponsor',
      sponsorImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      sponsorLinkUrl: 'https://wa.me/919607636444?text=Interstitial%20Ad',
      sponsorAltText: 'D COMPANY Special Partner Offer',
      sponsorTargetLanguage: 'all',
      impressions: 210,
      clicks: 18
    }
  }
};

export const SEED_AFFILIATES: AffiliateBlock[] = [
  {
    id: 'blue-light-glasses',
    title: {
      mr: 'स्क्रीन ताण आणि डोळा लवणे कमी करणारे ब्ल्यू-कट चष्मे',
      hi: 'आंख फड़कने और स्क्रीन तनाव को कम करने वाले चश्मे',
      en: 'Blue Light Blocking Glasses for Eyelid Twitch Relief'
    },
    description: {
      mr: 'संगणक व मोबाईलच्या स्क्रीनमुळे डोळ्यांचा होणारा थकवा कमी करा.',
      hi: 'कंप्यूटर और मोबाइल स्क्रीन के तनाव से राहत दिलाए।',
      en: 'Protect ocular muscles and reduce screen-induced eye strain.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80',
    targetUrl: 'https://wa.me/919607636444?text=Inquiry%20about%20Recommended%20Glasses',
    buttonText: { mr: 'तपशील पहा', hi: 'विवरण देखें', en: 'View Details' },
    placement: 'sidebar',
    enabled: true,
    clicks: 42
  },
  {
    id: 'ergonomic-pillow',
    title: {
      mr: 'गाढ झोप आणि हायप्निक जर्क कमी करणारी एर्गोनॉमिक उशी',
      hi: 'गहरी नींद और गर्दन के आराम के लिए मेमोरी फोम तकिया',
      en: 'Contour Cervical Memory Foam Sleep Pillow'
    },
    description: {
      mr: 'मानेला आणि मणक्याला योग्य आधार देऊन गाढ शांत झोप मिळवा.',
      hi: 'रीढ़ और गर्दन को सही सहारा देकर शांत और गहरी नींद प्रदान करे।',
      en: 'Optimal spinal alignment to ease sleep onset and reduce sleep starts.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
    targetUrl: 'https://wa.me/919607636444?text=Inquiry%20about%20Sleep%20Pillow',
    buttonText: { mr: 'अधिक माहिती', hi: 'और जानें', en: 'Learn More' },
    placement: 'inside_entry',
    enabled: true,
    clicks: 68
  }
];
