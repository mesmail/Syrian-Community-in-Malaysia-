export type Language = 'ar' | 'en' | 'ms';

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
    ms: string;
  };
}

export const translations: Translation = {
  nav_home: {
    ar: 'الرئيسية',
    en: 'Home',
    ms: 'Utama'
  },
  nav_about: {
    ar: 'عن المجتمع',
    en: 'About',
    ms: 'Tentang'
  },
  nav_services: {
    ar: 'الخدمات',
    en: 'Services',
    ms: 'Perkhidmatan'
  },
  nav_news: {
    ar: 'الأخبار',
    en: 'News',
    ms: 'Berita'
  },
  nav_events: {
    ar: 'الفعاليات',
    en: 'Events',
    ms: 'Acara'
  },
  nav_directory: {
    ar: 'دليل الأعمال',
    en: 'Directory',
    ms: 'Direktori'
  },
  nav_contact: {
    ar: 'اتصل بنا',
    en: 'Contact',
    ms: 'Hubungi'
  },
  hero_title: {
    ar: 'المجتمع السوري في ماليزيا',
    en: 'Syrian Community in Malaysia',
    ms: 'Komuniti Syria di Malaysia'
  },
  hero_subtitle: {
    ar: 'تواصل، دعم، وبناء المستقبل',
    en: 'Connecting Syrians, Supporting Community, Building the Future',
    ms: 'Menghubungkan warga Syria, Menyokong Komuniti, Membina Masa Depan'
  },
  cta_join: {
    ar: 'انضم إلينا',
    en: 'Join Us',
    ms: 'Sertai Kami'
  },
  cta_explore: {
    ar: 'استكشف الخدمات',
    en: 'Explore Services',
    ms: 'Teroka Perkhidmatan'
  },
  latest_news: {
    ar: 'آخر الأخبار',
    en: 'Latest News',
    ms: 'Berita Terkini'
  },
  upcoming_events: {
    ar: 'الفعاليات القادمة',
    en: 'Upcoming Events',
    ms: 'Acara Akan Datang'
  },
  featured_businesses: {
    ar: 'أعمال سورية مميزة',
    en: 'Featured Syrian Businesses',
    ms: 'Perniagaan Syria Pilihan'
  },
  footer_desc: {
    ar: 'المنصة الشاملة للسوريين في ماليزيا.',
    en: 'The comprehensive platform for Syrians in Malaysia.',
    ms: 'Platform komprehensif untuk warga Syria di Malaysia.'
  },
  nav_forum: {
    ar: 'المنتدى',
    en: 'Forum',
    ms: 'Forum'
  },
  forum_title: {
    ar: 'منتدى المجتمع',
    en: 'Community Forum',
    ms: 'Forum Komuniti'
  },
  forum_subtitle: {
    ar: 'ناقش، شارك، وتواصل مع الآخرين',
    en: 'Discuss, share, and connect with others',
    ms: 'Bincang, kongsi, dan berhubung dengan orang lain'
  },
  create_topic: {
    ar: 'إنشاء موضوع جديد',
    en: 'Create New Topic',
    ms: 'Cipta Topik Baru'
  },
  replies: {
    ar: 'ردود',
    en: 'Replies',
    ms: 'Balasan'
  },
  register_event: {
    ar: 'تسجيل في الفعالية',
    en: 'Register for Event',
    ms: 'Daftar untuk Acara'
  },
  registration_success: {
    ar: 'تم التسجيل بنجاح!',
    en: 'Registration Successful!',
    ms: 'Pendaftaran Berjaya!'
  },
  already_registered: {
    ar: 'أنت مسجل بالفعل في هذه الفعالية',
    en: 'You are already registered for this event',
    ms: 'Anda sudah mendaftar untuk acara ini'
  },
  legal_info: {
    ar: 'المعلومات القانونية',
    en: 'Legal Information',
    ms: 'Maklumat Undang-undang'
  },
  unhcr_info: {
    ar: 'معلومات المفوضية',
    en: 'UNHCR Information',
    ms: 'Maklumat UNHCR'
  },
  education: {
    ar: 'التعليم',
    en: 'Education',
    ms: 'Pendidikan'
  },
  jobs: {
    ar: 'فرص العمل',
    en: 'Job Opportunities',
    ms: 'Peluang Pekerjaan'
  },
  photo_gallery: {
    ar: 'معرض الصور',
    en: 'Photo Gallery',
    ms: 'Galeri Foto'
  },
  quick_links: {
    ar: 'روابط سريعة',
    en: 'Quick Links',
    ms: 'Pautan Pantas'
  },
  contact_us: {
    ar: 'اتصل بنا',
    en: 'Contact Us',
    ms: 'Hubungi Kami'
  },
  follow_us: {
    ar: 'تابعنا',
    en: 'Follow Us',
    ms: 'Ikuti Kami'
  },
  refugee_support: {
    ar: 'دعم اللاجئين',
    en: 'Refugee Support',
    ms: 'Sokongan Pelarian'
  },
  asylum_seeker_guidance: {
    ar: 'إرشادات طالبي اللجوء',
    en: 'Asylum Seeker Guidance',
    ms: 'Panduan Pencari Suaka'
  },
  unhcr_registration: {
    ar: 'تسجيل المفوضية',
    en: 'UNHCR Registration',
    ms: 'Pendaftaran UNHCR'
  },
  legal_aid: {
    ar: 'المساعدة القانونية',
    en: 'Legal Aid',
    ms: 'Bantuan Guaman'
  }
};
