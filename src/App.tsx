import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Forum } from './pages/Forum';
import { TopicDetail } from './pages/TopicDetail';
import { News } from './pages/News';
import { Events } from './pages/Events';
import { Directory } from './pages/Directory';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/:topicId" element={<TopicDetail />} />
                <Route path="/news" element={<News />} />
                <Route path="/events" element={<Events />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle size={28} />
            </a>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
