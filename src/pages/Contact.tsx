import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h1 className="text-5xl font-bold mb-6">{t('nav_contact')}</h1>
            <p className="text-xl text-zinc-500 mb-12">We're here to help. Reach out to us for any inquiries, support, or community feedback.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#CE1126]">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-zinc-500">info@syriancommunity.my</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#25D366]">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">WhatsApp Support</h3>
                  <p className="text-zinc-500">+60 12 345 6789</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#007A3D]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-zinc-500">Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-3xl overflow-hidden h-64 bg-zinc-100 border border-zinc-200">
              {/* Google Map Placeholder */}
              <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium">
                Google Map Integration
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[40px] shadow-2xl border border-zinc-100"
          >
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-600">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-600">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600">Subject</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20 resize-none"></textarea>
              </div>
              <button className="w-full bg-[#CE1126] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#A50E1E] transition-all shadow-lg shadow-[#CE1126]/20">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
