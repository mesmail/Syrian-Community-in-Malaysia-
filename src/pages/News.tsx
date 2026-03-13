import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar, User, Share2 } from 'lucide-react';

export function News() {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const newsSnap = await getDocs(query(collection(db, 'news'), orderBy('publishedAt', 'desc')));
      setNews(newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">{t('nav_news')}</h1>
          <p className="text-xl text-zinc-500">Stay updated with the latest community news and announcements.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#CE1126] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {news.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-6 group"
              >
                <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={item.image || 'https://picsum.photos/seed/news/1200/800'}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#CE1126]">
                    <span>{item.category || 'Community'}</span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                    <span className="text-zinc-400">{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-3xl font-bold group-hover:text-[#CE1126] transition-colors">
                    {item.title?.[language] || item.title?.en}
                  </h2>
                  <p className="text-zinc-500 leading-relaxed line-clamp-3">
                    {item.content?.[language] || item.content?.en}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <button className="text-sm font-bold border-b-2 border-[#CE1126] pb-1">Read More</button>
                    <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
                      <Share2 size={18} className="text-zinc-400" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
