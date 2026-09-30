export type SupportedLanguage = 
  | 'en' // English
  | 'ta' // Tamil (தமிழ்)
  | 'hi' // Hindi (हिन्दी)
  | 'te' // Telugu (తెలుగు)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'ml' // Malayalam (മലയാളം)
  | 'bn' // Bengali (বাংলা)
  | 'mr' // Marathi (मराठी)
  | 'gu' // Gujarati (ગુજરાતી)
  | 'pa'; // Punjabi (ਪੰਜਾਬੀ)

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
];

export interface AuthTranslations {
  badge: string;
  title: string;
  selectLanguage: string;
  tabUser: string;
  tabAdmin: string;
  tabPasswordAlone?: string;
  btnGoogleLogin?: string;
  googleLoginSubtitle?: string;
  labelPasswordAlone?: string;
  placeholderPasswordAlone?: string;
  btnPasswordAloneSubmit?: string;
  passwordAloneHelp?: string;
  welcomeBackUser?: string;
  switchAccount?: string;
  // User Form
  labelName: string;
  placeholderName: string;
  labelPhone: string;
  placeholderPhone: string;
  labelAddress: string;
  placeholderAddress: string;
  btnUserSubmit: string;
  userAlertRequired: string;
  // Admin Form
  adminCredentialsTitle: string;
  adminCredentialsList: string;
  adminPasswordInfo: string;
  labelAdminEmail: string;
  placeholderAdminEmail: string;
  quickSelectAdmin: string;
  labelAdminPassword: string;
  placeholderAdminPassword: string;
  btnAutoFill: string;
  btnAdminSubmit: string;
  errorInvalidEmail: string;
  errorInvalidPassword: string;
}

export const AUTH_TRANSLATIONS: Record<SupportedLanguage, AuthTranslations> = {
  en: {
    badge: 'Eden Sync Authentication',
    title: 'Access Portal',
    selectLanguage: 'Language / மொழி',
    tabUser: 'Landowner / User',
    tabAdmin: 'Admin Portal',
    tabPasswordAlone: 'Password Alone',
    btnGoogleLogin: 'Continue with Google',
    googleLoginSubtitle: '1-Click Instant Sign In',
    labelPasswordAlone: 'Enter Password Alone',
    placeholderPasswordAlone: 'Enter your password (e.g. eden123)',
    btnPasswordAloneSubmit: 'Sign In with Password Alone',
    passwordAloneHelp: 'Returning user? Type your password alone to access without refilling forms.',
    welcomeBackUser: 'Welcome back',
    switchAccount: 'Switch account or sign up',
    labelName: 'Your Full Name',
    placeholderName: 'e.g. Ramesh Patel',
    labelPhone: 'Phone Number',
    placeholderPhone: 'e.g. +91 98765 43210',
    labelAddress: 'Address (Optional)',
    placeholderAddress: 'District, Village or Town',
    btnUserSubmit: 'Continue to Landowner Portal',
    userAlertRequired: 'Please fill in your name and phone number',
    adminCredentialsTitle: 'Authorized Admin Credentials',
    adminCredentialsList: 'Admins: edensync01@gmail.com to edensync10@gmail.com',
    adminPasswordInfo: 'Password: EDEN@#sync',
    labelAdminEmail: 'Admin Email / ID',
    placeholderAdminEmail: 'e.g. edensync01@gmail.com',
    quickSelectAdmin: 'Quick Select Admin Account:',
    labelAdminPassword: 'Admin Password',
    placeholderAdminPassword: 'Enter EDEN@#sync',
    btnAutoFill: 'Auto-Fill Demo',
    btnAdminSubmit: 'Verify & Access Admin',
    errorInvalidEmail: 'Invalid Admin ID. Allowed IDs are edensync01@gmail.com through edensync10@gmail.com',
    errorInvalidPassword: 'Invalid Admin Password. Please enter the correct master password (EDEN@#sync).',
  },
  ta: {
    badge: 'ஈடன் சிங்க் அங்கீகாரம்',
    title: 'நுழைவு போர்டல்',
    selectLanguage: 'மொழி / Language',
    tabUser: 'நில உரிமையாளர் / பயனர்',
    tabAdmin: 'நிர்வாகி போர்டல் (Admin)',
    labelName: 'உங்கள் முழுப் பெயர்',
    placeholderName: 'எ.கா. பாலசுப்பிரமணியன்',
    labelPhone: 'தொலைபேசி எண்',
    placeholderPhone: 'எ.கா. +91 98421 77340',
    labelAddress: 'முகவரி (விருப்பத்தேர்வு)',
    placeholderAddress: 'மாவட்டம், கிராமம் அல்லது ஊர்',
    btnUserSubmit: 'நில உரிமையாளர் போர்ட்டலுக்குச் செல்க',
    userAlertRequired: 'உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்',
    adminCredentialsTitle: 'அங்கீகரிக்கப்பட்ட நிர்வாகி விவரங்கள்',
    adminCredentialsList: 'நிர்வாகிகள்: edensync01@gmail.com முதல் edensync10@gmail.com வரை',
    adminPasswordInfo: 'கடவுச்சொல்: EDEN@#sync',
    labelAdminEmail: 'நிர்வாகி மின்னஞ்சல் / ஐடி',
    placeholderAdminEmail: 'எ.கா. edensync01@gmail.com',
    quickSelectAdmin: 'நிர்வாகி கணக்கைத் தேர்ந்தெடுக்கவும்:',
    labelAdminPassword: 'நிர்வாகி கடவுச்சொல்',
    placeholderAdminPassword: 'EDEN@#sync என உள்ளிடவும்',
    btnAutoFill: 'மாதிரி நிரப்பல் (Demo)',
    btnAdminSubmit: 'சரிபார்த்து நிர்வாகியை அணுகவும்',
    errorInvalidEmail: 'தவறான நிர்வாகி ஐடி. edensync01@gmail.com முதல் edensync10@gmail.com வரை மட்டுமே அனுமதிக்கப்படுகிறது',
    errorInvalidPassword: 'தவறான கடவுச்சொல்! சரியான முதன்மை கடவுச்சொல்லை (EDEN@#sync) உள்ளிடவும்.',
  },
  hi: {
    badge: 'ईडन सिंक प्रमाणीकरण',
    title: 'एक्सेस पोर्टल',
    selectLanguage: 'भाषा / Language',
    tabUser: 'भूमि मालिक / उपयोगकर्ता',
    tabAdmin: 'व्यवस्थापक पोर्टल (Admin)',
    labelName: 'आपका पूरा नाम',
    placeholderName: 'उदा. रमेश पटेल',
    labelPhone: 'फ़ोन नंबर',
    placeholderPhone: 'उदा. +91 98765 43210',
    labelAddress: 'पता (वैकल्पिक)',
    placeholderAddress: 'ज़िला, गाँव या शहर',
    btnUserSubmit: 'भूमि मालिक पोर्टल पर आगे बढ़ें',
    userAlertRequired: 'कृपया अपना नाम और फ़ोन नंबर दर्ज करें',
    adminCredentialsTitle: 'अधिकृत व्यवस्थापक क्रेडेंशियल्स',
    adminCredentialsList: 'व्यवस्थापक: edensync01@gmail.com से edensync10@gmail.com',
    adminPasswordInfo: 'पासवर्ड: EDEN@#sync',
    labelAdminEmail: 'व्यवस्थापक ईमेल / आईडी',
    placeholderAdminEmail: 'उदा. edensync01@gmail.com',
    quickSelectAdmin: 'व्यवस्थापक खाता तुरंत चुनें:',
    labelAdminPassword: 'व्यवस्थापक पासवर्ड',
    placeholderAdminPassword: 'EDEN@#sync दर्ज करें',
    btnAutoFill: 'ऑटो-फिल डेमो',
    btnAdminSubmit: 'सत्यापित करें और व्यवस्थापक खोलें',
    errorInvalidEmail: 'अमान्य व्यवस्थापक आईडी। केवल edensync01@gmail.com से edensync10@gmail.com मान्य हैं।',
    errorInvalidPassword: 'अमान्य पासवर्ड! कृपया सही मास्टर पासवर्ड (EDEN@#sync) दर्ज करें।',
  },
  te: {
    badge: 'ఈడెన్ సింక్ ధృవీకరణ',
    title: 'యాక్సెస్ పోర్టల్',
    selectLanguage: 'భాష / Language',
    tabUser: 'భూ యజమాని / వినియోగదారుడు',
    tabAdmin: 'అడ్మిన్ పోర్టల్ (Admin)',
    labelName: 'మీ పూర్తి పేరు',
    placeholderName: 'ఉదా. రమేష్ పటేల్',
    labelPhone: 'ఫోన్ నంబర్',
    placeholderPhone: 'ఉదా. +91 98765 43210',
    labelAddress: 'చిరునామా (ఐచ్ఛికం)',
    placeholderAddress: 'జిల్లా, గ్రామం లేదా పట్టణం',
    btnUserSubmit: 'భూ యజమాని పోర్టల్‌కు కొనసాగండి',
    userAlertRequired: 'దయచేసి మీ పేరు మరియు ఫోన్ నంబర్‌ను నమోదు చేయండి',
    adminCredentialsTitle: 'అధికారిక అడ్మిన్ వివరాలు',
    adminCredentialsList: 'అడ్మిన్లు: edensync01@gmail.com నుండి edensync10@gmail.com వరకు',
    adminPasswordInfo: 'పాస్‌వర్డ్: EDEN@#sync',
    labelAdminEmail: 'అడ్మిన్ ఈమెయిల్ / ఐడీ',
    placeholderAdminEmail: 'ఉదా. edensync01@gmail.com',
    quickSelectAdmin: 'అడ్మిన్ ఖాతాను ఎంచుకోండి:',
    labelAdminPassword: 'అడ్మిన్ పాస్‌వర్డ్',
    placeholderAdminPassword: 'EDEN@#sync నమోదు చేయండి',
    btnAutoFill: 'ఆటో-ఫిల్ డెమో',
    btnAdminSubmit: 'ధృవీకరించి అడ్మిన్ యాక్సెస్ చేయండి',
    errorInvalidEmail: 'చెల్లని అడ్మిన్ ఐడీ. edensync01@gmail.com నుండి edensync10@gmail.com మాత్రమే అనుమతించబడతాయి.',
    errorInvalidPassword: 'తప్పు పాస్‌వర్డ్! దయచేసి సరైన పాస్‌వర్డ్ (EDEN@#sync) నమోదు చేయండి.',
  },
  kn: {
    badge: 'ಈಡನ್ ಸಿಂಕ್ ದೃಢೀಕರಣ',
    title: 'ಪ್ರವೇಶ ಪೋರ್ಟಲ್',
    selectLanguage: 'ಭಾಷೆ / Language',
    tabUser: 'ಭೂಮಾಲೀಕ / ಬಳಕೆದಾರ',
    tabAdmin: 'ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್ (Admin)',
    labelName: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು',
    placeholderName: 'ಉದಾ. ನಾಗರಾಜ್ ಗೌಡ',
    labelPhone: 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
    placeholderPhone: 'ಉದಾ. +91 94480 32190',
    labelAddress: 'ವಿಳಾಸ (ಐಚ್ಛಿಕ)',
    placeholderAddress: 'ಜಿಲ್ಲೆ, ಗ್ರಾಮ ಅಥವಾ ನಗರ',
    btnUserSubmit: 'ಭೂಮಾಲೀಕರ ಪೋರ್ಟಲ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
    userAlertRequired: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    adminCredentialsTitle: 'ಅಧಿಕೃತ ಅಡ್ಮಿನ್ ರುಜುವಾತುಗಳು',
    adminCredentialsList: 'ಅಡ್ಮಿನ್‌ಗಳು: edensync01@gmail.com ರಿಂದ edensync10@gmail.com ವರೆಗೆ',
    adminPasswordInfo: 'ಪಾಸ್‌ವರ್ಡ್: EDEN@#sync',
    labelAdminEmail: 'ಅಡ್ಮಿನ್ ಇಮೇಲ್ / ಐಡಿ',
    placeholderAdminEmail: 'ಉದಾ. edensync01@gmail.com',
    quickSelectAdmin: 'ಅಡ್ಮಿನ್ ಖಾತೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    labelAdminPassword: 'ಅಡ್ಮಿನ್ ಪಾಸ್‌ವರ್ಡ್',
    placeholderAdminPassword: 'EDEN@#sync ನಮೂದಿಸಿ',
    btnAutoFill: 'ಡೆಮೊ ಭರ್ತಿ ಮಾಡಿ',
    btnAdminSubmit: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅಡ್ಮಿನ್ ಪ್ರವೇಶಿಸಿ',
    errorInvalidEmail: 'ಅಮಾನ್ಯ ಅಡ್ಮಿನ್ ಐಡಿ. edensync01@gmail.com ರಿಂದ edensync10@gmail.com ಮಾತ್ರ ಮಾನ್ಯ.',
    errorInvalidPassword: 'ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್! ದಯವಿಟ್ಟು ಸರಿಯಾದ ಪಾಸ್‌ವರ್ಡ್ (EDEN@#sync) ನಮೂದಿಸಿ.',
  },
  ml: {
    badge: 'ഈഡൻ സിങ്ക് പ്രാമാണീകരണം',
    title: 'ആക്സസ് പോർട്ടൽ',
    selectLanguage: 'ഭാഷ / Language',
    tabUser: 'ഭൂവുടമ / ഉപയോക്താവ്',
    tabAdmin: 'അഡ്മിൻ പോർട്ടൽ (Admin)',
    labelName: 'നിങ്ങളുടെ പൂർണ്ണ നാമം',
    placeholderName: 'ഉദാ. രമേഷ് പട്ടേൽ',
    labelPhone: 'ഫോൺ നമ്പർ',
    placeholderPhone: 'ഉദാ. +91 98765 43210',
    labelAddress: 'വിലാസം (ഓപ്ഷണൽ)',
    placeholderAddress: 'ജില്ല, ഗ്രാമം അല്ലെങ്കിൽ നഗരം',
    btnUserSubmit: 'ഭൂവുടമ പോർട്ടലിലേക്ക് തുടരുക',
    userAlertRequired: 'ദയവായി നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും നൽകുക',
    adminCredentialsTitle: 'അംഗീകൃത അഡ്മിൻ വിവരങ്ങൾ',
    adminCredentialsList: 'അഡ്മിന്മാർ: edensync01@gmail.com മുതൽ edensync10@gmail.com വരെ',
    adminPasswordInfo: 'പാസ്‌വേഡ്: EDEN@#sync',
    labelAdminEmail: 'അഡ്മിൻ ഇമെയിൽ / ഐഡി',
    placeholderAdminEmail: 'ഉദാ. edensync01@gmail.com',
    quickSelectAdmin: 'അഡ്മിൻ അക്കൗണ്ട് തിരഞ്ഞെടുക്കുക:',
    labelAdminPassword: 'അഡ്മിൻ പാസ്‌വേഡ്',
    placeholderAdminPassword: 'EDEN@#sync നൽകുക',
    btnAutoFill: 'ഡെമോ ഓട്ടോ ഫിൽ',
    btnAdminSubmit: 'പരിശോധിച്ച് അഡ്മിൻ ആക്സസ് ചെയ്യുക',
    errorInvalidEmail: 'അസാധുവായ അഡ്മിൻ ഐഡി. edensync01@gmail.com മുതൽ edensync10@gmail.com വരെ അനുവദനീയമാണ്.',
    errorInvalidPassword: 'തെറ്റായ പാസ്‌വേഡ്! ശരിയായ മാസ്റ്റർ പാസ്‌വേഡ് (EDEN@#sync) നൽകുക.',
  },
  bn: {
    badge: 'ইডেন সিঙ্ক প্রমাণীকরণ',
    title: 'অ্যাক্সেস পোর্টাল',
    selectLanguage: 'ভাষা / Language',
    tabUser: 'জমি মালিক / ব্যবহারকারী',
    tabAdmin: 'অ্যাডমিন পোর্টাল (Admin)',
    labelName: 'আপনার সম্পূর্ণ নাম',
    placeholderName: 'যেমন রমেশ প্যাটেল',
    labelPhone: 'ফোন নম্বর',
    placeholderPhone: 'যেমন +91 98765 43210',
    labelAddress: 'ঠিকানা (ঐচ্ছিক)',
    placeholderAddress: 'জেলা, গ্রাম বা শহর',
    btnUserSubmit: 'জমি মালিক পোর্টালে এগিয়ে যান',
    userAlertRequired: 'অনুগ্রহ করে আপনার নাম এবং ফোন নম্বর পূরণ করুন',
    adminCredentialsTitle: 'অনুমোদিত অ্যাডমিন শংসাপত্র',
    adminCredentialsList: 'অ্যাডমিন: edensync01@gmail.com থেকে edensync10@gmail.com',
    adminPasswordInfo: 'পাসওয়ার্ড: EDEN@#sync',
    labelAdminEmail: 'অ্যাডমিন ইমেল / আইডি',
    placeholderAdminEmail: 'যেমন edensync01@gmail.com',
    quickSelectAdmin: 'অ্যাডমিন অ্যাকাউন্ট নির্বাচন করুন:',
    labelAdminPassword: 'অ্যাডমিন পাসওয়ার্ড',
    placeholderAdminPassword: 'EDEN@#sync লিখুন',
    btnAutoFill: 'অটো-ফিল ডেমো',
    btnAdminSubmit: 'যাচাই করুন এবং অ্যাডমিন খুলুন',
    errorInvalidEmail: 'অবৈধ অ্যাডমিন আইডি। edensync01@gmail.com থেকে edensync10@gmail.com প্রযোজ্য।',
    errorInvalidPassword: 'ভুল পাসওয়ার্ড! সঠিক মাস্টার পাসওয়ার্ড (EDEN@#sync) লিখুন।',
  },
  mr: {
    badge: 'इडन सिंक प्रमाणीकरण',
    title: 'प्रवेश पोर्टल',
    selectLanguage: 'भाषा / Language',
    tabUser: 'जमीन मालक / वापरकर्ता',
    tabAdmin: 'अ‍ॅडमिन पोर्टल (Admin)',
    labelName: 'तुमचे पूर्ण नाव',
    placeholderName: 'उदा. रमेश पटेल',
    labelPhone: 'फोन नंबर',
    placeholderPhone: 'उदा. +91 98765 43210',
    labelAddress: 'पत्ता (पर्यायी)',
    placeholderAddress: 'जिल्हा, गाव किंवा शहर',
    btnUserSubmit: 'जमीन मालक पोर्टलवर पुढे जा',
    userAlertRequired: 'कृपया तुमचे नाव आणि फोन नंबर भरा',
    adminCredentialsTitle: 'अधिकृत अ‍ॅडमिन क्रेडेन्शियल्स',
    adminCredentialsList: 'अ‍ॅडमिन: edensync01@gmail.com ते edensync10@gmail.com',
    adminPasswordInfo: 'पासवर्ड: EDEN@#sync',
    labelAdminEmail: 'अ‍ॅडमिन ईमेल / आयडी',
    placeholderAdminEmail: 'उदा. edensync01@gmail.com',
    quickSelectAdmin: 'अ‍ॅडमिन खाते निवडा:',
    labelAdminPassword: 'अ‍ॅडमिन पासवर्ड',
    placeholderAdminPassword: 'EDEN@#sync टाका',
    btnAutoFill: 'ऑटो-फिल डेमो',
    btnAdminSubmit: 'पडताळणी करा आणि अ‍ॅडमिन उघडा',
    errorInvalidEmail: 'अवैध अ‍ॅडमिन आयडी. केवळ edensync01@gmail.com ते edensync10@gmail.com वैध आहेत.',
    errorInvalidPassword: 'अवैध पासवर्ड! योग्य मास्टर पासवर्ड (EDEN@#sync) प्रविष्ट करा.',
  },
  gu: {
    badge: 'ઇડન સિંક પ્રમાણીકરણ',
    title: 'એક્સેસ પોર્ટલ',
    selectLanguage: 'ભાષા / Language',
    tabUser: 'જમીન માલિક / વપરાશકર્તા',
    tabAdmin: 'એડમિન પોર્ટલ (Admin)',
    labelName: 'તમારું પૂરું નામ',
    placeholderName: 'દા.ત. રમેશ પટેલ',
    labelPhone: 'ફોન નંબર',
    placeholderPhone: 'દા.ત. +91 98765 43210',
    labelAddress: 'સરનામું (વૈકલ્પિક)',
    placeholderAddress: 'જિલ્લો, ગામ અથવા શહેર',
    btnUserSubmit: 'જમીન માલિક પોર્ટલ પર આગળ વધો',
    userAlertRequired: 'કૃપા કરીને તમારું નામ અને ફોન નંબર દાખલ કરો',
    adminCredentialsTitle: 'અધિકૃત એડમિન વિગતો',
    adminCredentialsList: 'એડમિન્સ: edensync01@gmail.com થી edensync10@gmail.com',
    adminPasswordInfo: 'પાસવર્ડ: EDEN@#sync',
    labelAdminEmail: 'એડમિન ઇમેઇલ / આઈડી',
    placeholderAdminEmail: 'દા.ત. edensync01@gmail.com',
    quickSelectAdmin: 'એડમિન એકાઉન્ટ પસંદ કરો:',
    labelAdminPassword: 'એડમિન પાસવર્ડ',
    placeholderAdminPassword: 'EDEN@#sync દાખલ કરો',
    btnAutoFill: 'ડેમો ઓટો ફિલ',
    btnAdminSubmit: 'ચકાસો અને એડમિન એક્સેસ કરો',
    errorInvalidEmail: 'અમાન્ય એડમિન આઈડી. ફક્ત edensync01@gmail.com થી edensync10@gmail.com માન્ય છે.',
    errorInvalidPassword: 'ખોટો પાસવર્ડ! કૃપા કરીને સાચો માસ્ટર પાસવર્ડ (EDEN@#sync) દાખલ કરો.',
  },
  pa: {
    badge: 'ਈਡਨ ਸਿੰਕ ਪ੍ਰਮਾਣਿਕਤਾ',
    title: 'ਐਕਸੈਸ ਪੋਰਟਲ',
    selectLanguage: 'ਭਾਸ਼ਾ / Language',
    tabUser: 'ਜ਼ਮੀਨ ਮਾਲਕ / ਉਪਭੋਗਤਾ',
    tabAdmin: 'ਐਡਮਿਨ ਪੋਰਟਲ (Admin)',
    labelName: 'ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ',
    placeholderName: 'ਉਦਾ. ਜਸਵੰਤ ਸਿੰਘ ਢਿੱਲੋਂ',
    labelPhone: 'ਫ਼ੋਨ ਨੰਬਰ',
    placeholderPhone: 'ਉਦਾ. +91 98140 65432',
    labelAddress: 'ਪਤਾ (ਵਿਕਲਪਿਕ)',
    placeholderAddress: 'ਜ਼ਿਲ੍ਹਾ, ਪਿੰਡ ਜਾਂ ਸ਼ਹਿਰ',
    btnUserSubmit: 'ਜ਼ਮੀਨ ਮਾਲਕ ਪੋਰਟਲ ਤੇ ਜਾਓ',
    userAlertRequired: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਅਤੇ ਫ਼ੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ',
    adminCredentialsTitle: 'ਅਧਿਕਾਰਤ ਐਡਮਿਨ ਵੇਰਵੇ',
    adminCredentialsList: 'ਐਡਮਿਨ: edensync01@gmail.com ਤੋਂ edensync10@gmail.com',
    adminPasswordInfo: 'ਪਾਸਵਰਡ: EDEN@#sync',
    labelAdminEmail: 'ਐਡਮਿਨ ਈਮੇਲ / ਆਈਡੀ',
    placeholderAdminEmail: 'ਉਦਾ. edensync01@gmail.com',
    quickSelectAdmin: 'ਐਡਮਿਨ ਖਾਤਾ ਚੁਣੋ:',
    labelAdminPassword: 'ਐਡਮਿਨ ਪਾਸਵਰਡ',
    placeholderAdminPassword: 'EDEN@#sync ਦਰਜ ਕਰੋ',
    btnAutoFill: 'ਆਟੋ-ਫਿਲ ਡੈਮੋ',
    btnAdminSubmit: 'ਪੜਤਾਲ ਕਰੋ ਅਤੇ ਐਡਮਿਨ ਖੋਲ੍ਹੋ',
    errorInvalidEmail: 'ਗ਼ਲਤ ਐਡਮਿਨ ਆਈਡੀ। ਸਿਰਫ਼ edensync01@gmail.com ਤੋਂ edensync10@gmail.com ਮੰਨਣਯੋਗ ਹਨ।',
    errorInvalidPassword: 'ਗ਼ਲਤ ਪਾਸਵਰਡ! ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਮਾਸਟਰ ਪਾਸਵਰਡ (EDEN@#sync) ਦਰਜ ਕਰੋ।',
  },
};
