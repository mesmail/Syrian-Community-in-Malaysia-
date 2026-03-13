import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { MessageSquare, Plus, ChevronRight, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Forum() {
  const { t, language } = useLanguage();
  const { user, login } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchData = async () => {
      const catSnap = await getDocs(collection(db, 'forumCategories'));
      const cats = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);

      let topicQuery = query(collection(db, 'forumTopics'), orderBy('createdAt', 'desc'));
      if (activeCategory) {
        topicQuery = query(collection(db, 'forumTopics'), where('categoryId', '==', activeCategory), orderBy('createdAt', 'desc'));
      }
      const topicSnap = await getDocs(topicQuery);
      setTopics(topicSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchData();
  }, [activeCategory]);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activeCategory) return;

    await addDoc(collection(db, 'forumTopics'), {
      title: formData.title,
      content: formData.content,
      categoryId: activeCategory,
      authorUid: user.uid,
      authorName: user.displayName || 'Anonymous',
      createdAt: new Date().toISOString(),
      replyCount: 0
    });

    setFormData({ title: '', content: '' });
    setIsAdding(false);
    // Refresh topics
    const topicQuery = query(collection(db, 'forumTopics'), where('categoryId', '==', activeCategory), orderBy('createdAt', 'desc'));
    const topicSnap = await getDocs(topicQuery);
    setTopics(topicSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">{t('forum_title')}</h1>
            <p className="text-xl text-zinc-500">{t('forum_subtitle')}</p>
          </div>
          {user ? (
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-[#CE1126] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#CE1126]/20"
            >
              <Plus size={20} /> {isAdding ? 'Cancel' : t('create_topic')}
            </button>
          ) : (
            <button onClick={login} className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold">
              Login to Post
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl font-bold transition-all",
                !activeCategory ? "bg-white shadow-sm text-[#CE1126]" : "text-zinc-500 hover:bg-zinc-100"
              )}
            >
              All Discussions
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl font-bold transition-all",
                  activeCategory === cat.id ? "bg-white shadow-sm text-[#CE1126]" : "text-zinc-500 hover:bg-zinc-100"
                )}
              >
                {cat.name?.[language] || cat.name?.en}
              </button>
            ))}
          </div>

          {/* Topics List */}
          <div className="lg:col-span-3 space-y-6">
            {isAdding && activeCategory && (
              <motion.form
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCreateTopic}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Topic Title</label>
                  <input
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Content</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20 resize-none"
                  />
                </div>
                <button type="submit" className="bg-[#CE1126] text-white px-8 py-4 rounded-xl font-bold">
                  Post Discussion
                </button>
              </motion.form>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#CE1126] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : topics.length > 0 ? (
              topics.map(topic => (
                <Link
                  key={topic.id}
                  to={`/forum/${topic.id}`}
                  className="block bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#CE1126] transition-colors">{topic.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-1"><UserIcon size={14} /> {topic.authorName}</span>
                        <span>•</span>
                        <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-zinc-400">
                      <MessageSquare size={20} />
                      <span className="text-xs font-bold">{topic.replyCount || 0}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center">
                <p className="text-zinc-400">No discussions found in this category.</p>
                {!activeCategory && <p className="text-sm text-zinc-400 mt-2">Select a category to start a discussion.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
