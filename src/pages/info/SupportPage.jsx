import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Shield, Truck, RefreshCw, HelpCircle, Loader2 } from 'lucide-react';

const iconMap = {
  'order-tracking': Truck,
  'shipping-policy': Shield,
  'return-policy': RefreshCw,
  'faqs': HelpCircle
};

const SupportPage = () => {
  const { type } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const Icon = iconMap[type] || HelpCircle;

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/main/support/${type}`);
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching support content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="size-12 text-pink-600 animate-spin" />
      </div>
    );
  }

  if (!content) return <div className="text-center py-20 text-gray-500">Content not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 shadow-xl shadow-pink-100/20 border border-gray-100"
        >
          <div className="flex items-center gap-6 mb-12">
             <div className="size-16 bg-pink-50 rounded-3xl flex items-center justify-center text-pink-600">
                <Icon className="size-8" />
             </div>
             <div>
                <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{content.title}</h1>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Last updated: March 2026</p>
             </div>
          </div>

          <div className="space-y-12">
             {content.sections.map((section) => (
               <section key={section.id} className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                     <span className="size-6 bg-gray-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">{section.id}</span>
                     {section.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed pl-9">
                     {section.content}
                  </p>
               </section>
             ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;
