import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export function About() {
  const { t, language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000"
            alt="About Hero"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-primary-green font-bold text-sm uppercase tracking-widest mb-6">
              <div className="w-12 h-1 bg-primary-green rounded-full" />
              {t('nav_about')}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
              {language === 'ar' ? 'قصتنا ورؤيتنا' : 'Our Story & Vision'}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              {language === 'ar' 
                ? 'دعم المجتمع السوري في ماليزيا من خلال التواصل والتمكين والاندماج.' 
                : 'Supporting the Syrian community in Malaysia through connection, empowerment, and integration.'}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32", isRTL ? "text-right" : "text-left")}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 tracking-tight">
                {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <div className={cn("h-1.5 w-24 bg-primary-red rounded-full mb-10", isRTL ? "mr-0" : "ml-0")} />
              <p className="text-zinc-600 mb-8 text-lg leading-relaxed">
                {language === 'ar' 
                  ? 'تأسست منصة المجتمع السوري في ماليزيا لتكون جسراً بين السوريين المقيمين في ماليزيا والموارد التي يحتاجونها للازدهار. مهمتنا هي تقديم معلومات دقيقة، وتعزيز الروابط الاجتماعية، ودعم النمو المهني والتعليمي لأعضاء مجتمعنا.' 
                  : 'The Syrian Community in Malaysia platform was established to serve as a bridge between Syrians living in Malaysia and the resources they need to thrive. Our mission is to provide accurate information, foster social connections, and support the professional and educational growth of our community members.'}
              </p>
              <p className="text-zinc-600 text-lg leading-relaxed italic border-l-4 border-primary-green pl-6 py-2">
                {language === 'ar' 
                  ? 'نحن نؤمن بقوة المجتمع وأهمية الاندماج مع الحفاظ على تراثنا الثقافي الغني.' 
                  : 'We believe in the power of community and the importance of integration while preserving our rich cultural heritage.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary-green/10 rounded-[3rem] -rotate-3" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                  alt="Community Meeting"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Social Support', ar: 'الدعم الاجتماعي', desc: 'Connecting families and individuals for mutual support and cultural preservation.' },
              { title: 'Professional Growth', ar: 'النمو المهني', desc: 'Helping Syrian professionals and business owners navigate the Malaysian market.' },
              { title: 'Educational Guidance', ar: 'التوجيه التعليمي', desc: 'Supporting students in finding opportunities and navigating the education system.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:bg-white hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary-green group-hover:text-white transition-all">
                  <span className="font-bold text-xl">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{language === 'ar' ? item.ar : item.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
