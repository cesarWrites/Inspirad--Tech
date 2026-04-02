'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Database, BarChart3, Shield, Zap, Users, BookOpen, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'services', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const services = [
    {
      icon: Shield,
      title: "Data Governance & Data Managenent",
      description: "Establish robust frameworks for data quality, security, and compliance across your organization.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Data Collection & Visualization",
      description: "Transform raw data into actionable insights with cutting-edge collection and visualization tools.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics Dashboards",
      description: "Monitor your business metrics in real-time with custom, interactive dashboard solutions.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Streamline your reporting processes with intelligent automation that saves time and reduces errors.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Digital Literacy Training",
      description: "Empower your teams with comprehensive digital literacy programs tailored to your industry.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: BookOpen,
      title: "IT Consulting",
      description: "Allow us to take on the task of designing and inplementing IT Solutions to solve your business needs.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
  ] as const;
  
  type FieldName = typeof fields[number]['name'];
  
  type FormFields = Record<FieldName | 'message', string>;

  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    message: '',
  });
  
  const [formFocused, setFormFocused] = useState<Record<keyof FormFields, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <Database className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Inspirad
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-300 hover:text-cyan-400 ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
               <Link 
    href="/blog"
    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
  >
    Blog
  </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-slate-900`}>
          <div className="px-4 py-4 space-y-3">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
              >
                {item}
              </button>
            ))}
              <Link 
      href="/blog"
      className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
    >
      Blog
    </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{
                  width: Math.random() * 300 + 50 + 'px',
                  height: Math.random() * 300 + 50 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  filter: 'blur(40px)',
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Data Into
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                Strategic Advantage
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Expert data management, governance, and analytics solutions that drive business growth and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 border-2 border-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-out; }
          .animate-gradient { background-size: 200% auto; animation: gradient 3s ease infinite; }
        `}</style>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-400">Comprehensive solutions for your data needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-cyan-400">Inspirad?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We pride ourselves in having a wealth of experience working with large volume of data across multiple domains. 
                We work with organizations in all stages of the data lifecycle from collection, storage, validation, interpretation and presentation. 
                Our work is consistently informed by research to understand technology trends that are relevant to dynamic business needs.
              </p>
              <div className="space-y-4">
                {['Expert Team', 'Cutting-Edge Technology', 'Proven Results', 'Ongoing Support'].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-lg group-hover:text-cyan-400 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                <BarChart3 className="w-64 h-64 text-cyan-400 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-400">Let's discuss how we can help transform the data operations in your organization</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: Mail, text: 'cesarwrites24@gmail.com' },
                // { icon: Phone, text: '+254 (765267892)' },
                { icon: MapPin, text: 'Nairobi, Kenya' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-cyan-400 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>

            {/* <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' }
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    onFocus={() => setFormFocused({ ...formFocused, [field.name]: true })}
                    onBlur={() => setFormFocused({ ...formFocused, [field.name]: false })}
                    className={`w-full px-4 py-3 bg-slate-800 border-2 rounded-lg outline-none transition-all duration-300 ${
                      formFocused[field.name] ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' : 'border-slate-700'
                    }`}
                    placeholder={field.label}
                    required
                  />
                </div>
              ))}
              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFormFocused({ ...formFocused, message: true })}
                  onBlur={() => setFormFocused({ ...formFocused, message: false })}
                  rows={5}
                  className={`w-full px-4 py-3 bg-slate-800 border-2 rounded-lg outline-none transition-all duration-300 ${
                    formFocused.message ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' : 'border-slate-700'
                  }`}
                  placeholder="Message"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2026 Inspirad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;