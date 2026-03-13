import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

export function Footer() {
  const { t, isRTL, language } = useLanguage();

  return (
    <footer className="bg-dark-bg text-zinc-400 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-16", isRTL ? "text-right" : "text-left")}>
          
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className={cn("flex items-center gap-4 mb-8 group", isRTL ? "flex-row-reverse" : "flex-row")}>
              <img 
                src="https://i.ibb.co/99m0v2N/syrian-logo-correct.png" 
                alt="Logo" 
                className="w-20 h-20 object-contain transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-white font-bold text-xl leading-tight group-hover:text-primary-green transition-colors">{t('hero_title')}</h2>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{language === 'ar' ? 'في ماليزيا' : 'In Malaysia'}</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              {t('hero_subtitle')}
            </p>
            <div className={cn("flex gap-4", isRTL ? "justify-end" : "justify-start")}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-green hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-green hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="https://www.instagram.com/syrianinmy/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-green hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-green hover:text-white transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8">{t('quick_links')}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-primary-green transition-colors">{t('nav_about')}</Link></li>
              <li><Link to="/news" className="hover:text-primary-green transition-colors">{t('nav_news')}</Link></li>
              <li><Link to="/services" className="hover:text-primary-green transition-colors">{t('nav_services')}</Link></li>
              <li><Link to="/events" className="hover:text-primary-green transition-colors">{t('nav_events')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary-green transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-8">{t('contact_us')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ul className="space-y-6 text-sm">
                <li className={cn("flex items-center gap-4", isRTL ? "flex-row-reverse" : "flex-row")}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-green"><Mail size={18} /></div>
                  <span>info@syrian.my</span>
                </li>
                <li className={cn("flex items-center gap-4", isRTL ? "flex-row-reverse" : "flex-row")}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-green"><Phone size={18} /></div>
                  <span dir="ltr">+60 11-1234-5678</span>
                </li>
                <li className={cn("flex items-center gap-4", isRTL ? "flex-row-reverse" : "flex-row")}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-green"><MapPin size={18} /></div>
                  <span>{language === 'ar' ? 'كوالالمبور، ماليزيا' : 'Kuala Lumpur, Malaysia'}</span>
                </li>
              </ul>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold mb-4 text-sm">{t('follow_us')}</h4>
                <p className="text-xs text-zinc-500 mb-4">{language === 'ar' ? 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات.' : 'Subscribe to our newsletter for the latest updates.'}</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'} 
                    className="bg-white/10 border-none rounded-lg px-4 py-2 text-xs flex-grow focus:ring-1 focus:ring-primary-green outline-none text-white"
                  />
                  <button className="bg-primary-green text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all">
                    {language === 'ar' ? 'ارسال' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {t('hero_title')}. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
