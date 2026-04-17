import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Target, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic"
          >
            Our <span className="text-pink-600">Story</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From humble beginnings to India's leading beauty destination. We believe beauty is more than skin deep – it's an expression of your soul.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-pink-600 rounded-full blur-[120px]"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl">
         {[
           { label: 'Happy Customers', value: '10M+', icon: Heart },
           { label: 'Beauty Brands', value: '2500+', icon: Sparkles },
           { label: 'Store Locations', value: '150+', icon: Target },
           { label: 'Team Members', value: '5000+', icon: Users }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="text-center group"
           >
              <div className="size-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-900 group-hover:bg-pink-600 group-hover:text-white transition-all">
                 <stat.icon className="size-8" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-1 tracking-tighter">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
           </motion.div>
         ))}
      </div>

      {/* Vision & Mission */}
      <div className="py-24 bg-gray-50">
         <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
               <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 italic">Our Mission</h2>
               <p className="text-gray-500 leading-relaxed text-lg">
                  To bring the world's best beauty products to every doorstep in India. We aim to democratize beauty by providing access, education, and inspiration to everyone.
               </p>
               <div className="h-2 w-24 bg-pink-600 rounded-full"></div>
            </div>
            <div className="space-y-6">
               <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 italic">Our Vision</h2>
               <p className="text-gray-500 leading-relaxed text-lg">
                  To become the most-loved beauty destination in Asia, fostering a community that celebrates individuality and promotes self-confidence through beauty.
               </p>
               <div className="h-2 w-24 bg-gray-900 rounded-full"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;
