import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { Briefcase, MapPin, Search, Loader2 } from 'lucide-react';

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/main/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Job fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-white py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6"
          >
             Work with us
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-gray-900 uppercase tracking-tighter mb-8 italic"
          >
            Shape the Future of <span className="text-pink-600 underline">Beauty</span>
          </motion.h1>
          <p className="text-lg text-gray-400 font-medium">Be part of the fastest-growing beauty ecosystem in India.</p>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="flex justify-between items-center mb-12">
           <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest">Open Positions</h2>
           <div className="relative group">
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="bg-white border-none pl-12 pr-6 py-4 rounded-2xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-pink-500/20 outline-none w-64 md:w-80 group-hover:shadow-md transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 pointer-events-none group-hover:text-pink-600 transition-colors" />
           </div>
        </div>

        {loading ? (
          <div className="flex justify-center flex-col items-center py-20 gap-4">
             <Loader2 className="size-10 text-pink-600 animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Loading listings...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/20 transition-all cursor-pointer group"
              >
                 <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{job.title}</h3>
                       <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <span className="flex items-center gap-2"><Briefcase className="size-3.5" /> {job.department}</span>
                          <span className="flex items-center gap-2"><MapPin className="size-3.5" /> {job.location}</span>
                       </div>
                    </div>
                    <button className="bg-gray-50 text-gray-900 group-hover:bg-pink-600 group-hover:text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                       Apply Now
                    </button>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersPage;
