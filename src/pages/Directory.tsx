import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, MapPin, Phone, MessageCircle, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

export function Directory() {
  const { t, language } = useLanguage();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBusinesses = async () => {
      const q = query(collection(db, 'businesses'), where('approved', '==', true));
      const snap = await getDocs(q);
      setBusinesses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchBusinesses();
  }, []);

  const categories = ['all', 'Restaurant', 'Grocery', 'Services', 'Freelancers'];

  return (
    <div className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary-green font-bold text-sm uppercase tracking-widest mb-4"
            >
              <div className="w-8 h-1 bg-primary-green rounded-full" />
              {t('nav_directory')}
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">{t('nav_directory')}</h1>
            <p className="text-xl text-zinc-500 leading-relaxed">
              {language === 'ar' 
                ? 'اكتشف وادعم الشركات والخدمات المملوكة للسوريين في ماليزيا.' 
                : 'Discover and support Syrian-owned businesses and services in Malaysia.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm",
                  filter === cat 
                    ? "bg-primary-green text-white scale-105 shadow-primary-green/20" 
                    : "bg-white text-zinc-600 hover:bg-zinc-100"
                )}
              >
                {cat === 'all' ? (language === 'ar' ? 'الكل' : 'All') : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-16">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-400" size={24} />
          <input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن شركات، خدمات، أو مواقع...' : 'Search businesses, services, or locations...'}
            className="w-full pl-20 pr-10 py-8 rounded-[2.5rem] bg-white border-none shadow-xl shadow-zinc-200/50 focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all text-xl font-medium"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {businesses.length > 0 ? businesses.filter(b => filter === 'all' || b.category === filter).map((biz, idx) => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-zinc-100/50"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={biz.images?.[0] || 'https://picsum.photos/seed/biz/800/600'}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary-green uppercase tracking-wider shadow-sm">
                    {biz.category}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-green transition-colors">{biz.name}</h3>
                  <p className="text-zinc-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {biz.description?.[language] || biz.description?.en}
                  </p>
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 text-sm text-zinc-600">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-primary-green/10 group-hover:text-primary-green transition-colors">
                        <MapPin size={18} />
                      </div>
                      {biz.location}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={`https://wa.me/${biz.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow bg-[#25D366] text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg shadow-[#25D366]/20 active:scale-95"
                    >
                      <MessageCircle size={22} /> {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                    </a>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-32 text-center">
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Building2Icon size={48} className="text-zinc-200" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-400 mb-2">
                  {language === 'ar' ? 'لا توجد أعمال مدرجة بعد' : 'No businesses listed yet'}
                </h3>
                <p className="text-zinc-400 max-w-xs mx-auto">
                  {language === 'ar' ? 'كن أول من يدرج عمله في دليل مجتمعنا.' : 'Be the first to list your business in our community directory.'}
                </p>
                <button className="mt-10 bg-primary-green text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary-green/20 hover:scale-105 transition-all">
                  {language === 'ar' ? 'أضف عملك الآن' : 'Add Your Business'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Building2({ size, className }: { size: number, className: string }) {
  return <Building2Icon size={size} className={className} />;
}
import { Building2 as Building2Icon } from 'lucide-react';
