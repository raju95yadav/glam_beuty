import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  ArrowRight, 
  Loader2, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/main/newsletter', { email });
      setSubscribed(true);
      toast.success('Welcome to the Beauty Circle!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Terms & Conditions', path: '/terms' },
      ]
    },
    {
      title: 'Customer Support',
      links: [
        { label: 'Order Tracking', path: '/support/order-tracking' },
        { label: 'Shipping Policy', path: '/support/shipping-policy' },
        { label: 'Return Policy', path: '/support/return-policy' },
        { label: 'FAQs', path: '/support/faqs' },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-white text-gray-500 pt-24 pb-12 overflow-hidden border-t border-gray-100">
      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 max-w-7xl relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Branding Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <Link to="/">
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
                  Nykaa<span className="text-pink-600">.</span>
                </h3>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                Your premier destination for luxury beauty. Curating the finest makeup, skincare, and wellness products since 2026.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: 'mailto:info@nykaaclone.com' }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all border border-gray-200"
                >
                  <social.icon className="size-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <motion.div variants={itemVariants} key={idx} className="space-y-8">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] italic border-b border-gray-100 pb-4 inline-block">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      className="group flex items-center gap-3 text-sm hover:text-gray-900 transition-colors"
                    >
                      <span className="h-px w-0 bg-pink-600 group-hover:w-4 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] italic border-b border-gray-100 pb-4 inline-block">
              Join the Circle
            </h4>
            <div className="space-y-6">
              <p className="text-sm text-gray-500">Subscribe for early access to drops and exclusive beauty tips.</p>
              
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600/50 transition-all pr-14"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 px-3 bg-pink-600 rounded-xl text-white hover:bg-pink-700 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : subscribed ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    <ArrowRight className="size-5" />
                  )}
                </button>
              </form>
              
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600">
                 <Heart className="size-3 text-pink-600 fill-pink-600" />
                 Trusted by 10M+ users
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            &copy; {new Date().getFullYear()} Nykaa Clone. Crafted with precision.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
             <span className="hover:text-pink-600 cursor-pointer transition-colors">Privacy</span>
             <span className="hover:text-pink-600 cursor-pointer transition-colors">Accessibility</span>
             <span className="hover:text-pink-600 cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
