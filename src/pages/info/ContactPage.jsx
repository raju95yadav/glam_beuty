import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [adminPhone, setAdminPhone] = useState('917857873455');

  React.useEffect(() => {
    const fetchAdminPhone = async () => {
      try {
        const { data } = await api.get('/main/admin-contact');
        if (data.phone) {
          setAdminPhone(data.phone);
        }
      } catch (error) {
        console.error('Failed to fetch admin phone');
      }
    };
    fetchAdminPhone();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/main/contact', formData);
      toast.success(response.data.message || 'Message sent!');
      
      // WhatsApp Redirection
      const whatsappText = `Hello! I am ${formData.name}. %0A%0A${formData.message}%0A%0AMy Email: ${formData.email}`;
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${whatsappText}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
       toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl font-black text-gray-900 uppercase tracking-tighter italic mb-4"
           >
             Get in <span className="text-pink-600">Touch</span>
           </motion.h1>
           <p className="text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
             We'd love to hear from you. Our team is here to help with any questions or feedback you may have.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           {/* Contact Info */}
           <div className="space-y-12">
              <div className="space-y-4">
                 <h2 className="text-xs font-black uppercase tracking-[0.3em] text-pink-600 italic">Contact Details</h2>
                 <p className="text-3xl font-black text-gray-900 leading-tight">Reach out via any of these channels</p>
              </div>

              <div className="space-y-8">
                 {[
                   { icon: Mail, label: 'Email', value: 'support@nykaaclone.com' },
                   { icon: Phone, label: 'Helpline', value: '+91 1800-221-334' },
                   { icon: MapPin, label: 'Head Office', value: 'Nykaa Tower, BKC, Mumbai' }
                 ].map((info, i) => (
                   <div key={i} className="flex items-center gap-6 group">
                      <div className="size-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-sm">
                         <info.icon className="size-6" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{info.label}</p>
                         <p className="text-lg font-bold text-gray-900">{info.value}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Contact Form */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-gray-50 rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-2xl shadow-gray-100"
           >
              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-8 py-5 rounded-[2rem] bg-white border-transparent focus:bg-white focus:ring-4 focus:ring-pink-500/10 outline-none transition-all font-bold text-sm"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-8 py-5 rounded-[2rem] bg-white border-transparent focus:bg-white focus:ring-4 focus:ring-pink-500/10 outline-none transition-all font-bold text-sm"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Message</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-8 py-5 rounded-[2rem] bg-white border-transparent focus:bg-white focus:ring-4 focus:ring-pink-500/10 outline-none transition-all font-bold text-sm resize-none"
                    />
                 </div>

                 <button 
                   type="submit"
                   disabled={loading}
                   className="w-full bg-pink-600 text-white font-black py-6 rounded-[2rem] uppercase tracking-widest text-xs shadow-xl shadow-pink-200 hover:bg-pink-700 active:scale-[0.98] transition-all disabled:opacity-50"
                 >
                   {loading ? (
                     <span className="flex items-center justify-center gap-3">
                        <Loader2 className="size-4 animate-spin" /> Sending...
                     </span>
                   ) : (
                     <span className="flex items-center justify-center gap-3">
                        <Send className="size-4" /> Send Message
                     </span>
                   )}
                 </button>
              </form>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
