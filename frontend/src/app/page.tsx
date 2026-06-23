'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Github, Linkedin, Briefcase, GraduationCap, Award, Cat } from 'lucide-react';

export default function Home() {
  const [cvData, setCvData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingField, setEditingField] = useState<{ path: string, value: string } | null>(null);

  useEffect(() => {
    // Initial fetch
    fetch('/api/cv')
      .then(res => res.json())
      .then(data => setCvData(data))
      .catch(console.error);

    // SSE for real-time updates
    const eventSource = new EventSource('/api/cv/stream');
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.data) setCvData(payload.data);
      } catch (e) {
        console.error('SSE Error', e);
      }
    };

    return () => eventSource.close();
  }, []);

  const handleSave = async (path: string, newValue: string) => {
    if (!cvData) return;
    
    // Simple deep update for specific fields
    let updatedData = JSON.parse(JSON.stringify(cvData));
    const parts = path.split('.');
    
    if (parts.length === 2) {
      updatedData[parts[0]][parts[1]] = newValue;
    } else if (parts.length === 3) {
      // Arrays like projects.0.title
      updatedData[parts[0]][parseInt(parts[1])][parts[2]] = newValue;
    }

    try {
      const res = await fetch('/api/cv', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const data = await res.json();
        setCvData(data);
      }
    } catch (err) {
      console.error(err);
    }
    setEditingField(null);
  };

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <Cat className="w-16 h-16 text-pink-400 animate-bounce" />
        <span className="ml-4 text-2xl font-bold text-pink-600">Loading Pawsome CV...</span>
      </div>
    );
  }

  const EditableText = ({ path, value, className, multiline = false }: any) => {
    if (editingField?.path === path) {
      return (
        <div className="flex flex-col gap-2 relative z-10 w-full">
          {multiline ? (
            <textarea 
              className="p-2 border-2 border-pink-400 rounded-xl bg-white/80 w-full min-h-[100px]"
              value={editingField.value}
              onChange={e => setEditingField({ ...editingField, value: e.target.value })}
            />
          ) : (
            <input 
              className="p-2 border-2 border-pink-400 rounded-xl bg-white/80 w-full"
              value={editingField.value}
              onChange={e => setEditingField({ ...editingField, value: e.target.value })}
            />
          )}
          <div className="flex gap-2">
            <button 
              className="px-4 py-1 bg-green-400 text-white font-bold rounded-full hover:bg-green-500 transition-colors shadow-lg"
              onClick={() => handleSave(path, editingField.value)}
            >
              Save Purrfectly
            </button>
            <button 
              className="px-4 py-1 bg-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-400 transition-colors shadow-lg"
              onClick={() => setEditingField(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`group relative flex items-center gap-2 ${className}`}>
        <span>{value}</span>
        {isAdmin && (
          <button 
            onClick={() => setEditingField({ path, value })}
            className="opacity-0 group-hover:opacity-100 p-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full transition-all"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
      {/* Floating Cat Decorations */}
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRnbDJ6amx6cXBtcThqcGtneXpxeThpZWZteWgzcDVnN3Vqa3oxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/JIX9t2j0ZTN9S/giphy.gif" alt="Cat" className="fixed top-10 right-10 w-24 opacity-80 pointer-events-none drop-shadow-2xl" />
      
      {/* Admin Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-xl transition-transform hover:scale-105 ${isAdmin ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border-2 border-pink-500'}`}
        >
          <Cat className="w-5 h-5" />
          {isAdmin ? 'Exit Admin Mode' : 'Admin Login'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-2xl border-4 border-pink-200 cat-ears-decoration relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 flex-shrink-0 bg-yellow-100 flex items-center justify-center">
               <img src="https://cataas.com/cat/cute" alt="Profile avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <EditableText 
                path="profile.name" 
                value={cvData.profile.name} 
                className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-2" 
              />
              <EditableText 
                path="profile.location" 
                value={cvData.profile.location} 
                className="text-gray-600 font-medium mb-1" 
              />
              <div className="flex flex-wrap gap-4 mt-4">
                <a href={cvData.socialLinks.github} target="_blank" className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition shadow-lg">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href={cvData.socialLinks.linkedin} target="_blank" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-lg">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 relative z-10">
            <h3 className="text-xl font-bold text-pink-600 mb-2 flex items-center gap-2">
               Meow Summary <Cat className="w-5 h-5"/>
            </h3>
            <EditableText 
              path="profile.summary" 
              value={cvData.profile.summary} 
              multiline 
              className="text-gray-700 leading-relaxed text-lg bg-pink-50 p-4 rounded-xl border border-pink-100" 
            />
          </div>
        </motion.div>

        {/* Education & Certs */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border-4 border-cyan-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap className="w-24 h-24 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-black text-cyan-600 mb-6 flex items-center gap-2 relative z-10">
              Education
            </h2>
            {cvData.education.map((edu: any, index: number) => (
              <div key={index} className="mb-6 relative z-10 bg-cyan-50 p-4 rounded-xl">
                <EditableText path={`education.${index}.institution`} value={edu.institution} className="font-bold text-gray-800" />
                <EditableText path={`education.${index}.period`} value={edu.period} className="text-sm text-cyan-600 font-bold mb-2" />
                <EditableText path={`education.${index}.details`} value={edu.details} className="text-gray-600" />
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border-4 border-yellow-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award className="w-24 h-24 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-black text-yellow-600 mb-6 flex items-center gap-2 relative z-10">
              Certifications
            </h2>
            {cvData.certifications.map((cert: any, index: number) => (
              <div key={index} className="mb-4 relative z-10 bg-yellow-50 p-4 rounded-xl flex justify-between items-center">
                <EditableText path={`certifications.${index}.name`} value={cert.name} className="font-bold text-gray-800" />
                <EditableText path={`certifications.${index}.date`} value={cert.date} className="text-sm text-yellow-600 font-bold whitespace-nowrap" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border-4 border-purple-200"
        >
          <h2 className="text-2xl font-black text-purple-600 mb-6">Super Powers (Skills)</h2>
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-2xl">
              <h3 className="font-bold text-purple-800 mb-2">Programming Languages</h3>
              <EditableText path="skills.programming" value={cvData.skills.programming} multiline className="text-gray-700" />
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl">
              <h3 className="font-bold text-purple-800 mb-2">Tools & Frameworks</h3>
              <EditableText path="skills.tools" value={cvData.skills.tools} multiline className="text-gray-700" />
            </div>
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border-4 border-emerald-200"
        >
          <h2 className="text-2xl font-black text-emerald-600 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6" /> Awesome Projects
          </h2>
          <div className="grid gap-6">
            {cvData.projects.map((proj: any, index: number) => (
              <div key={index} className="bg-emerald-50 p-6 rounded-2xl hover:shadow-md transition-shadow border border-emerald-100">
                <EditableText path={`projects.${index}.title`} value={proj.title} className="text-xl font-bold text-emerald-800 mb-1" />
                {proj.code && (
                  <EditableText path={`projects.${index}.code`} value={proj.code} className="text-sm text-emerald-600 font-bold mb-3 inline-block bg-emerald-100 px-3 py-1 rounded-full" />
                )}
                <EditableText path={`projects.${index}.description`} value={proj.description} multiline className="text-gray-700 leading-relaxed" />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
