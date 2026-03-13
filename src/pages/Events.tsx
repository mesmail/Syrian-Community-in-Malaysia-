import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy, getDocs, addDoc, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar, MapPin, Clock, ExternalLink, CheckCircle2, X } from 'lucide-react';

export function Events() {
  const { t, language } = useLanguage();
  const { user, login } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const fetchData = async () => {
    const eventsSnap = await getDocs(query(collection(db, 'events'), orderBy('date', 'asc')));
    const eventsData = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEvents(eventsData);

    if (user) {
      const regSnap = await getDocs(query(collection(db, 'eventRegistrations'), where('uid', '==', user.uid)));
      setRegistrations(regSnap.docs.map(doc => doc.data().eventId));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleRegister = async (eventId: string) => {
    if (!user) {
      login();
      return;
    }

    setRegisteringId(eventId);
    try {
      await addDoc(collection(db, 'eventRegistrations'), {
        eventId,
        uid: user.uid,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        registeredAt: new Date().toISOString(),
        language
      });
      setRegistrations([...registrations, eventId]);
      alert(t('registration_success'));
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <div className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary-green font-bold text-sm uppercase tracking-widest mb-4"
          >
            <div className="w-8 h-1 bg-primary-green rounded-full" />
            {t('nav_events')}
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">{t('nav_events')}</h1>
          <p className="text-xl text-zinc-500 leading-relaxed">
            {language === 'ar' 
              ? 'انضم إلى لقاءاتنا المجتمعية، والفعاليات الثقافية، وورش العمل.' 
              : 'Join our community gatherings, cultural events, and workshops.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            {events.length > 0 ? events.map((event, idx) => {
              const isRegistered = registrations.includes(event.id);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-zinc-100/50 flex flex-col lg:flex-row gap-10 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="w-full lg:w-80 h-64 rounded-[2rem] overflow-hidden flex-shrink-0 relative">
                    <img
                      src={event.image || 'https://picsum.photos/seed/event/800/500'}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-lg">
                      <div className="text-primary-green font-bold text-xl leading-none">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 bg-zinc-50 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-100">
                          {event.category || 'Community'}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4 group-hover:text-primary-green transition-colors">
                        {event.title?.[language] || event.title?.en}
                      </h2>
                      <p className="text-zinc-500 text-base mb-8 leading-relaxed max-w-2xl">
                        {event.description?.[language] || event.description?.en}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="text-primary-green font-bold text-sm hover:underline flex items-center gap-2 mb-6"
                      >
                        {language === 'ar' ? 'اقرأ المزيد' : 'Read More'} →
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-8 text-sm font-medium text-zinc-600">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-primary-green">
                          <Calendar size={18} />
                        </div>
                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-primary-green">
                          <Clock size={18} />
                        </div>
                        {new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-primary-green">
                          <MapPin size={18} />
                        </div>
                        {event.location?.[language] || event.location?.en}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center lg:border-l lg:border-zinc-100 lg:pl-10" onClick={(e) => e.stopPropagation()}>
                    {isRegistered ? (
                      <div className="flex items-center gap-3 text-primary-green font-bold px-10 py-5 bg-primary-green/5 rounded-[1.5rem] border border-primary-green/10">
                        <CheckCircle2 size={24} /> 
                        {language === 'ar' ? 'تم التسجيل' : 'Registered'}
                      </div>
                    ) : (
                      <button
                        disabled={registeringId === event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event.id);
                        }}
                        className="w-full lg:w-auto px-10 py-5 bg-zinc-900 text-white rounded-[1.5rem] font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 active:scale-95 disabled:opacity-50"
                      >
                        {registeringId === event.id ? (language === 'ar' ? 'جاري التسجيل...' : 'Registering...') : t('register_event')}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            }) : (
              <div className="py-32 text-center bg-white rounded-[2.5rem] border border-zinc-100">
                <Calendar size={48} className="text-zinc-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-zinc-400">
                  {language === 'ar' ? 'لا توجد فعاليات قادمة' : 'No upcoming events'}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-zinc-500 hover:text-primary-red transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto">
                <div className="h-64 sm:h-96 relative">
                  <img
                    src={selectedEvent.image || 'https://picsum.photos/seed/event/1200/800'}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                        {selectedEvent.category || 'Community'}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                      {selectedEvent.title?.[language] || selectedEvent.title?.en}
                    </h2>
                  </div>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary-green rounded-full" />
                        {language === 'ar' ? 'عن الفعالية' : 'About the Event'}
                      </h3>
                      <p className="text-zinc-600 text-lg leading-relaxed whitespace-pre-wrap">
                        {selectedEvent.description?.[language] || selectedEvent.description?.en}
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                        <h4 className="font-bold mb-6 text-zinc-900">
                          {language === 'ar' ? 'تفاصيل الموقع والوقت' : 'Location & Time Details'}
                        </h4>
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-green shadow-sm">
                              <Calendar size={18} />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                {language === 'ar' ? 'التاريخ' : 'Date'}
                              </div>
                              <div className="text-sm font-bold text-zinc-700">
                                {new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-green shadow-sm">
                              <Clock size={18} />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                {language === 'ar' ? 'الوقت' : 'Time'}
                              </div>
                              <div className="text-sm font-bold text-zinc-700">
                                {new Date(selectedEvent.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-green shadow-sm">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                {language === 'ar' ? 'الموقع' : 'Location'}
                              </div>
                              <div className="text-sm font-bold text-zinc-700">
                                {selectedEvent.location?.[language] || selectedEvent.location?.en}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        {registrations.includes(selectedEvent.id) ? (
                          <div className="w-full flex items-center justify-center gap-3 text-primary-green font-bold py-5 bg-primary-green/5 rounded-2xl border border-primary-green/10">
                            <CheckCircle2 size={24} /> 
                            {language === 'ar' ? 'تم التسجيل بنجاح' : 'Successfully Registered'}
                          </div>
                        ) : (
                          <button
                            disabled={registeringId === selectedEvent.id}
                            onClick={() => handleRegister(selectedEvent.id)}
                            className="w-full py-5 bg-primary-red text-white rounded-2xl font-bold hover:bg-primary-red/90 transition-all shadow-xl shadow-primary-red/20 active:scale-95 disabled:opacity-50"
                          >
                            {registeringId === selectedEvent.id ? (language === 'ar' ? 'جاري التسجيل...' : 'Registering...') : t('register_event')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
