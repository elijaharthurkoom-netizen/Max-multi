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
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-10 md:mb-16 gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-6xl font-black text-slate-100 tracking-tighter leading-none italic uppercase">Hero Database</h2>
          <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] opacity-70">Awaiting Auth...</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black tracking-widest text-[10px] md:text-xs border border-indigo-500/30 transition-all group"
          >
            <UserPlus size={14} className="group-hover:scale-110 transition-transform" />
            NEW UNIT
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.form 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            onSubmit={handleSubmit}
            className="glass-panel p-6 md:p-12 max-w-lg mx-auto shadow-indigo-500/10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <label className="block text-[9px] font-black text-indigo-400 mb-6 md:mb-8 uppercase tracking-[0.4em] text-center">Designating Identity</label>
            <div className="flex flex-col gap-6 md:gap-8">
              <input
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="NAME"
                className="w-full text-xl md:text-3xl font-black p-5 md:p-8 bg-slate-950/60 border-2 border-indigo-500/30 rounded-xl md:rounded-[32px] focus:outline-none focus:border-indigo-500 text-slate-100 placeholder:text-slate-800 uppercase text-center"
              />
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 md:py-6 rounded-xl md:rounded-3xl font-black text-md md:text-lg tracking-widest hover:bg-indigo-500 transition-all uppercase"
              >
                Sync Core
              </button>
            </div>
            <button 
              type="button"
              onClick={() => setIsAdding(false)}
              className="w-full mt-6 md:mt-10 text-slate-600 font-bold hover:text-slate-400 uppercase text-[9px] tracking-[0.3em] transition-colors"
            >
              Terminate
            </button>
          </motion.form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {profiles.map((profile, i) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative h-full"
              >
                <div 
                  onClick={() => onSelect(profile.id)}
                  className="cursor-pointer glass-panel p-6 md:p-10 hover:border-indigo-500/60 hover:bg-slate-800/80 transition-all hover:-translate-y-2 flex flex-col items-center text-center h-full shadow-indigo-500/5 overflow-hidden"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] ${profile.avatarColor} flex items-center justify-center border-2 border-white/20 mb-6 md:mb-8 shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                    <div className="w-8 h-8 rounded-full border-4 border-white/20"></div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tighter mb-6 group-hover:text-indigo-400 transition-colors uppercase italic leading-none truncate w-full">{profile.name}</h3>
                  
                  <div className="grid grid-cols-2 w-full gap-4 border-t border-slate-800/80 pt-6 mt-auto">
                    <div className="text-left">
                      <span className="block text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">LVL</span>
                      <span className="text-lg md:text-xl font-mono font-bold text-slate-200">{profile.masteryLevel}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">XP</span>
                      <span className="text-lg md:text-xl font-mono font-bold text-indigo-400">{profile.totalPoints.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(confirm(`Erase Unit ${profile.name}?`)) onDelete(profile.id);
                  }}
                  className="absolute -top-2 -right-2 bg-slate-950 text-red-500 p-2 rounded-xl border border-red-500/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-xl hover:scale-110 z-20"
                >
                  <Trash2 size={12} />
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
