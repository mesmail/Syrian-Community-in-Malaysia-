import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Globe, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function Navbar() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, isAdmin, login, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_services'), path: '/services' },
    { name: t('nav_forum'), path: '/forum' },
    { name: t('nav_news'), path: '/news' },
    { name: t('nav_events'), path: '/events' },
    { name: t('nav_directory'), path: '/directory' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-primary-green text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
        {language === 'ar' 
          ? 'نحن هنا لدعمكم - تواصلوا معنا لأي استفسار أو مساعدة' 
          : 'We are here to support you - Contact us for any inquiries or assistance'}
      </div>
      
      <nav className="bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary-green/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <img 
                  src="https://i.ibb.co/99m0v2N/syrian-logo-correct.png" 
                  alt="Logo" 
                  className="relative w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl tracking-tight block leading-none group-hover:text-primary-green transition-colors">
                  {t('hero_title')}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 block">
                  {language === 'ar' ? 'في ماليزيا' : 'In Malaysia'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#CE1126]",
                  location.pathname === item.path ? "text-[#CE1126]" : "text-zinc-600"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center gap-4 border-l border-zinc-200 pl-4 ml-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage('ar')}
                  className={cn("text-xs font-bold px-2 py-1 rounded", language === 'ar' ? "bg-[#CE1126] text-white" : "text-zinc-500")}
                >
                  عربي
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn("text-xs font-bold px-2 py-1 rounded", language === 'en' ? "bg-[#CE1126] text-white" : "text-zinc-500")}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ms')}
                  className={cn("text-xs font-bold px-2 py-1 rounded", language === 'ms' ? "bg-[#CE1126] text-white" : "text-zinc-500")}
                >
                  MS
                </button>
              </div>

              {user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link to="/admin" className="p-2 text-zinc-600 hover:text-[#CE1126] transition-colors">
                      <LayoutDashboard size={20} />
                    </Link>
                  )}
                  <Link to="/profile" className="p-2 text-zinc-600 hover:text-[#CE1126] transition-colors">
                    <User size={20} />
                  </Link>
                  <button onClick={logout} className="p-2 text-zinc-600 hover:text-[#CE1126] transition-colors">
                    <LogOut size={20} />
                  </button>
                  <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-zinc-200" />
                </div>
              ) : (
                <button
                  onClick={login}
                  className="bg-[#CE1126] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#A50E1E] transition-colors"
                >
                  {t('cta_join')}
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-600 hover:text-[#CE1126]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === item.path ? "text-[#CE1126] bg-zinc-50" : "text-zinc-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex items-center gap-4">
                <button onClick={() => setLanguage('ar')} className="text-sm font-bold">عربي</button>
                <button onClick={() => setLanguage('en')} className="text-sm font-bold">English</button>
                <button onClick={() => setLanguage('ms')} className="text-sm font-bold">Malay</button>
              </div>
              <div className="pt-4">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full" />
                      <span className="text-sm font-medium">{user.displayName}</span>
                    </div>
                    <button onClick={logout} className="text-zinc-600"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="w-full bg-[#CE1126] text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {t('cta_join')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
