import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, User, Trash2, ChevronRight } from 'lucide-react';
import { Profile } from '../types';

interface ProfileManagerProps {
  profiles: Profile[];
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({ profiles, onSelect, onAdd, onDelete }) => {
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
      setIsAdding(false);
    }
  };

  const colors = [
    'bg-rose-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 
    'bg-violet-500', 'bg-indigo-500', 'bg-fuchsia-500', 'bg-orange-500'
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl md:text-6xl font-black text-slate-100 tracking-tighter leading-none italic uppercase">Choose Your Protocol</h2>
          <p className="text-indigo-400 font-bold uppercase tracking-[0.4em] text-[10px] opacity-80">Awaiting Hero Authorization...</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-8 py-4 rounded-2xl font-black tracking-widest text-xs border border-indigo-500/30 transition-all shadow-[0_0_25px_rgba(99,102,241,0.1)] group"
          >
            <UserPlus size={16} className="group-hover:scale-110 transition-transform" />
            CREATE NEW CORE
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            onSubmit={handleSubmit}
            className="glass-panel p-12 max-w-xl mx-auto shadow-indigo-500/10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <label className="block text-[10px] font-black text-indigo-400 mb-8 uppercase tracking-[0.4em] text-center">Designating Unit Identity</label>
            <div className="flex flex-col gap-8">
              <input
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="INPUT HERO NAME"
                className="w-full text-3xl font-black p-8 bg-slate-950/60 border-2 border-indigo-500/30 rounded-[32px] focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_30px_rgba(99,102,241,0.2)] text-slate-100 placeholder:text-slate-800 uppercase text-center"
              />
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-900/40 uppercase"
              >
                Initialize Unit
              </button>
            </div>
            <button 
              type="button"
              onClick={() => setIsAdding(false)}
              className="w-full mt-10 text-slate-600 font-bold hover:text-slate-400 uppercase text-[10px] tracking-[0.4em] transition-colors"
            >
              Terminate Process
            </button>
          </motion.form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {profiles.map((profile, i) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', damping: 20 }}
                className="group relative"
              >
                <div 
                  onClick={() => onSelect(profile.id)}
                  className="cursor-pointer glass-panel p-10 hover:border-indigo-500/60 hover:bg-slate-800/80 transition-all hover:-translate-y-3 flex flex-col items-center text-center shadow-indigo-500/5 h-full"
                >
                  <div className={`w-24 h-24 rounded-[32px] ${profile.avatarColor} flex items-center justify-center border-2 border-white/20 mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500 shadow-indigo-500/20`}>
                    <div className="w-10 h-10 rounded-full border-4 border-white/30"></div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-100 uppercase tracking-tighter mb-6 group-hover:text-indigo-400 transition-colors uppercase italic leading-none">{profile.name}</h3>
                  
                  <div className="grid grid-cols-2 w-full gap-4 border-t border-slate-800/80 pt-8 mt-auto">
                    <div className="text-left space-y-1">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Level</span>
                      <span className="text-2xl font-mono font-bold text-slate-200 tracking-tighter">{profile.masteryLevel}</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Total XP</span>
                      <span className="text-2xl font-mono font-bold text-indigo-400 tracking-tighter">{profile.totalPoints.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="text-indigo-500" size={24} />
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(confirm(`Erase Unit ${profile.name}?`)) onDelete(profile.id);
                  }}
                  className="absolute -top-4 -right-4 bg-slate-950 text-red-500 p-3 rounded-2xl border border-red-500/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-xl hover:scale-110"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {profiles.length === 0 && !isAdding && (
        <div className="text-center py-32 glass-panel border-dashed border-2 border-slate-800 bg-transparent">
          <User className="mx-auto text-slate-800 mb-6" size={80} />
          <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">No Authorized Heroes Detected</p>
        </div>
      )}
    </div>
  );
};
