import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Building2, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle,
  Image as ImageIcon,
  Save
} from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { cn } from '../lib/utils';

export function Admin() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('news');

  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-8 border-b border-zinc-100">
          <h1 className="font-bold text-xl">Admin Panel</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <AdminNavItem icon={Newspaper} label="News" active={activeTab === 'news'} onClick={() => setActiveTab('news')} />
          <AdminNavItem icon={Calendar} label="Events" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <AdminNavItem icon={Building2} label="Directory" active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} />
          <AdminNavItem icon={Settings} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        {activeTab === 'news' && <NewsManager />}
        {activeTab === 'events' && <EventManager />}
        {activeTab === 'directory' && <DirectoryManager />}
        {activeTab === 'services' && <ServiceManager />}
      </main>
    </div>
  );
}

function AdminNavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
        active ? "bg-[#CE1126] text-white shadow-lg shadow-[#CE1126]/20" : "text-zinc-500 hover:bg-zinc-100"
      )}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}

// --- Managers ---

function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: '', title_en: '', title_ms: '',
    content_ar: '', content_en: '', content_ms: '',
    image: '', category: 'Announcement'
  });

  const fetchNews = async () => {
    const snap = await getDocs(query(collection(db, 'news'), orderBy('publishedAt', 'desc')));
    setNews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchNews(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'news'), {
      title: { ar: formData.title_ar, en: formData.title_en, ms: formData.title_ms },
      content: { ar: formData.content_ar, en: formData.content_en, ms: formData.content_ms },
      image: formData.image,
      category: formData.category,
      publishedAt: new Date().toISOString()
    });
    setIsAdding(false);
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'news', id));
      fetchNews();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage News</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          <Plus size={20} /> {isAdding ? 'Cancel' : 'Add News'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Input label="Title (Arabic)" value={formData.title_ar} onChange={v => setFormData({...formData, title_ar: v})} />
            <Input label="Title (English)" value={formData.title_en} onChange={v => setFormData({...formData, title_en: v})} />
            <Input label="Title (Malay)" value={formData.title_ms} onChange={v => setFormData({...formData, title_ms: v})} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <TextArea label="Content (Arabic)" value={formData.content_ar} onChange={v => setFormData({...formData, content_ar: v})} />
            <TextArea label="Content (English)" value={formData.content_en} onChange={v => setFormData({...formData, content_en: v})} />
            <TextArea label="Content (Malay)" value={formData.content_ms} onChange={v => setFormData({...formData, content_ms: v})} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input label="Image URL" value={formData.image} onChange={v => setFormData({...formData, image: v})} />
            <Input label="Category" value={formData.category} onChange={v => setFormData({...formData, category: v})} />
          </div>
          <button type="submit" className="bg-[#CE1126] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
            <Save size={20} /> Publish News
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {news.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-zinc-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{item.title?.en}</h3>
              <p className="text-sm text-zinc-400">{new Date(item.publishedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: '', title_en: '', title_ms: '',
    desc_ar: '', desc_en: '', desc_ms: '',
    loc_ar: '', loc_en: '', loc_ms: '',
    date: '', image: '', category: 'Cultural'
  });

  const fetchEvents = async () => {
    const snap = await getDocs(query(collection(db, 'events'), orderBy('date', 'asc')));
    setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'events'), {
      title: { ar: formData.title_ar, en: formData.title_en, ms: formData.title_ms },
      description: { ar: formData.desc_ar, en: formData.desc_en, ms: formData.desc_ms },
      location: { ar: formData.loc_ar, en: formData.loc_en, ms: formData.loc_ms },
      date: formData.date,
      image: formData.image,
      category: formData.category
    });
    setIsAdding(false);
    fetchEvents();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Events</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> {isAdding ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Input label="Title (Arabic)" value={formData.title_ar} onChange={v => setFormData({...formData, title_ar: v})} />
            <Input label="Title (English)" value={formData.title_en} onChange={v => setFormData({...formData, title_en: v})} />
            <Input label="Title (Malay)" value={formData.title_ms} onChange={v => setFormData({...formData, title_ms: v})} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Input label="Location (Arabic)" value={formData.loc_ar} onChange={v => setFormData({...formData, loc_ar: v})} />
            <Input label="Location (English)" value={formData.loc_en} onChange={v => setFormData({...formData, loc_en: v})} />
            <Input label="Location (Malay)" value={formData.loc_ms} onChange={v => setFormData({...formData, loc_ms: v})} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input label="Date & Time" type="datetime-local" value={formData.date} onChange={v => setFormData({...formData, date: v})} />
            <Input label="Image URL" value={formData.image} onChange={v => setFormData({...formData, image: v})} />
          </div>
          <button type="submit" className="bg-[#007A3D] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
            <Save size={20} /> Create Event
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-2xl border border-zinc-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{event.title?.en}</h3>
              <p className="text-sm text-zinc-400">{new Date(event.date).toLocaleString()}</p>
            </div>
            <button onClick={async () => { await deleteDoc(doc(db, 'events', event.id)); fetchEvents(); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectoryManager() {
  const [businesses, setBusinesses] = useState<any[]>([]);

  const fetchBusinesses = async () => {
    const snap = await getDocs(collection(db, 'businesses'));
    setBusinesses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchBusinesses(); }, []);

  const toggleApproval = async (id: string, current: boolean) => {
    await updateDoc(doc(db, 'businesses', id), { approved: !current });
    fetchBusinesses();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Business Directory</h2>
      <div className="grid grid-cols-1 gap-4">
        {businesses.map(biz => (
          <div key={biz.id} className="bg-white p-6 rounded-2xl border border-zinc-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{biz.name}</h3>
              <p className="text-sm text-zinc-400">{biz.category} • {biz.location}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold", biz.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                {biz.approved ? 'Approved' : 'Pending'}
              </span>
              <button
                onClick={() => toggleApproval(biz.id, biz.approved)}
                className={cn("p-2 rounded-lg transition-colors", biz.approved ? "text-red-500 hover:bg-red-50" : "text-green-500 hover:bg-green-50")}
              >
                {biz.approved ? <XCircle size={20} /> : <CheckCircle size={20} />}
              </button>
              <button onClick={async () => { await deleteDoc(doc(db, 'businesses', biz.id)); fetchBusinesses(); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceManager() {
  const [services, setServices] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: '', title_en: '', title_ms: '',
    desc_ar: '', desc_en: '', desc_ms: '',
    icon: 'Info', category: 'General'
  });

  const fetchServices = async () => {
    const snap = await getDocs(collection(db, 'services'));
    setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchServices(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'services'), {
      title: { ar: formData.title_ar, en: formData.title_en, ms: formData.title_ms },
      description: { ar: formData.desc_ar, en: formData.desc_en, ms: formData.desc_ms },
      icon: formData.icon,
      category: formData.category
    });
    setIsAdding(false);
    fetchServices();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Services</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> {isAdding ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Input label="Title (Arabic)" value={formData.title_ar} onChange={v => setFormData({...formData, title_ar: v})} />
            <Input label="Title (English)" value={formData.title_en} onChange={v => setFormData({...formData, title_en: v})} />
            <Input label="Title (Malay)" value={formData.title_ms} onChange={v => setFormData({...formData, title_ms: v})} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <TextArea label="Description (Arabic)" value={formData.desc_ar} onChange={v => setFormData({...formData, desc_ar: v})} />
            <TextArea label="Description (English)" value={formData.desc_en} onChange={v => setFormData({...formData, desc_en: v})} />
            <TextArea label="Description (Malay)" value={formData.desc_ms} onChange={v => setFormData({...formData, desc_ms: v})} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input label="Icon Name (Lucide)" value={formData.icon} onChange={v => setFormData({...formData, icon: v})} />
            <Input label="Category" value={formData.category} onChange={v => setFormData({...formData, category: v})} />
          </div>
          <button type="submit" className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
            <Save size={20} /> Save Service
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-2xl border border-zinc-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{service.title?.en}</h3>
              <p className="text-sm text-zinc-400">{service.category}</p>
            </div>
            <button onClick={async () => { await deleteDoc(doc(db, 'services', service.id)); fetchServices(); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- UI Components ---

function Input({ label, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#CE1126]/20 resize-none"
      />
    </div>
  );
}


