import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Send, User as UserIcon, Calendar } from 'lucide-react';

export function TopicDetail() {
  const { topicId } = useParams();
  const { t } = useLanguage();
  const { user, login } = useAuth();
  const [topic, setTopic] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!topicId) return;
    const topicSnap = await getDoc(doc(db, 'forumTopics', topicId));
    if (topicSnap.exists()) {
      setTopic({ id: topicSnap.id, ...topicSnap.data() });
    }

    const replySnap = await getDocs(query(collection(db, 'forumReplies'), where('topicId', '==', topicId), orderBy('createdAt', 'asc')));
    setReplies(replySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [topicId]);

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !topicId || !newReply.trim()) return;

    await addDoc(collection(db, 'forumReplies'), {
      topicId,
      content: newReply,
      authorUid: user.uid,
      authorName: user.displayName || 'Anonymous',
      createdAt: new Date().toISOString()
    });

    await updateDoc(doc(db, 'forumTopics', topicId), {
      replyCount: increment(1)
    });

    setNewReply('');
    fetchData();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#CE1126] border-t-transparent rounded-full animate-spin" /></div>;
  if (!topic) return <div className="min-h-screen flex items-center justify-center">Topic not found.</div>;

  return (
    <div className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/forum" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#CE1126] mb-8 font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Forum
        </Link>

        {/* Main Topic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-zinc-100 mb-12"
        >
          <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>
          <div className="flex items-center gap-6 mb-8 text-sm text-zinc-400 border-b border-zinc-100 pb-6">
            <div className="flex items-center gap-2"><UserIcon size={16} /> <span className="font-bold text-zinc-600">{topic.authorName}</span></div>
            <div className="flex items-center gap-2"><Calendar size={16} /> {new Date(topic.createdAt).toLocaleString()}</div>
          </div>
          <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed whitespace-pre-wrap">
            {topic.content}
          </div>
        </motion.div>

        {/* Replies */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold px-4">{replies.length} {t('replies')}</h2>
          {replies.map((reply, idx) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4 text-xs text-zinc-400">
                <span className="font-bold text-zinc-600">{reply.authorName}</span>
                <span>•</span>
                <span>{new Date(reply.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Reply Form */}
        {user ? (
          <form onSubmit={handlePostReply} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Post a Reply</h3>
            <textarea
              required
              rows={4}
              value={newReply}
              onChange={e => setNewReply(e.target.value)}
              placeholder="Write your response..."
              className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20 resize-none mb-6"
            />
            <button type="submit" className="w-full bg-[#CE1126] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#A50E1E] transition-all">
              Post Reply <Send size={20} />
            </button>
          </form>
        ) : (
          <div className="bg-zinc-900 text-white p-8 rounded-3xl text-center">
            <p className="mb-4 font-medium">You must be logged in to reply to this discussion.</p>
            <button onClick={login} className="bg-[#CE1126] px-8 py-3 rounded-xl font-bold">Login Now</button>
          </div>
        )}
      </div>
    </div>
  );
}
