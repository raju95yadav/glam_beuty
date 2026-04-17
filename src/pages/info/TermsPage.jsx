import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, FileText, Lock, ShieldAlert } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
       <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl shadow-pink-100/10 border border-gray-100"
          >
             <div className="text-center mb-16 space-y-4">
                <div className="size-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-900 group-hover:bg-pink-600 transition-all">
                   <Gavel className="size-8" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Terms & Conditions</h1>
                <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">Effective Date: Jan 1, 2026</p>
             </div>

             <div className="prose prose-pink max-w-none space-y-12">
                <section className="space-y-6">
                   <div className="flex items-center gap-4 border-b pb-4">
                      <FileText className="size-5 text-pink-600" />
                      <h2 className="text-2xl font-black text-gray-900 m-0">1. Acceptance of Terms</h2>
                   </div>
                   <p className="text-gray-500 leading-relaxed italic">
                      By accessing and using Nykaa Clone, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using our services.
                   </p>
                </section>

                <section className="space-y-6">
                   <div className="flex items-center gap-4 border-b pb-4">
                      <Lock className="size-5 text-pink-600" />
                      <h2 className="text-2xl font-black text-gray-900 m-0">2. Privacy & Data</h2>
                   </div>
                   <p className="text-gray-500 leading-relaxed">
                      Your privacy is important to us. Our Privacy Policy explains how we collect and use your personal information. By using our site, you consent to such processing and you warrant that all data provided by you is accurate.
                   </p>
                </section>

                <section className="space-y-6">
                   <div className="flex items-center gap-4 border-b pb-4">
                      <ShieldAlert className="size-5 text-pink-600" />
                      <h2 className="text-2xl font-black text-gray-900 m-0">3. User Conduct</h2>
                   </div>
                   <p className="text-gray-500 leading-relaxed">
                      Users are prohibited from using the site for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. We reserve the right to terminate your use of the service for violating any of the prohibited uses.
                   </p>
                </section>
             </div>

             <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Nykaa Clone Legal © 2026</p>
             </div>
          </motion.div>
       </div>
    </div>
  );
};

export default TermsPage;
