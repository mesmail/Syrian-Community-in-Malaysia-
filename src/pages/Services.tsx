import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Scale, GraduationCap, Briefcase, Languages, Users, Info, Building2 } from 'lucide-react';

export function Services() {
  const { t, language } = useLanguage();

  const services = [
    { icon: Scale, title: 'legal_aid', desc: 'Guidance on visas, residency, and legal rights for Syrians in Malaysia.' },
    { icon: Info, title: 'unhcr_registration', desc: 'Step-by-step guidance on UNHCR registration, card renewals, and interview preparation.' },
    { icon: Users, title: 'refugee_support', desc: 'Community-led support networks for refugees and asylum seekers in the community.' },
    { icon: GraduationCap, title: 'education', desc: 'Access to learning centers, university scholarships, and vocational training.' },
    { icon: Briefcase, title: 'jobs', desc: 'Resources for finding work opportunities and navigating the local labor market.' },
    { icon: Building2, title: 'nav_directory', desc: 'A comprehensive guide to Syrian-owned businesses and essential services.' },
    { icon: Languages, title: 'Translation Assistance', desc: 'Professional translation for legal, medical, and educational documents.' }
  ];

  return (
    <div className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary-red font-bold text-sm uppercase tracking-widest mb-4"
          >
            <div className="w-8 h-1 bg-primary-red rounded-full" />
            {t('nav_services')}
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
          </h1>
          <p className="text-xl text-zinc-500 leading-relaxed">
            {language === 'ar' 
              ? 'خدمات دعم شاملة مصممة خصيصاً للمجتمع السوري في ماليزيا، لمساعدتكم على الاستقرار والنجاح.' 
              : 'Comprehensive support services tailored for the Syrian community in Malaysia, helping you settle and succeed.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-8 bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/5 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:scale-150" />
              
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-red group-hover:text-white transition-all duration-500 shadow-inner">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-red transition-colors">{t(service.title) || service.title}</h3>
              <p className="text-zinc-500 leading-relaxed mb-8 text-sm">{service.desc}</p>
              <button className="text-sm font-bold text-primary-red flex items-center gap-2 group/btn">
                {language === 'ar' ? 'معرفة المزيد' : 'Learn More'} 
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
