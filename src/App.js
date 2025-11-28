import React, { useState, useRef, useEffect } from 'react';
import { Shirt, Layers, User, Plus, Sparkles, X, Camera, ImageOff, Upload, Check, ChevronLeft, Share, Heart, RefreshCw, MoreVertical, Watch, Grid, Palette, Trash2, Glasses, Gem, Sun, Cloud, Snowflake, Leaf, Briefcase, Coffee, Calendar, Footprints, Scissors, Wand2, Loader2, ScanLine, Tag, Lock, Moon, Globe, Settings, ArrowLeft, LogOut, Mail, Smartphone, ArrowRight, MapPin } from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "SENIN_API_KEY_BURAYA",
  authDomain: "SENIN_PROJECT_ID.firebaseapp.com",
  projectId: "SENIN_PROJECT_ID",
  storageBucket: "SENIN_PROJECT_ID.appspot.com",
  messagingSenderId: "SENIN_SENDER_ID",
  appId: "SENIN_APP_ID"
};

// Firebase'i Başlat
let auth;
try {
    if (firebaseConfig.apiKey !== "SENIN_API_KEY_BURAYA") {
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
    }
} catch (error) {
    console.error("Firebase hatası:", error);
}

// --- INITIAL DATA ---
const INITIAL_WARDROBE = [];

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  tr: {
    appName: 'StyleSync',
    wardrobe: 'Gardırobun',
    studio: 'Atölye',
    profile: 'Profil',
    addItem: 'Ekle',
    newItem: 'Yeni Ekle',
    guestUser: 'Misafir Kullanıcı',
    prototypeMode: 'Giriş Yapılmadı',
    settings: 'Ayarlar',
    bodyScan: 'Vücut Taraması (Demo)',
    soon: 'Yakında',
    deleteConfirm: 'Silmek istediğine emin misin?',
    aiAnalyze: 'AI Analiz & Ekle',
    photoUpload: 'Fotoğraf Çek / Yükle',
    autoRemove: 'Otomatik Arka Plan Silme & Analiz',
    itemName: 'Parça Adı',
    category: 'Kategori',
    color: 'Renk',
    style: 'Tarz',
    brand: 'Marka',
    save: 'Dolaba Kaydet',
    analyzing: 'Analiz Yapılıyor...',
    selectPhoto: 'Fotoğraf Seç',
    noItem: 'Bu kategoride ürün yok.',
    startAdd: 'Hemen yeni bir tane ekle!',
    combineAI: 'Yapay Zeka ile Kombinle',
    preparing: 'Kombin Hazırlanıyor...',
    spring: 'İlkbahar',
    summer: 'Yaz',
    autumn: 'Sonbahar',
    winter: 'Kış',
    office: 'Ofis',
    daily: 'Günlük',
    school: 'Okul',
    date: 'Date',
    party: 'Davet',
    holiday: 'Tatil',
    appearance: 'Görünüm',
    darkMode: 'Karanlık Mod',
    lightMode: 'Aydınlık Mod',
    systemMode: 'Sistem',
    language: 'Dil',
    turkish: 'Türkçe',
    english: 'English',
    back: 'Geri',
    privacy: 'Gizlilik Politikası',
    help: 'Yardım & Destek',
    logout: 'Çıkış Yap',
    general: 'Genel',
    myWardrobe: 'Gardırobum',
    itemsCount: 'parça kıyafetin var',
    loginTitle: 'Tekrar Hoşgeldin',
    signupTitle: 'Hesap Oluştur',
    loginSubtitle: 'Stil yolculuğuna devam et',
    signupSubtitle: 'Saniyeler içinde stilini oluşturmaya başla',
    continueWithApple: 'Apple ile Devam Et',
    continueWithGoogle: 'Google ile Devam Et',
    or: 'veya e-posta ile',
    emailPlaceholder: 'E-posta adresi',
    passwordPlaceholder: 'Şifre',
    login: 'Giriş Yap',
    signup: 'Kayıt Ol',
    noAccount: 'Hesabın yok mu?',
    haveAccount: 'Zaten hesabın var mı?',
    memberSince: 'Üyelik:',
    editProfile: 'Profili Düzenle',
    changePhoto: 'Fotoğrafı Değiştir',
    welcomeBack: 'Hoşgeldin,',
    privacyText: 'StyleSync olarak gizliliğinize önem veriyoruz. Bu uygulama, gardırop verilerinizi güvenli bir şekilde saklar.',
    securityTitle: 'Veri Güvenliği',
    localData: 'Bulut Depolama',
    encrypted: 'Güvenli İşlem',
    helpTitle: 'Yardım Merkezi',
    faq1: 'Nasıl kıyafet eklerim?',
    faq1A: 'Ana sayfadaki veya gardırop sekmesindeki "Ekle" butonuna tıklayarak fotoğraf çekebilir veya galeriden yükleyebilirsiniz.',
    faq2: 'Kombinler nasıl oluşturuluyor?',
    faq2A: 'Yapay zeka algoritması, seçtiğiniz tarza ve renklere uygun parçaları gardırobunuzdan eşleştirir.',
    contact: 'Destek Ekibiyle İletişime Geç',
    loginError: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.',
    signupError: 'Kayıt oluşturulamadı. E-posta kullanımda olabilir.',
    loading: 'İşleniyor...',
    onboardingTitle: 'Profilini Oluştur',
    step1Title: 'Sana nasıl hitap edelim?',
    nicknamePlaceholder: 'Kullanıcı Adı / Nickname',
    step2Title: 'Hakkında biraz bilgi',
    agePlaceholder: 'Yaşın',
    countryPlaceholder: 'Ülke / Şehir',
    step3Title: 'Favori Tarzın?',
    completeSetup: 'Kurulumu Tamamla'
  },
  en: {
    appName: 'StyleSync',
    wardrobe: 'Wardrobe',
    studio: 'Studio',
    profile: 'Profile',
    addItem: 'Add',
    newItem: 'Add New',
    guestUser: 'Guest User',
    prototypeMode: 'Not Logged In',
    settings: 'Settings',
    bodyScan: 'Body Scan (Demo)',
    soon: 'Soon',
    deleteConfirm: 'Are you sure you want to delete?',
    aiAnalyze: 'AI Analyze & Add',
    photoUpload: 'Take / Upload Photo',
    autoRemove: 'Auto Background Removal & Analysis',
    itemName: 'Item Name',
    category: 'Category',
    color: 'Color',
    style: 'Style',
    brand: 'Brand',
    save: 'Save to Wardrobe',
    analyzing: 'Analyzing...',
    selectPhoto: 'Select Photo',
    noItem: 'No items in this category.',
    startAdd: 'Add a new one now!',
    combineAI: 'Combine with AI',
    preparing: 'Preparing Outfit...',
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter',
    office: 'Office',
    daily: 'Daily',
    school: 'School',
    date: 'Date',
    party: 'Party',
    holiday: 'Holiday',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemMode: 'System',
    language: 'Language',
    turkish: 'Türkçe',
    english: 'English',
    back: 'Back',
    privacy: 'Privacy Policy',
    help: 'Help & Support',
    logout: 'Log Out',
    general: 'General',
    myWardrobe: 'My Wardrobe',
    itemsCount: 'items in wardrobe',
    loginTitle: 'Welcome Back',
    signupTitle: 'Create Account',
    loginSubtitle: 'Continue your style journey',
    signupSubtitle: 'Start creating your style in seconds',
    continueWithApple: 'Continue with Apple',
    continueWithGoogle: 'Continue with Google',
    or: 'or continue with email',
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    login: 'Log In',
    signup: 'Sign Up',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    memberSince: 'Member since:',
    editProfile: 'Edit Profile',
    changePhoto: 'Change Photo',
    welcomeBack: 'Welcome back,',
    privacyText: 'At StyleSync, we value your privacy. This app stores your wardrobe data securely.',
    securityTitle: 'Data Security',
    localData: 'Cloud Storage',
    encrypted: 'Secure Process',
    helpTitle: 'Help Center',
    faq1: 'How do I add clothes?',
    faq1A: 'Click the "Add" button on the home page or wardrobe tab to take a photo or upload from gallery.',
    faq2: 'How are outfits created?',
    faq2A: 'The AI algorithm matches items from your wardrobe that fit your selected style and colors.',
    contact: 'Contact Support Team',
    loginError: 'Login failed. Please check your credentials.',
    signupError: 'Signup failed. Email might be in use.',
    loading: 'Processing...',
    onboardingTitle: 'Create Your Profile',
    step1Title: 'What should we call you?',
    nicknamePlaceholder: 'Username / Nickname',
    step2Title: 'A little about you',
    agePlaceholder: 'Your Age',
    countryPlaceholder: 'Country / City',
    step3Title: 'Favorite Style?',
    completeSetup: 'Complete Setup'
  }
};

// --- SHARED DATA ---
const STYLES = ['Old Money', 'Casual', 'Streetwear', 'Vintage', 'Business', 'Sporty'];
const FABRICS = ['Pamuk', 'Keten', 'Yün', 'Polyester', 'Deri', 'Denim', 'İpek', 'Kaşmir'];
const FITS = ['Slim Fit', 'Regular', 'Oversize', 'Skinny', 'Loose'];
const SEASONS_DATA = ['Yaz', 'Kış', 'İlkbahar', 'Sonbahar', 'Mevsimsiz'];

const COLORS = [
    { name: 'Siyah', hex: '#000000', text: 'white' },
    { name: 'Beyaz', hex: '#FFFFFF', text: 'black' },
    { name: 'Bej', hex: '#D2B48C', text: 'black' },
    { name: 'Lacivert', hex: '#000080', text: 'white' },
    { name: 'Kahverengi', hex: '#5D4037', text: 'white' },
    { name: 'Yeşil', hex: '#2E7D32', text: 'white' },
    { name: 'Gri', hex: '#616161', text: 'white' },
    { name: 'Bordo', hex: '#800000', text: 'white' },
    { name: 'Kırmızı', hex: '#FF0000', text: 'white' },
    { name: 'Mavi', hex: '#0000FF', text: 'white' },
];

// --- HELPER COMPONENTS ---

const Header = ({ lang }) => (
  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
      {TRANSLATIONS[lang].appName}
    </h1>
    <div className="flex gap-2">
      <button className="p-2 bg-purple-50 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors">
        <Sparkles size={20} className="text-purple-600 dark:text-purple-400" />
      </button>
    </div>
  </div>
);

const Navigation = ({ activeTab, setActiveTab, lang }) => {
  const tabs = [
    { id: 'wardrobe', icon: Shirt, label: TRANSLATIONS[lang].wardrobe },
    { id: 'studio', icon: Layers, label: TRANSLATIONS[lang].studio },
    { id: 'profile', icon: User, label: TRANSLATIONS[lang].profile },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around py-3 px-2 z-20 pb-6 md:pb-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 w-full transition-all duration-200 ${
            activeTab === tab.id 
              ? 'text-purple-600 dark:text-purple-400 scale-105' 
              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
          }`}
        >
          <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const SafeImage = ({ src, alt, className, fallbackColor }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600`} 
        style={fallbackColor ? { backgroundColor: fallbackColor } : {}}
      >
        <ImageOff className="w-8 h-8 opacity-50" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

// --- VIEW COMPONENTS ---

const LoginView = ({ lang, onLogin, error, isLoading }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (email && password) {
            onLogin('email', { email, password });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 p-6 animate-in fade-in duration-500">
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-200 dark:shadow-purple-900/20 transform rotate-12 mb-4 transition-all hover:scale-105">
                    <Sparkles size={48} className="text-white" />
                </div>
                
                <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isLogin ? TRANSLATIONS[lang].loginTitle : TRANSLATIONS[lang].signupTitle}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {isLogin ? TRANSLATIONS[lang].loginSubtitle : TRANSLATIONS[lang].signupSubtitle}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm w-full max-w-sm flex items-center gap-2 justify-center animate-in shake">
                        <X size={16} /> {error}
                    </div>
                )}

                <div className="w-full space-y-3 max-w-sm animate-in slide-in-from-bottom-8 duration-700 delay-100">
                    <button 
                        onClick={() => onLogin('apple')}
                        className="w-full flex items-center justify-center gap-3 bg-black text-white p-4 rounded-xl font-medium hover:opacity-90 transition-all active:scale-95 shadow-lg"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 3.87-.84c1.61.12 2.87.69 3.6 1.74-3.2 1.6-2.67 6.08.54 7.64-.69 1.49-1.58 2.92-3.09 3.69zm-4.76-17.7c-1.35-.06-2.6 1.22-2.3 2.65 1.35.13 2.53-1.22 2.3-2.65z"/></svg>
                        {TRANSLATIONS[lang].continueWithApple}
                    </button>

                    <button 
                        onClick={() => onLogin('google')}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white p-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95 shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        {TRANSLATIONS[lang].continueWithGoogle}
                    </button>
                </div>

                <div className="relative w-full max-w-sm animate-in fade-in duration-700 delay-200">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200 dark:border-gray-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-950 px-2 text-gray-400">{TRANSLATIONS[lang].or}</span>
                    </div>
                </div>

                <div className="w-full max-w-sm space-y-3 animate-in slide-in-from-bottom-8 duration-700 delay-300">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            placeholder={TRANSLATIONS[lang].emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder:text-gray-400 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            placeholder={TRANSLATIONS[lang].passwordPlaceholder}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder:text-gray-400 transition-all"
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-purple-200 dark:shadow-purple-900/30 hover:bg-purple-700 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? TRANSLATIONS[lang].login : TRANSLATIONS[lang].signup)}
                    </button>
                </div>

                <div className="text-sm animate-in fade-in duration-700 delay-500">
                    <span className="text-gray-500 dark:text-gray-400">
                        {isLogin ? TRANSLATIONS[lang].noAccount : TRANSLATIONS[lang].haveAccount}
                    </span>
                    <button 
                        onClick={() => { setIsLogin(!isLogin); }}
                        className="ml-2 font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 transition-colors"
                    >
                        {isLogin ? TRANSLATIONS[lang].signup : TRANSLATIONS[lang].login}
                    </button>
                </div>
            </div>
        </div>
    );
};

const OnboardingView = ({ lang, onComplete }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        nickname: '',
        age: '',
        country: '',
        favoriteStyle: ''
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            onComplete(data);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 p-6 animate-in fade-in duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 dark:bg-gray-900">
                <div 
                    className="h-full bg-purple-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center max-w-sm mx-auto w-full py-12">
                
                {step === 1 && (
                    <div className="w-full space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User size={40} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                            {TRANSLATIONS[lang].step1Title}
                        </h2>
                        <div className="space-y-2">
                            <input 
                                type="text" 
                                placeholder={TRANSLATIONS[lang].nicknamePlaceholder}
                                value={data.nickname}
                                onChange={(e) => setData({...data, nickname: e.target.value})}
                                className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg font-medium text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="w-full space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={40} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                            {TRANSLATIONS[lang].step2Title}
                        </h2>
                        <div className="space-y-4">
                            <input 
                                type="number" 
                                placeholder={TRANSLATIONS[lang].agePlaceholder}
                                value={data.age}
                                onChange={(e) => setData({...data, age: e.target.value})}
                                className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg font-medium text-gray-900 dark:text-white"
                            />
                            <input 
                                type="text" 
                                placeholder={TRANSLATIONS[lang].countryPlaceholder}
                                value={data.country}
                                onChange={(e) => setData({...data, country: e.target.value})}
                                className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg font-medium text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="w-full space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Gem size={40} className="text-pink-600 dark:text-pink-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                            {TRANSLATIONS[lang].step3Title}
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {STYLES.map((style) => (
                                <button
                                    key={style}
                                    onClick={() => setData({...data, favoriteStyle: style})}
                                    className={`p-4 rounded-xl border transition-all text-sm font-semibold ${
                                        data.favoriteStyle === style 
                                            ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105' 
                                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="w-full mt-8 flex gap-4">
                    {step > 1 && (
                        <button 
                            onClick={() => setStep(step - 1)}
                            className="flex-1 p-4 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {TRANSLATIONS[lang].back}
                        </button>
                    )}
                    <button 
                        onClick={handleNext}
                        disabled={(step === 1 && !data.nickname) || (step === 2 && (!data.age || !data.country)) || (step === 3 && !data.favoriteStyle)}
                        className="flex-[2] bg-purple-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-purple-200 dark:shadow-purple-900/30 hover:bg-purple-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {step === 3 ? TRANSLATIONS[lang].completeSetup : TRANSLATIONS[lang].continue}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const PrivacyPage = ({ lang, onBack }) => (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3 z-10">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{TRANSLATIONS[lang].privacy}</h2>
        </div>
        <div className="p-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 leading-relaxed">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm">
                        <Shield size={32} />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">{TRANSLATIONS[lang].securityTitle}</h3>
                <p className="text-center mb-6 text-sm">{TRANSLATIONS[lang].privacyText}</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400"><Check size={16} /></div>
                        <span className="text-sm font-medium">{TRANSLATIONS[lang].localData}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400"><Lock size={16} /></div>
                        <span className="text-sm font-medium">{TRANSLATIONS[lang].encrypted}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const HelpPage = ({ lang, onBack }) => (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3 z-10">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{TRANSLATIONS[lang].helpTitle}</h2>
        </div>
        <div className="p-4 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-2">
                    <HelpCircle className="text-purple-500 mt-1 shrink-0" size={20} />
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{TRANSLATIONS[lang].faq1}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{TRANSLATIONS[lang].faq1A}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-2">
                    <Wand2 className="text-purple-500 mt-1 shrink-0" size={20} />
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{TRANSLATIONS[lang].faq2}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{TRANSLATIONS[lang].faq2A}</p>
                    </div>
                </div>
            </div>
            
            <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-200 dark:shadow-purple-900/30 flex items-center justify-center gap-2 mt-4 hover:bg-purple-700 transition-colors active:scale-95">
                <MessageCircle size={20} />
                {TRANSLATIONS[lang].contact}
            </button>
        </div>
    </div>
);

const SettingsView = ({ lang, setLang, theme, setTheme, onBack, onLogout }) => {
  const [subPage, setSubPage] = useState(null);

  if (subPage === 'privacy') return <PrivacyPage lang={lang} onBack={() => setSubPage(null)} />;
  if (subPage === 'help') return <HelpPage lang={lang} onBack={() => setSubPage(null)} />;

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3 z-10">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{TRANSLATIONS[lang].settings}</h2>
        </div>

        <div className="p-4 space-y-6">
            <section className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Sun size={16} /> {TRANSLATIONS[lang].appearance}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    <button 
                        onClick={() => setTheme('light')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            theme === 'light' 
                                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-400' 
                                : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400'
                        }`}
                    >
                        <Sun size={24} />
                        <span className="text-xs font-medium">{TRANSLATIONS[lang].lightMode}</span>
                    </button>
                    <button 
                        onClick={() => setTheme('dark')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            theme === 'dark' 
                                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-400' 
                                : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400'
                        }`}
                    >
                        <Moon size={24} />
                        <span className="text-xs font-medium">{TRANSLATIONS[lang].darkMode}</span>
                    </button>
                    <button 
                        onClick={() => setTheme('system')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            theme === 'system' 
                                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-400' 
                                : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400'
                        }`}
                    >
                        <Settings size={24} />
                        <span className="text-xs font-medium">{TRANSLATIONS[lang].systemMode}</span>
                    </button>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Globe size={16} /> {TRANSLATIONS[lang].language}
                </h3>
                <div className="space-y-2">
                    <button 
                        onClick={() => setLang('tr')}
                        className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                            lang === 'tr' 
                                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800' 
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🇹🇷</span>
                            <span className="font-medium">{TRANSLATIONS[lang].turkish}</span>
                        </div>
                        {lang === 'tr' && <Check size={18} />}
                    </button>
                    <button 
                        onClick={() => setLang('en')}
                        className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                            lang === 'en' 
                                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800' 
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🇺🇸</span>
                            <span className="font-medium">{TRANSLATIONS[lang].english}</span>
                        </div>
                        {lang === 'en' && <Check size={18} />}
                    </button>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                <button 
                    onClick={() => setSubPage('privacy')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    <span className="font-medium flex items-center gap-2"><Shield size={18} /> {TRANSLATIONS[lang].privacy}</span>
                    <ChevronLeft size={18} className="rotate-180 text-gray-400" />
                </button>
                <button 
                    onClick={() => setSubPage('help')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    <span className="font-medium flex items-center gap-2"><HelpCircle size={18} /> {TRANSLATIONS[lang].help}</span>
                    <ChevronLeft size={18} className="rotate-180 text-gray-400" />
                </button>
                <button 
                    onClick={onLogout}
                    className="w-full p-4 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                >
                    <span className="font-medium flex items-center gap-2"><LogOut size={18} /> {TRANSLATIONS[lang].logout}</span>
                </button>
            </section>
        </div>
    </div>
  );
};

const WardrobeView = ({ wardrobe, onAddItem, onDeleteItem, lang }) => {
  const categories = ['Tümü', 'Üst', 'Alt', 'Dış Giyim', 'Ayakkabı', 'Aksesuar'];
  const [activeCat, setActiveCat] = useState('Tümü');

  const filteredWardrobe = activeCat === 'Tümü' 
    ? wardrobe 
    : wardrobe.filter(item => {
        const type = item.type;
        if (activeCat === 'Üst') return type === 'ust';
        if (activeCat === 'Alt') return type === 'alt';
        if (activeCat === 'Dış Giyim') return type === 'dis_giyim';
        if (activeCat === 'Ayakkabı') return type === 'ayakkabi';
        if (activeCat === 'Aksesuar') return ['saat', 'gozluk', 'kolye', 'kupe', 'bileklik'].includes(type);
        return false;
      });

  return (
    <div className="pb-24 p-4 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{TRANSLATIONS[lang].myWardrobe}</h2>
           <p className="text-xs text-gray-500 dark:text-gray-400">{wardrobe.length} {TRANSLATIONS[lang].itemsCount}</p>
        </div>
        
        <button 
          onClick={onAddItem}
          className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-gray-300 dark:shadow-none hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95 transition-all"
        >
          <Plus size={18} />
          <span>{TRANSLATIONS[lang].addItem}</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCat === cat 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none' 
                : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
        {filteredWardrobe.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-600">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
                    <Shirt size={32} className="opacity-30" />
                </div>
                <p>{TRANSLATIONS[lang].noItem}</p>
                <p className="text-xs mt-1">{TRANSLATIONS[lang].startAdd}</p>
            </div>
        ) : (
            filteredWardrobe.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-3 relative group hover:shadow-md transition-all">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        if(window.confirm(TRANSLATIONS[lang].deleteConfirm)) {
                            onDeleteItem(item.id);
                        }
                    }}
                    className="absolute top-2 right-2 z-50 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 transition-all"
                    title="Sil"
                >
                    <Trash2 size={16} strokeWidth={2.5} />
                </button>

                <div className="w-full aspect-[4/5] bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <SafeImage 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500"
                        fallbackColor={item.color}
                    />
                    <span className="absolute bottom-2 right-2 text-[8px] bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm text-gray-700 font-bold tracking-wide flex flex-col items-end">
                        <span>{item.brand || 'Markasız'}</span>
                        <span className="text-purple-600 font-normal">{item.style}</span>
                    </span>
                </div>
                <div className="text-left w-full px-1">
                    <h3 className="text-sm font-bold truncate text-gray-800 dark:text-gray-200">{item.name}</h3>
                    <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                </div>
            </div>
            ))
        )}
        
        <button 
          onClick={onAddItem}
          className="aspect-[4/5] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 hover:text-purple-500 transition-all group"
        >
           <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900 flex items-center justify-center transition-colors">
              <Plus size={24} />
           </div>
           <span className="text-xs font-semibold">{TRANSLATIONS[lang].newItem}</span>
        </button>
      </div>
    </div>
  );
};

const StudioView = ({ wardrobe, lang }) => {
  const seasons = [
    { name: TRANSLATIONS[lang].spring, icon: Leaf },
    { name: TRANSLATIONS[lang].summer, icon: Sun },
    { name: TRANSLATIONS[lang].autumn, icon: Cloud },
    { name: TRANSLATIONS[lang].winter, icon: Snowflake }
  ];

  const events = [
    { name: TRANSLATIONS[lang].office, icon: Briefcase },
    { name: TRANSLATIONS[lang].daily, icon: Coffee },
    { name: TRANSLATIONS[lang].school, icon: User },
    { name: TRANSLATIONS[lang].date, icon: Heart },
    { name: TRANSLATIONS[lang].party, icon: Gem },
    { name: TRANSLATIONS[lang].holiday, icon: Sun },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const [selections, setSelections] = useState({
    season: '',
    style: '',
    colors: [],
    event: ''
  });

  const [currentOutfit, setCurrentOutfit] = useState({ 
      outerwear: null,
      top: null, 
      bottom: null, 
      shoes: null, 
      watch: null,
      glasses: null,
      jewelry: null
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleStep = (step) => {
    setActiveStep(activeStep === step ? null : step);
  };

  const handleSelection = (key, value, nextStep) => {
    setSelections(prev => {
        if (key === 'colors') {
            const currentColors = prev.colors || [];
            if (currentColors.includes(value)) {
                return { ...prev, colors: currentColors.filter(c => c !== value) };
            } else {
                return { ...prev, colors: [...currentColors, value] };
            }
        }
        return { ...prev, [key]: value };
    });
    
    if (nextStep && key !== 'colors') {
        setTimeout(() => setActiveStep(nextStep), 300);
    }
  };

  const generateOutfit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const outerwear = wardrobe.filter(i => i.type === 'dis_giyim');
      const tops = wardrobe.filter(i => i.type === 'ust');
      const bottoms = wardrobe.filter(i => i.type === 'alt');
      const shoes = wardrobe.filter(i => i.type === 'ayakkabi');
      const watches = wardrobe.filter(i => i.type === 'saat');
      const glasses = wardrobe.filter(i => i.type === 'gozluk');
      const jewelry = wardrobe.filter(i => ['kolye', 'kupe', 'bileklik'].includes(i.type));

      setCurrentOutfit({
        outerwear: outerwear.length ? outerwear[Math.floor(Math.random() * outerwear.length)] : null,
        top: tops.length ? tops[Math.floor(Math.random() * tops.length)] : null,
        bottom: bottoms.length ? bottoms[Math.floor(Math.random() * bottoms.length)] : null,
        shoes: shoes.length ? shoes[Math.floor(Math.random() * shoes.length)] : null,
        watch: watches.length ? watches[Math.floor(Math.random() * watches.length)] : null,
        glasses: glasses.length ? glasses[Math.floor(Math.random() * glasses.length)] : null,
        jewelry: jewelry.length ? jewelry[Math.floor(Math.random() * jewelry.length)] : null,
      });
      setIsGenerating(false);
      setActiveStep(null);
    }, 1000);
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 sticky top-14 z-30 shadow-sm border-b border-gray-100 dark:border-gray-800 p-4 space-y-3">
        
        <div className={`border rounded-xl overflow-hidden transition-all ${activeStep === 1 ? 'border-purple-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}>
            <button onClick={() => toggleStep(1)} className="w-full p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                <span className="font-semibold text-sm flex items-center gap-2 dark:text-white">
                    <Sun size={16} /> 1. Mevsim
                </span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">{selections.season}</span>
            </button>
            {activeStep === 1 && (
                <div className="p-3 bg-white dark:bg-gray-900 grid grid-cols-2 gap-2 animate-in slide-in-from-top-2">
                    {seasons.map(s => (
                        <button 
                            key={s.name}
                            onClick={() => handleSelection('season', s.name, 2)}
                            className={`p-3 rounded-lg text-sm border flex items-center justify-center gap-2 transition-all ${
                                selections.season === s.name 
                                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            <s.icon size={14} /> {s.name}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className={`border rounded-xl overflow-hidden transition-all ${activeStep === 2 ? 'border-purple-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}>
            <button onClick={() => toggleStep(2)} className="w-full p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                <span className="font-semibold text-sm flex items-center gap-2 dark:text-white">
                    <User size={16} /> 2. Tarz
                </span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">{selections.style}</span>
            </button>
            {activeStep === 2 && (
                <div className="p-3 bg-white dark:bg-gray-900 flex flex-wrap gap-2 animate-in slide-in-from-top-2">
                    {STYLES.map(s => (
                        <button 
                            key={s}
                            onClick={() => handleSelection('style', s, 3)}
                            className={`px-4 py-2 rounded-full text-xs border transition-all ${
                                selections.style === s 
                                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className={`border rounded-xl overflow-hidden transition-all ${activeStep === 3 ? 'border-purple-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}>
            <button onClick={() => toggleStep(3)} className="w-full p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                <span className="font-semibold text-sm flex items-center gap-2 dark:text-white">
                    <Palette size={16} /> 3. Renkler
                </span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">
                    {selections.colors.length > 0 ? `${selections.colors.length} Seçildi` : ''}
                </span>
            </button>
            {activeStep === 3 && (
                <div className="p-3 bg-white dark:bg-gray-900 animate-in slide-in-from-top-2">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {COLORS.map(c => {
                            const isSelected = selections.colors.includes(c.name);
                            return (
                                <button 
                                    key={c.name}
                                    onClick={() => handleSelection('colors', c.name)}
                                    className={`w-10 h-10 rounded-full flex-shrink-0 border flex items-center justify-center transition-all ${
                                        isSelected ? 'ring-2 ring-offset-2 ring-purple-500 scale-110' : 'dark:border-gray-700'
                                    }`}
                                    style={{ backgroundColor: c.hex }}
                                >
                                    {isSelected && <Check size={16} color={c.text} strokeWidth={3} />}
                                </button>
                            );
                        })}
                    </div>
                    <button 
                        onClick={() => setActiveStep(4)}
                        className="w-full mt-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Devam Et
                    </button>
                </div>
            )}
        </div>

        <div className={`border rounded-xl overflow-hidden transition-all ${activeStep === 4 ? 'border-purple-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}>
            <button onClick={() => toggleStep(4)} className="w-full p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                <span className="font-semibold text-sm flex items-center gap-2 dark:text-white">
                    <Calendar size={16} /> 4. Etkinlik
                </span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">{selections.event}</span>
            </button>
            {activeStep === 4 && (
                <div className="p-3 bg-white dark:bg-gray-900 grid grid-cols-3 gap-2 animate-in slide-in-from-top-2">
                    {events.map(e => (
                        <button 
                            key={e.name}
                            onClick={() => handleSelection('event', e.name, null)}
                            className={`p-2 rounded-lg text-xs border flex flex-col items-center gap-1 transition-all ${
                                selections.event === e.name 
                                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            <e.icon size={16} /> {e.name}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <button 
            onClick={generateOutfit}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
            <Sparkles size={18} className={isGenerating ? "animate-spin text-yellow-400 dark:text-purple-600" : "text-yellow-400 dark:text-purple-600"} />
            {isGenerating ? TRANSLATIONS[lang].preparing : TRANSLATIONS[lang].combineAI}
        </button>

      </div>

      <div className="flex-1 p-4 flex flex-col items-center">
        <div className="w-full bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl shadow-gray-200 dark:shadow-black/50 overflow-hidden relative min-h-[800px] flex flex-col border border-gray-100 dark:border-gray-800">
           <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 z-0" />
           
           <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
              <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
                 <Heart size={20} />
              </button>
              <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-400 hover:text-blue-500 transition-colors">
                 <Share size={20} />
              </button>
           </div>

           <div className="relative z-10 flex-1 p-4 flex flex-col h-full">
              {!currentOutfit.top && !currentOutfit.bottom ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 text-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Layers size={40} className="opacity-30" />
                    </div>
                    <p className="text-sm">Kriterleri seç ve<br/>kombinini oluştur.</p>
                 </div>
              ) : (
                <div className="flex-1 flex gap-4 h-full animate-in zoom-in duration-500">
                    
                    <div className="flex-1 flex flex-col gap-4">
                        
                        <div className="flex-1 relative group bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[150px]">
                             {currentOutfit.outerwear ? (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center p-2">
                                        <SafeImage 
                                            src={currentOutfit.outerwear.imageUrl} 
                                            alt={currentOutfit.outerwear.name} 
                                            className="w-full h-full object-contain drop-shadow-xl"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <p className="text-[10px] font-bold text-gray-900 dark:text-white">{currentOutfit.outerwear.brand}</p>
                                    </div>
                                </>
                             ) : (
                                <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">Dış Giyim</span>
                             )}
                        </div>

                        <div className="flex-[1.5] relative group bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[200px]">
                             {currentOutfit.top ? (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center p-2">
                                        <SafeImage 
                                            src={currentOutfit.top.imageUrl} 
                                            alt={currentOutfit.top.name} 
                                            className="w-full h-full object-contain drop-shadow-xl"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <p className="text-[10px] font-bold text-gray-900 dark:text-white">{currentOutfit.top.brand}</p>
                                    </div>
                                </>
                             ) : (
                                <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">Üst Giyim</span>
                             )}
                        </div>

                        <div className="flex-[1.5] relative group bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[200px]">
                             {currentOutfit.bottom ? (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center p-2">
                                        <SafeImage 
                                            src={currentOutfit.bottom.imageUrl} 
                                            alt={currentOutfit.bottom.name} 
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <p className="text-[10px] font-bold text-gray-900 dark:text-white">{currentOutfit.bottom.brand}</p>
                                    </div>
                                </>
                             ) : (
                                <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">Alt Giyim</span>
                             )}
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col gap-4">
                        
                        <div className="h-24 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center relative border border-gray-100 dark:border-gray-700 border-dashed overflow-hidden">
                             {currentOutfit.glasses ? (
                                <div className="absolute inset-0 p-2 flex items-center justify-center">
                                    <SafeImage src={currentOutfit.glasses.imageUrl} className="w-full h-full object-contain" />
                                </div>
                             ) : <Glasses size={20} className="text-gray-300 dark:text-gray-600 opacity-50" />}
                        </div>

                        <div className="h-24 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center relative border border-gray-100 dark:border-gray-700 border-dashed overflow-hidden">
                             {currentOutfit.watch ? (
                                <div className="absolute inset-0 p-2 flex items-center justify-center">
                                    <SafeImage src={currentOutfit.watch.imageUrl} className="w-full h-full object-contain" />
                                </div>
                             ) : <Watch size={20} className="text-gray-300 dark:text-gray-600 opacity-50" />}
                        </div>

                        <div className="h-24 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center relative border border-gray-100 dark:border-gray-700 border-dashed overflow-hidden">
                             {currentOutfit.jewelry ? (
                                <div className="absolute inset-0 p-2 flex items-center justify-center">
                                    <SafeImage src={currentOutfit.jewelry.imageUrl} className="w-full h-full object-contain" />
                                </div>
                             ) : <Gem size={20} className="text-gray-300 dark:text-gray-600 opacity-50" />}
                        </div>

                        <div className="flex-1 relative group bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[150px]">
                            {currentOutfit.shoes ? (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center p-2">
                                        <SafeImage 
                                            src={currentOutfit.shoes.imageUrl} 
                                            alt={currentOutfit.shoes.name} 
                                            className="w-full h-full object-contain drop-shadow-lg transform -rotate-12"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <p className="text-[10px] font-bold text-gray-900 dark:text-white">{currentOutfit.shoes.brand}</p>
                                    </div>
                                </>
                            ) : (
                                <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">Ayakkabı</span>
                            )}
                        </div>
                    </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const [activeTab, setActiveTab] = useState('wardrobe');
  const [wardrobe, setWardrobe] = useState(() => {
      const saved = localStorage.getItem('styleSyncWardrobe');
      return saved ? JSON.parse(saved) : INITIAL_WARDROBE;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false); 

  const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('styleSyncUser');
      return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      localStorage.setItem('styleSyncWardrobe', JSON.stringify(wardrobe));
  }, [wardrobe]);

  useEffect(() => {
      if (user) {
          localStorage.setItem('styleSyncUser', JSON.stringify(user));
      } else {
          localStorage.removeItem('styleSyncUser');
      }
  }, [user]);

  useEffect(() => {
      const root = window.document.documentElement;
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
      } else {
          root.classList.remove('dark');
      }
  }, [theme]);

  const handleAddItem = (newItem) => {
    setWardrobe(prev => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteItem = (itemId) => {
    setWardrobe(prev => prev.filter(item => item.id !== itemId));
  };

  const handleLogin = async (provider, data) => {
    setIsLoading(true);
    setError('');

    try {
        if (!auth || firebaseConfig.apiKey === "SENIN_API_KEY_BURAYA") {
             console.warn("Firebase not configured. Using Mock Login.");
             await new Promise(r => setTimeout(r, 1000));
             
             const mockUser = {
                id: 'mock-user-123',
                name: data?.email ? data.email.split('@')[0] : 'Demo Kullanıcı',
                email: data?.email || 'demo@stylesync.com',
                photo: null,
                onboardingCompleted: false 
             };
             setUser(mockUser);
             
             if (!mockUser.onboardingCompleted) {
                 setShowOnboarding(true);
             }
             
             setIsLoading(false);
             return;
        }

        // ... Firebase login logic ...

    } catch (err) {
        console.error("Login Error:", err);
        setError(TRANSLATIONS[lang].loginError);
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = async () => {
      try {
          if (auth) await signOut(auth);
          setUser(null);
          setShowSettings(false);
          setShowOnboarding(false);
          setActiveTab('wardrobe');
      } catch (err) {
          console.error("Logout Error", err);
      }
  };

  const handleChangePhoto = (photoUrl) => {
      setUser(prev => ({ ...prev, photo: photoUrl }));
  };

  const handleOnboardingComplete = (onboardingData) => {
      setUser(prev => ({
          ...prev,
          ...onboardingData, 
          onboardingCompleted: true
      }));
      setShowOnboarding(false);
  };

  if (!user) {
      return (
        <div className={`max-w-md mx-auto bg-white dark:bg-gray-950 min-h-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}>
             <LoginView lang={lang} onLogin={handleLogin} error={error} isLoading={isLoading} />
        </div>
      );
  }

  if (showOnboarding) {
      return (
        <div className={`max-w-md mx-auto bg-white dark:bg-gray-950 min-h-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}>
            <OnboardingView lang={lang} onComplete={handleOnboardingComplete} />
        </div>
      );
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-950 min-h-screen shadow-2xl overflow-hidden relative font-sans text-gray-900 dark:text-white border-x border-gray-100 dark:border-gray-900 transition-colors duration-300">
      
      {showSettings ? (
          <SettingsView 
            lang={lang} setLang={setLang}
            theme={theme} setTheme={setTheme}
            onBack={() => setShowSettings(false)}
            onLogout={handleLogout}
          />
      ) : (
          <>
            <Header lang={lang} />
            
            <main className="h-full animate-in fade-in duration-500">
                {activeTab === 'wardrobe' && 
                    <WardrobeView 
                        wardrobe={wardrobe} 
                        onAddItem={() => setIsModalOpen(true)} 
                        onDeleteItem={handleDeleteItem}
                        lang={lang}
                    />
                }
                {activeTab === 'studio' && <StudioView wardrobe={wardrobe} lang={lang} />}
                {activeTab === 'profile' && 
                    <ProfileView 
                        onOpenSettings={() => setShowSettings(true)} 
                        lang={lang} 
                        user={user}
                        onChangePhoto={handleChangePhoto}
                    />
                }
            </main>

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

            <AddItemModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAdd={handleAddItem}
                lang={lang}
            />
          </>
      )}
    </div>
  );
};

export default App;
