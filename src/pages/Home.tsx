import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, ArrowRight, Calendar, MapPin, ChevronRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Home() {
  const { t, language, isRTL } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsSnap = await getDocs(query(collection(db, 'news'), orderBy('publishedAt', 'desc'), limit(3)));
      setNews(newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const eventsSnap = await getDocs(query(collection(db, 'events'), orderBy('date', 'asc'), limit(3)));
      setEvents(eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <img 
                src="https://i.ibb.co/99m0v2N/syrian-logo-correct.png" 
                alt="Syrian Community Logo" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(0,122,61,0.3)]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-1 bg-primary-red rounded-full" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary-red">
                {language === 'ar' ? 'أهلاً بكم في مجتمعنا' : 'Welcome to our community'}
              </span>
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-bold mb-8 leading-[0.9] tracking-tighter">
              {t('hero_title')}
            </h1>
            <p className="text-xl md:text-3xl mb-12 text-white/80 font-light leading-relaxed max-w-2xl">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/directory"
                className="bg-primary-red text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#A50E1E] transition-all transform hover:scale-105 shadow-2xl shadow-primary-red/30 active:scale-95"
              >
                {t('cta_join')}
              </Link>
              <Link
                to="/services"
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
              >
                {t('cta_explore')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats or Info */}
        <div className="absolute bottom-12 right-12 hidden lg:block z-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] max-w-xs"
          >
            <div className="text-primary-green font-bold text-4xl mb-2">10k+</div>
            <div className="text-white/60 text-xs uppercase tracking-widest font-bold">
              {language === 'ar' ? 'عضو في المجتمع' : 'Community Members'}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-white/40 leading-tight">
                {language === 'ar' ? 'انضم إلينا اليوم وكن جزءاً من عائلتنا' : 'Join us today and be part of our family'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('latest_news')}</h2>
              <div className="h-1 w-20 bg-[#CE1126] rounded-full" />
            </div>
            <Link to="/news" className="text-[#CE1126] font-bold flex items-center gap-1 group">
              View All <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.length > 0 ? news.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <img
                    src={item.image || 'https://picsum.photos/seed/news/800/500'}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#CE1126]">
                    {item.category || 'Announcement'}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#CE1126] transition-colors">
                  {item.title?.[language] || item.title?.en}
                </h3>
                <p className="text-zinc-500 line-clamp-2 text-sm mb-4">
                  {item.content?.[language] || item.content?.en}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <Calendar size={14} />
                  {new Date(item.publishedAt).toLocaleDateString()}
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 py-12 text-center text-zinc-400">No news available yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* Community Context Section */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-green rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-red rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-primary-green rounded-full" />
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary-green">
                  {language === 'ar' ? 'عن مجتمعنا' : 'Our Community'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
                {language === 'ar' 
                  ? 'دعم السوريين في ماليزيا' 
                  : 'Supporting Syrians in Malaysia'}
              </h2>
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  {language === 'ar'
                    ? 'تستضيف ماليزيا آلاف اللاجئين وطالبي اللجوء، بما في ذلك السوريين المسجلين لدى المفوضية السامية للأمم المتحدة لشؤون اللاجئين (UNHCR).'
                    : 'Malaysia hosts thousands of refugees and asylum seekers, including Syrians registered with the United Nations High Commissioner for Refugees (UNHCR).'}
                </p>
                <p>
                  {language === 'ar'
                    ? 'يشكل السوريون مجتمعاً صغيراً ولكنه نشط وحيوي ضمن مجتمع اللاجئين في ماليزيا. نحن هنا لنكون الجسر الذي يربطكم بالموارد والدعم اللازم.'
                    : 'Syrians form a smaller but active and vibrant community within the refugee population in Malaysia. We are here to be the bridge that connects you with the necessary resources and support.'}
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                  <div className="text-primary-green font-bold text-2xl mb-1">UNHCR</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">
                    {language === 'ar' ? 'دعم التسجيل' : 'Registration Support'}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                  <div className="text-primary-red font-bold text-2xl mb-1">Legal</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">
                    {language === 'ar' ? 'المساعدة القانونية' : 'Legal Assistance'}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000" 
                  alt="Community Support" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-green/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-red/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('nav_services')}</h2>
            <div className="h-1.5 w-24 bg-primary-red mx-auto rounded-full mb-6" />
            <p className="text-zinc-500 max-w-2xl mx-auto">{language === 'ar' ? 'نحن هنا لدعمك في كل خطوة من رحلتك في ماليزيا.' : 'We are here to support you in every step of your journey in Malaysia.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚖️', title: 'legal_aid', desc: 'legal_desc' },
              { icon: '🏢', title: 'unhcr_registration', desc: 'unhcr_desc' },
              { icon: '🎓', title: 'education', desc: 'edu_desc' }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-primary-red/20 hover:shadow-xl transition-all group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{t(service.title)}</h3>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                  {language === 'ar' 
                    ? 'نقدم معلومات شاملة ومحدثة لمساعدتك في فهم حقوقك والتعامل مع الإجراءات القانونية والمفوضية.' 
                    : 'We provide comprehensive and up-to-date information to help you understand your rights and navigate legal and UNHCR procedures.'}
                </p>
                <Link to="/services" className="text-primary-red font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  {language === 'ar' ? 'اقرأ المزيد' : 'Read More'} <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('upcoming_events')}</h2>
              <div className="h-1 w-20 bg-[#007A3D] rounded-full" />
            </div>
            <Link to="/events" className="text-[#007A3D] font-bold flex items-center gap-1 group">
              View Calendar <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.length > 0 ? events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <img
                    src={event.image || 'https://picsum.photos/seed/event/800/500'}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#007A3D] text-white px-3 py-1 rounded-lg text-xs font-bold">
                    {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    {event.title?.[language] || event.title?.en}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                    <MapPin size={14} />
                    {event.location?.[language] || event.location?.en}
                  </div>
                  <button className="w-full py-3 rounded-xl border border-zinc-200 text-sm font-bold hover:bg-zinc-50 transition-colors">
                    Event Details
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 py-12 text-center text-zinc-400">No upcoming events.</div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('photo_gallery')}</h2>
            <div className="h-1.5 w-24 bg-primary-green mx-auto rounded-full mb-6" />
            <p className="text-zinc-500 max-w-2xl mx-auto">{language === 'ar' ? 'لمحات من فعالياتنا ومناسباتنا المجتمعية في ماليزيا.' : 'Glimpses of our community events and gatherings in Malaysia.'}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative rounded-2xl overflow-hidden group cursor-pointer",
                  i === 1 || i === 6 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                )}
              >
                <img
                  src={`https://picsum.photos/seed/gallery${i}/800/800`}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-red/10 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Instagram size={24} className="text-white" />
                  </div>
                  <span className="font-bold tracking-widest uppercase text-sm text-white/60">@syrianinmy</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
                  {language === 'ar' 
                    ? 'تابعونا على إنستغرام' 
                    : 'Follow us on Instagram'}
                </h2>
                <p className="text-xl text-white/60 mb-10 leading-relaxed">
                  {language === 'ar'
                    ? 'انضم إلى أكثر من 1300 متابع وكن أول من يعرف عن فعالياتنا وأخبارنا اليومية.'
                    : 'Join over 1,300 followers and be the first to know about our daily news and upcoming events.'}
                </p>
                <a 
                  href="https://www.instagram.com/syrianinmy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-zinc-900 font-bold text-lg hover:bg-zinc-100 transition-all shadow-xl active:scale-95"
                >
                  {language === 'ar' ? 'متابعة الآن' : 'Follow Now'} <ArrowRight size={20} />
                </a>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-2xl group-hover:bg-white/10 transition-all duration-500" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://i.ibb.co/99m0v2N/syrian-logo-correct.png" 
                    alt="Instagram Profile" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className={cn(isRTL ? "text-right" : "text-left")}>
              <h2 className="text-4xl font-bold mb-4">{t('featured_businesses')}</h2>
              <div className={cn("h-1.5 w-24 bg-primary-green rounded-full", isRTL ? "mr-0" : "ml-0")} />
            </div>
            <p className="text-zinc-500 max-w-md text-center md:text-left">
              {language === 'ar' ? 'دعم رواد الأعمال والشركات المملوكة للمجتمع في ماليزيا.' : 'Supporting our local entrepreneurs and community-owned businesses in Malaysia.'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={`https://picsum.photos/seed/biz${i}/600/800`}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <div className="bg-primary-green/20 backdrop-blur-md border border-white/10 self-start px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-wider mb-2">
                    {language === 'ar' ? 'مطعم' : 'Restaurant'}
                  </div>
                  <h4 className="text-white font-bold text-lg leading-tight mb-1">Syrian Restaurant {i}</h4>
                  <p className="text-white/60 text-xs mb-4">Bukit Bintang, KL</p>
                  <Link to="/directory" className="text-white text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'} <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link 
              to="/directory" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 text-white font-bold hover:bg-zinc-800 transition-all shadow-xl"
            >
              {language === 'ar' ? 'استكشف الدليل الكامل' : 'Explore Full Directory'} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
