import { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowUp,
  MessageCircle,
  Dumbbell,
  Users,
  Trophy,
  HeartPulse,
  Zap,
  Target,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Constants
const GYM_NAME = "SM FITNESS GYM";
const GYM_NAME_HINDI = "सीएम फिटनेस जिम";
const PHONE = "+91 82377 99525";
const WHATSAPP_NUMBER = "918237799525";
const ADDRESS = "First Floor, Vishnu Apartment Phase-2, Near Don Bosco High School, Naigaon (East), Maharashtra 401208";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi, I am interested in joining SM Fitness Gym. Please share membership details.");

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for scroll tracking
  const sections = ['home', 'about', 'services', 'plans', 'gallery', 'contact'];

  useEffect(() => {
    // Show popup on load with delay
    const hasSeenPopup = sessionStorage.getItem('gym_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when popup or menu is open
  useEffect(() => {
    if (isPopupOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isPopupOpen, isMenuOpen]);

  const closePopup = () => {
    setIsPopupOpen(false);
    sessionStorage.setItem('gym_popup_seen', 'true');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="flex flex-col group cursor-pointer">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-red-600 leading-none group-hover:scale-105 transition-transform origin-left">SM FITNESS</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase">{GYM_NAME_HINDI}</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            {['Home', 'About', 'Services', 'Plans', 'Gallery', 'Contact'].map((item) => {
              const id = item.toLowerCase();
              return (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(id)}
                  className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative py-2 group ${activeSection === id ? 'text-red-600' : 'text-white/70 hover:text-white'}`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              );
            })}
            <button 
              onClick={openWhatsApp}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-lg shadow-red-600/20"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-10 p-6"
          >
            {['Home', 'About', 'Services', 'Plans', 'Gallery', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-black uppercase tracking-widest hover:text-red-600 transition-colors italic"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => { openWhatsApp(); setIsMenuOpen(false); }}
              className="bg-red-600 text-white px-12 py-5 rounded-full text-xl font-black uppercase tracking-widest shadow-2xl shadow-red-600/40"
            >
              Join Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Hero" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-1 w-16 bg-red-600" />
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-sm md:text-base">Naigaon's Elite Fitness Hub</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] mb-8 uppercase italic tracking-tighter">
              BE <span className="text-red-600">STRONGER</span><br />
              THAN YOUR <span className="text-red-600">EXCUSES</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl font-medium leading-relaxed opacity-80">
              Premium facility with world-class equipment and expert guidance. Start your transformation today at SM Fitness.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => scrollToSection('plans')}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full text-lg font-black uppercase tracking-widest transition-all transform hover:scale-105 flex items-center justify-center group shadow-2xl shadow-red-600/30"
              >
                Get Started <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href={`tel:${PHONE}`}
                className="border-2 border-white/20 hover:border-white hover:bg-white/5 text-white px-12 py-5 rounded-full text-lg font-black uppercase tracking-widest transition-all flex items-center justify-center backdrop-blur-md"
              >
                Call Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-red-600 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-red-600 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Members", value: "500+" },
              { label: "Expert Trainers", value: "10+" },
              { label: "Modern Machines", value: "50+" },
              { label: "Success Stories", value: "1000+" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl md:text-5xl font-black italic">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-neutral-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] md:aspect-video lg:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1571902251103-d71b4e60f24e?q=80&w=1974&auto=format&fit=crop" 
                  alt="Gym Interior" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="bg-red-600 p-6 rounded-2xl shadow-xl">
                    <Award size={40} className="text-white" />
                    <div className="mt-2 font-black uppercase italic text-sm">Est. 2018</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Legacy</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 italic leading-none">
                WE ARE <span className="text-red-600">SM FITNESS</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                Located in the heart of Naigaon East, SM Fitness Gym has been the premier destination for fitness enthusiasts for over 5 years. Our mission is to provide a high-energy environment where everyone can push their limits.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Elite Equipment", icon: <ShieldCheck className="text-red-600" /> },
                  { title: "Expert Guidance", icon: <Target className="text-red-600" /> },
                  { title: "Community Driven", icon: <Users className="text-red-600" /> },
                  { title: "Result Oriented", icon: <Trophy className="text-red-600" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="font-black text-gray-200 uppercase tracking-widest text-sm">{item.title}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => scrollToSection('contact')}
                className="mt-12 text-red-600 font-black uppercase tracking-widest text-sm flex items-center group hover:text-white transition-colors"
              >
                Learn More About Us <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-neutral-950 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">What We Offer</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase italic leading-none">OUR <span className="text-red-600">PROGRAMS</span></h2>
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-xs">
              Scientifically designed training programs to help you reach your peak performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Body Building", icon: <Dumbbell />, desc: "Focus on hypertrophy and muscle symmetry with our professional-grade equipment.", img: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=2070" },
              { title: "Cardio Blast", icon: <HeartPulse />, desc: "High-intensity cardiovascular training to improve heart health and burn fat.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" },
              { title: "Personal Coaching", icon: <Users />, desc: "Customized workout and nutrition plans with 1-on-1 attention from our experts.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070" },
              { title: "Strength & Power", icon: <Zap />, desc: "Build functional strength and explosive power for athletes and enthusiasts.", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070" },
              { title: "Weight Loss", icon: <Target />, desc: "Efficient fat-burning routines combined with sustainable lifestyle guidance.", img: "https://images.unsplash.com/photo-1574673139081-524e73bbca6c?q=80&w=1934" },
              { title: "Flexibility", icon: <HeartPulse />, desc: "Improve your range of motion and prevent injuries with mobility training.", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-neutral-900 aspect-[4/5] flex flex-col justify-end p-8 border border-white/5"
              >
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4 italic leading-none">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{service.desc}</p>
                  <button onClick={openWhatsApp} className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center group/btn">
                    Learn More <ChevronRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="py-32 bg-neutral-900 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Pricing</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic mb-6">MEMBERSHIP <span className="text-red-600">PLANS</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.2em] font-bold max-w-xl mx-auto">Flexible plans designed to fit your lifestyle and fitness goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {/* Basic Plan */}
            <motion.div 
              whileHover={{ y: -15 }}
              className="bg-neutral-950 p-10 rounded-[2.5rem] border border-white/5 flex flex-col h-full transition-all duration-500 hover:border-red-600/30"
            >
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase italic mb-2">Basic</h3>
                <div className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Monthly Access</div>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {["Gym Equipment Access", "Locker Facility", "Standard Timings", "Basic Support"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 text-gray-400">
                    <CheckCircle2 size={20} className="text-red-600 shrink-0" />
                    <span className="text-sm font-bold uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={openWhatsApp}
                className="w-full bg-neutral-800 hover:bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> Join Now
              </button>
            </motion.div>

            {/* Standard Plan */}
            <motion.div 
              whileHover={{ y: -15 }}
              className="bg-neutral-950 p-10 rounded-[2.5rem] border border-white/5 flex flex-col h-full transition-all duration-500 hover:border-red-600/30"
            >
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase italic mb-2">Standard</h3>
                <div className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Quarterly Plan</div>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {["Full Gym + Cardio", "Trainer Guidance", "Locker Facility", "Flexible Timings", "Progress Tracking"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 text-gray-400">
                    <CheckCircle2 size={20} className="text-red-600 shrink-0" />
                    <span className="text-sm font-bold uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={openWhatsApp}
                className="w-full bg-neutral-800 hover:bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> Join Now
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              whileHover={{ y: -15 }}
              className="bg-neutral-950 p-10 rounded-[2.5rem] border-2 border-red-600 flex flex-col h-full relative shadow-2xl shadow-red-600/10"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] whitespace-nowrap">
                Premium Choice
              </div>
              <div className="mb-10">
                <h3 className="text-3xl font-black uppercase italic mb-2">Premium</h3>
                <div className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Yearly Plan</div>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {["Personal Training", "Diet Consultation", "Full Access 24/7", "Shower & Spa", "Priority Support", "Guest Passes"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 text-gray-400">
                    <CheckCircle2 size={20} className="text-red-600 shrink-0" />
                    <span className="text-sm font-bold uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={openWhatsApp}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group shadow-xl shadow-red-600/20"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> Join Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-32 bg-red-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Dumbbell size={800} className="rotate-12 translate-x-1/4" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-white/70 font-black uppercase tracking-[0.3em] text-sm mb-4 block">The Difference</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase italic text-white mb-10 leading-[0.9]">
                WHY WORKOUT <br />WITH US?
              </h2>
              <div className="grid gap-8">
                {[
                  { title: "Elite Machines", desc: "Top-of-the-line equipment for maximum efficiency and safety." },
                  { title: "Expert Coaches", desc: "Our trainers are certified professionals with years of experience." },
                  { title: "Motivating Vibes", desc: "A community that pushes you to exceed your own expectations." },
                  { title: "Prime Location", desc: "Conveniently located in Naigaon East with ample parking." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-6 group"
                  >
                    <div className="bg-white text-red-600 p-4 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase italic text-white mb-2">{item.title}</h4>
                      <p className="text-white/80 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative">
              <motion.div 
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 3 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" 
                  alt="Gym Training" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-black/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-6">MEMBER <span className="text-red-600">VOICES</span></h2>
            <div className="flex justify-center items-center space-x-2 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
            </div>
            <p className="text-gray-500 uppercase tracking-widest font-black text-sm">4.4/5 Average Rating • 48+ Reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { name: "Rahul Sharma", review: "Best gym in Naigaon East. The equipment is well-maintained and the trainers are very helpful. Highly recommended!", rating: 5 },
              { name: "Priya Mishra", review: "I've been coming here for 6 months. The environment is safe and motivating for women. Great cardio section!", rating: 5 },
              { name: "Amit Kumar", review: "Affordable plans and great variety of machines. It gets a bit crowded in the evening but the vibes are amazing.", rating: 4 }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-900 p-10 rounded-[2rem] border border-white/5 relative flex flex-col"
              >
                <div className="flex text-yellow-500 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-8 text-lg leading-relaxed flex-grow">"{t.review}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-black text-xl italic">
                    {t.name.charAt(0)}
                  </div>
                  <div className="font-black uppercase tracking-widest text-red-600 text-sm">{t.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32 bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Visuals</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic mb-6">OUR <span className="text-red-600">SPACE</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070",
              "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
              "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=2070",
              "https://images.unsplash.com/photo-1574673139081-524e73bbca6c?q=80&w=1934",
              "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974",
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070",
              "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974"
            ].map((url, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="aspect-square overflow-hidden rounded-3xl bg-neutral-800 shadow-2xl cursor-pointer group"
              >
                <img 
                  src={url} 
                  alt={`Gym ${i}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Connect</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase italic mb-12 leading-none">GET IN <span className="text-red-600">TOUCH</span></h2>
              
              <div className="space-y-10 mb-16">
                <div className="flex items-start space-x-6">
                  <div className="bg-red-600 p-5 rounded-2xl text-white shadow-xl shadow-red-600/20">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest text-white mb-2 italic">Location</h4>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-sm">{ADDRESS}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-red-600 p-5 rounded-2xl text-white shadow-xl shadow-red-600/20">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest text-white mb-2 italic">Phone</h4>
                    <a href={`tel:${PHONE}`} className="text-gray-400 text-2xl font-black hover:text-red-600 transition-colors">{PHONE}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-red-600 p-5 rounded-2xl text-white shadow-xl shadow-red-600/20">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest text-white mb-2 italic">Working Hours</h4>
                    <p className="text-gray-400 text-lg">Daily: 6:00 AM — 10:30 PM</p>
                    <p className="text-red-600 text-sm font-bold mt-1 uppercase tracking-widest">Sunday: 8:00 AM — 12:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="rounded-[2.5rem] overflow-hidden h-80 border border-white/5 shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.468864706548!2d72.8465!3d19.3385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a95f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sSM%20FITNESS%20GYM!5e0!3m2!1sen!2sin!4v1711180000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-900 p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl"
            >
              <h3 className="text-3xl font-black uppercase italic mb-10">Send Us A Message</h3>
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); openWhatsApp(); }}>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-red-600 transition-all text-lg font-medium"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-red-600 transition-all text-lg font-medium"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Your Message</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-red-600 transition-all text-lg font-medium resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] shadow-xl shadow-red-600/20">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col mb-8">
                <span className="text-4xl font-black tracking-tighter text-red-600 leading-none">SM FITNESS</span>
                <span className="text-xs font-bold tracking-[0.4em] text-white/60 uppercase">{GYM_NAME_HINDI}</span>
              </div>
              <p className="text-gray-500 max-w-md mb-10 text-lg leading-relaxed">
                Empowering the community of Naigaon East since 2018. We provide the tools, the space, and the motivation. You provide the sweat.
              </p>
              <div className="flex space-x-6">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-2">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-black uppercase italic mb-8">Quick Navigation</h4>
              <ul className="space-y-5 text-gray-500">
                {['Home', 'About', 'Services', 'Plans', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <button onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-red-600 transition-colors uppercase text-xs font-black tracking-[0.2em]">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-black uppercase italic mb-8">Contact Details</h4>
              <ul className="space-y-6 text-gray-500">
                <li className="flex items-start space-x-4">
                  <MapPin size={20} className="text-red-600 mt-1 shrink-0" />
                  <span className="text-sm font-medium leading-relaxed">{ADDRESS}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Phone size={20} className="text-red-600 shrink-0" />
                  <span className="text-sm font-black tracking-widest">{PHONE}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
            <div>© {new Date().getFullYear()} {GYM_NAME}. ALL RIGHTS RESERVED.</div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[70] flex flex-col space-y-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-red-700 transition-all transform hover:scale-110 active:scale-95"
              aria-label="Scroll to top"
            >
              <ArrowUp size={28} />
            </motion.button>
          )}
        </AnimatePresence>
        <button 
          onClick={openWhatsApp}
          className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 active:scale-95 group relative"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 bg-black/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Chat with us
          </span>
        </button>
      </div>

      {/* Premium Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-neutral-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.2)] border border-white/10 flex flex-col md:flex-row"
            >
              <button 
                onClick={closePopup}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20 bg-black/20 p-2 rounded-full backdrop-blur-md"
                aria-label="Close Popup"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-2/5 bg-red-600 p-10 flex flex-col justify-center relative overflow-hidden">
                <Dumbbell size={200} className="absolute -right-20 -bottom-20 text-white/10 rotate-12" />
                <div className="relative z-10">
                  <h3 className="text-4xl font-black uppercase italic text-white leading-none mb-4">LIMITED <br />OFFER</h3>
                  <div className="h-1 w-12 bg-white mb-6" />
                  <p className="text-white/80 text-sm font-bold uppercase tracking-widest leading-relaxed">Join today and get a free personal training session!</p>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-10 md:p-12">
                <div className="mb-8">
                  <h4 className="text-2xl font-black uppercase italic text-white mb-2">Start Your Journey</h4>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Fill the form to get a call back</p>
                </div>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); closePopup(); openWhatsApp(); }}>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Your Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-neutral-800 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600 transition-colors text-sm font-medium"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-neutral-800 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600 transition-colors text-sm font-medium"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Fitness Goal</label>
                    <select className="w-full bg-neutral-800 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-red-600 transition-colors appearance-none text-sm font-medium cursor-pointer">
                      <option>Weight Loss</option>
                      <option>Muscle Gain</option>
                      <option>General Fitness</option>
                      <option>Strength Training</option>
                    </select>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all mt-4 transform hover:scale-[1.02] shadow-xl shadow-red-600/20">
                    Claim Offer Now
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
