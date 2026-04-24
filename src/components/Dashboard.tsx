import React from 'react';
import { motion } from 'motion/react';
import { Play, TrendingUp, History, User, Award, ArrowLeft } from 'lucide-react';
import { Profile, Operation, GameSession } from '../types';

interface DashboardProps {
  profile: Profile;
  sessions: GameSession[];
  onStartGame: (op: Operation) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, sessions, onStartGame, onLogout }) => {
  const latestSessions = [...sessions].filter(s => s.profileId === profile.id).sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  
  const totalScore = sessions.filter(s => s.profileId === profile.id).reduce((acc, s) => acc + s.score, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 px-4 py-6 md:py-10">
      {/* Header Info Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-1 glass-panel p-6 md:p-8 flex md:flex-col items-center justify-between md:justify-center text-center shadow-indigo-500/5">
           <div className="flex items-center md:flex-col gap-4 md:gap-0">
             <div className={`w-16 h-16 md:w-28 md:h-28 rounded-2xl md:rounded-[32px] ${profile.avatarColor} border-2 border-white/20 flex items-center justify-center shadow-xl mb-0 md:mb-6 relative group overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-white/40"></div>
             </div>
             <div className="text-left md:text-center">
               <h2 className="text-xl md:text-3xl font-black italic text-slate-100 uppercase tracking-tighter leading-none truncate mb-1">{profile.name}</h2>
               <button 
                onClick={onLogout}
                className="text-[8px] md:text-[9px] font-black uppercase text-slate-600 hover:text-indigo-400 tracking-[0.2em] transition-all flex items-center gap-2"
              >
                <ArrowLeft size={10} /> Disconnect
              </button>
             </div>
           </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div className="glass-panel p-6 md:p-10 flex flex-col justify-between shadow-indigo-500/20">
            <span className="text-[8px] md:text-[10px] font-black uppercase text-indigo-400/60 tracking-[0.2em] md:tracking-[0.4em] mb-2 md:mb-4">Level</span>
            <div className="text-4xl md:text-7xl font-black italic text-indigo-400 leading-none">0{profile.masteryLevel}</div>
          </div>
          <div className="glass-panel p-6 md:p-10 flex flex-col justify-between">
            <span className="text-[8px] md:text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] md:tracking-[0.4em] mb-2 md:mb-4">Points</span>
            <div className="text-3xl md:text-6xl font-black italic text-slate-200 leading-none">{profile.totalPoints.toLocaleString()}</div>
          </div>
          <div className="glass-panel p-6 md:p-10 bg-indigo-600/10 border-indigo-500/30 flex flex-col justify-between relative overflow-hidden group col-span-2 md:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
            <span className="text-[8px] md:text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em] md:tracking-[0.4em] relative z-10 mb-2 md:mb-4">Best Streak</span>
            <div className="text-4xl md:text-7xl font-black italic text-white relative z-10 leading-none">{profile.bestStreak}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        {/* Play Protocols */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
             <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartGame('multiplication')}
                className="bg-indigo-600 rounded-[32px] md:rounded-[48px] border border-indigo-400 p-8 md:p-10 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer min-h-[240px] md:min-h-[300px]"
              >
                <div className="absolute top-[-10%] right-[-5%] text-[140px] md:text-[240px] font-black text-indigo-400 opacity-10 transition-all group-hover:scale-110 italic pointer-events-none">×</div>
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center mb-4 md:mb-6 border border-white/20">
                    <Play size={20} className="fill-white text-white ml-1" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Multiply</h3>
                  <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-2 opacity-80">Battle Grounds</p>
                </div>
                <div className="relative z-10 mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['EASY', 'NORMAL', 'HARD'].map((cat, i) => (
                      <span key={cat} className={`text-[7px] font-black px-2 py-0.5 rounded border ${i === 0 ? 'bg-indigo-400/30 border-indigo-300' : 'bg-white/5 border-white/10'}`}>{cat}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 self-start bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase text-indigo-100 tracking-widest">Protocol 01-A</span>
                  </div>
                </div>
             </motion.button>

             <motion.button 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartGame('division')}
                className="bg-slate-900 border border-slate-700/50 rounded-[32px] md:rounded-[48px] p-8 md:p-10 flex flex-col justify-between text-left relative overflow-hidden group shadow-2xl cursor-pointer min-h-[240px] md:min-h-[300px]"
              >
                <div className="absolute top-[-10%] right-[-5%] text-[140px] md:text-[240px] font-black text-cyan-500 opacity-5 transition-all group-hover:scale-110 italic pointer-events-none">÷</div>
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 md:mb-6 border border-cyan-500/30">
                    <Play size={20} className="fill-cyan-400 text-cyan-400 ml-1" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-100 italic tracking-tighter uppercase leading-none">Divide</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 opacity-80">Logic Chamber</p>
                </div>
                <div className="relative z-10 mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['EASY', 'NORMAL', 'HARD'].map((cat, i) => (
                      <span key={cat} className={`text-[7px] font-black px-2 py-0.5 rounded border ${i === 2 ? 'bg-cyan-900/30 border-cyan-800' : 'bg-white/5 border-slate-800'}`}>{cat}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 self-start bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Protocol 02-B</span>
                  </div>
                </div>
             </motion.button>
          </div>

          <div className="glass-panel p-6 md:p-10 flex-grow">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-indigo-400 font-black mb-8 md:mb-12 flex items-center gap-3">
              <History size={14} /> Mission Record
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              {latestSessions.length === 0 ? (
                <div className="py-16 md:py-24 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-800/50 rounded-[28px] md:rounded-[40px]">
                   <div className="w-20 h-1 bg-slate-800/50 mb-6 rounded-full"></div>
                   <p className="text-slate-600 font-black uppercase italic tracking-[0.4em] text-[9px] md:text-[10px]">Awaiting Data</p>
                </div>
              ) : (
                latestSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 md:p-6 bg-slate-950/40 rounded-2xl md:rounded-[32px] border border-slate-800/40 hover:border-indigo-500/40 transition-all group">
                    <div className="flex items-center gap-4 md:gap-8">
                      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl border border-white/10 flex items-center justify-center font-black text-xl md:text-3xl italic shadow-2xl ${session.operation === 'multiplication' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-cyan-400'}`}>
                        {session.operation === 'multiplication' ? '×' : '÷'}
                      </div>
                      <div>
                        <div className="font-black text-slate-100 uppercase text-xs md:text-sm tracking-widest mb-0.5 italic">{session.operation}</div>
                        <div className="text-[8px] md:text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono opacity-70 truncate max-w-[100px] md:max-w-none">{new Date(session.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-indigo-400 text-lg md:text-2xl tracking-tighter">{session.score.toLocaleString()} XP</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Tactical Feed */}
        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-10">
           <div className="glass-panel p-8 md:p-12 bg-gradient-to-br from-indigo-950/20 to-transparent h-full flex flex-col shadow-indigo-900/5">
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-slate-500 font-black mb-8 md:mb-12 flex items-center gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Combat Status
              </h3>

              <div className="space-y-10 md:space-y-16 flex-grow">
                 <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                       <span className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Accuracy</span>
                       <span className="text-lg md:text-2xl font-mono font-bold text-indigo-400">92.4%</span>
                    </div>
                    <div className="h-2 md:h-4 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden p-0.5 md:p-1">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '92.4%' }}
                        className="h-full bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                      />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                       <span className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Core Sync</span>
                       <span className="text-lg md:text-2xl font-mono font-bold text-cyan-400">85%</span>
                    </div>
                    <div className="h-2 md:h-4 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden p-0.5 md:p-1">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        className="h-full bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                      />
                    </div>
                 </div>

                 <div className="bg-slate-950/80 rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                       <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                          <Award className="text-amber-500" size={24} />
                       </div>
                       <div className="space-y-0.5">
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Rank</p>
                          <h4 className="text-xl md:text-2xl font-black italic uppercase text-slate-100 leading-none tracking-tighter">
                            {profile.totalPoints < 1000 ? 'Initiate' : profile.totalPoints < 5000 ? 'Vanguard' : 'Grandmaster'}
                          </h4>
                       </div>
                    </div>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest opacity-80">
                      Core synchronized. Multiplier potential: Optimal.
                    </p>
                 </div>
              </div>
              
              <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-800/50 flex justify-center">
                 <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full border border-slate-800 ${i < 3 ? 'bg-indigo-500' : 'bg-transparent'}`}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>

  );
};
