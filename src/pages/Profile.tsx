import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User, Mail, Calendar, Trash2, MessageSquare } from 'lucide-react';

export function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { t, language } = useLanguage();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const regSnap = await getDocs(query(collection(db, 'eventRegistrations'), where('uid', '==', user.uid)));
      const regs = regSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      
      // Fetch event details for each registration
      const regsWithDetails = await Promise.all(regs.map(async (reg) => {
        const eventDoc = await getDocs(query(collection(db, 'events'), where('__name__', '==', reg.eventId)));
        const eventData = eventDoc.docs[0]?.data();
        return { ...reg, event: eventData };
      }));
      setRegistrations(regsWithDetails);

      const topicSnap = await getDocs(query(collection(db, 'forumTopics'), where('authorUid', '==', user.uid)));
      setTopics(topicSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      setLoading(false);
    };

    if (user) fetchData();
  }, [user]);

  if (authLoading || (user && loading)) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#CE1126] border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">Please login to view your profile.</div>;

  return (
    <div className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* User Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-zinc-100 text-center"
            >
              <img src={user.photoURL || ''} alt="" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-zinc-50" />
              <h1 className="text-2xl font-bold mb-2">{user.displayName}</h1>
              <p className="text-zinc-500 flex items-center justify-center gap-2 mb-8">
                <Mail size={16} /> {user.email}
              </p>
              <div className="pt-6 border-t border-zinc-50 flex justify-around text-sm font-bold">
                <div>
                  <div className="text-[#CE1126] text-xl">{topics.length}</div>
                  <div className="text-zinc-400 uppercase tracking-wider text-[10px]">Topics</div>
                </div>
                <div>
                  <div className="text-[#007A3D] text-xl">{registrations.length}</div>
                  <div className="text-zinc-400 uppercase tracking-wider text-[10px]">Events</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Activity */}
          <div className="lg:col-span-2 space-y-12">
            {/* Event Registrations */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-[#007A3D]" /> My Event Registrations
              </h2>
              <div className="space-y-4">
                {registrations.length > 0 ? registrations.map(reg => (
                  <div key={reg.id} className="bg-white p-6 rounded-3xl border border-zinc-100 flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="font-bold">{reg.event?.title?.[language] || reg.event?.title?.en}</h3>
                      <p className="text-sm text-zinc-400">
                        {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : 'Date TBD'}
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm('Cancel registration?')) {
                          await deleteDoc(doc(db, 'eventRegistrations', reg.id));
                          setRegistrations(registrations.filter(r => r.id !== reg.id));
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )) : (
                  <p className="text-zinc-400 bg-white p-8 rounded-3xl border border-zinc-100 text-center">No event registrations yet.</p>
                )}
              </div>
            </section>

            {/* Forum Topics */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare size={24} className="text-[#CE1126]" /> My Forum Topics
              </h2>
              <div className="space-y-4">
                {topics.length > 0 ? topics.map(topic => (
                  <div key={topic.id} className="bg-white p-6 rounded-3xl border border-zinc-100 flex justify-between items-center shadow-sm">
                    <div>
                      <h3 className="font-bold">{topic.title}</h3>
                      <p className="text-sm text-zinc-400">{new Date(topic.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm('Delete topic?')) {
                          await deleteDoc(doc(db, 'forumTopics', topic.id));
                          setTopics(topics.filter(t => t.id !== topic.id));
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )) : (
                  <p className="text-zinc-400 bg-white p-8 rounded-3xl border border-zinc-100 text-center">No forum topics yet.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
