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
    <div className="max-w-7xl mx-auto space-y-10 px-4">
      {/* Header Info Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 glass-panel p-8 flex flex-col items-center justify-center text-center shadow-indigo-500/5">
           <div className={`w-28 h-28 rounded-[32px] ${profile.avatarColor} border-2 border-white/20 flex items-center justify-center shadow-2xl mb-6 relative group overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-full border-4 border-white/40"></div>
           </div>
           <h2 className="text-3xl font-black italic text-slate-100 uppercase tracking-tighter leading-none truncate w-full mb-2">{profile.name}</h2>
           <button 
            onClick={onLogout}
            className="mt-2 text-[9px] font-black uppercase text-slate-600 hover:text-indigo-400 tracking-[0.3em] transition-all flex items-center gap-2 hover:translate-x-1"
          >
            <ArrowLeft size={10} /> Disconnect Unit
          </button>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-10 flex flex-col justify-between shadow-indigo-500/20 translate-y-0 hover:-translate-y-1 transition-all">
            <span className="text-[10px] font-black uppercase text-indigo-400/60 tracking-[0.4em] mb-4">Operational Level</span>
            <div className="text-7xl font-black italic text-indigo-400 leading-none">0{profile.masteryLevel}</div>
          </div>
          <div className="glass-panel p-10 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] mb-4">Accumulated XP</span>
            <div className="text-6xl font-black italic text-slate-200 leading-none">{profile.totalPoints.toLocaleString()}</div>
          </div>
          <div className="glass-panel p-10 bg-indigo-600/10 border-indigo-500/30 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
            <span className="text-[10px] font-black uppercase text-indigo-300 tracking-[0.4em] relative z-10 mb-4">Best Streak</span>
            <div className="text-7xl font-black italic text-white relative z-10 group-hover:scale-110 transition-transform leading-none shadow-indigo-500/50">{profile.bestStreak}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Play Protocols */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[340px]">
             <motion.button 
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(99,102,241,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onStartGame('multiplication')}
                className="bg-indigo-600 rounded-[48px] border border-indigo-400 p-10 flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-[-20%] right-[-10%] text-[240px] font-black text-indigo-400 opacity-10 transition-all group-hover:scale-110 group-hover:opacity-20 italic pointer-events-none">×</div>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20 shadow-xl">
                    <Play size={24} className="fill-white text-white ml-1" />
                  </div>
                  <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Multiply</h3>
                  <p className="text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] mt-3 opacity-80">Training Grounds: Operational</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                  {['EASY', 'NORMAL', 'HARD'].map((cat, i) => (
                    <span key={cat} className={`text-[8px] font-black px-2 py-1 rounded-md border ${i === 0 ? 'bg-indigo-400/30 border-indigo-300' : 'bg-white/5 border-white/10'}`}>{cat}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 self-start bg-white/10 px-5 py-2.5 rounded-full border border-white/20 backdrop-blur-sm mt-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-300 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase text-indigo-100 tracking-widest">Protocol 01-A</span>
                </div>
             </motion.button>

             <motion.button 
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(6,182,212,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onStartGame('division')}
                className="bg-slate-900 border border-slate-700/50 rounded-[48px] p-10 flex flex-col justify-between text-left relative overflow-hidden group shadow-2xl cursor-pointer"
              >
                <div className="absolute top-[-20%] right-[-10%] text-[240px] font-black text-cyan-500 opacity-5 transition-all group-hover:scale-110 group-hover:opacity-10 italic pointer-events-none">÷</div>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/30 shadow-xl">
                    <Play size={24} className="fill-cyan-400 text-cyan-400 ml-1" />
                  </div>
                  <h3 className="text-5xl font-black text-slate-100 italic tracking-tighter uppercase leading-none">Divide</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-3 opacity-80">Logic Chamber: Synchronized</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                  {['EASY', 'NORMAL', 'HARD'].map((cat, i) => (
                    <span key={cat} className={`text-[8px] font-black px-2 py-1 rounded-md border ${i === 2 ? 'bg-cyan-900/30 border-cyan-800' : 'bg-white/5 border-slate-800'}`}>{cat}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 self-start bg-slate-800/80 px-5 py-2.5 rounded-full border border-slate-700 backdrop-blur-sm mt-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Protocol 02-B</span>
                </div>
             </motion.button>
          </div>

          <div className="glass-panel p-10 flex-grow">
            <h3 className="text-[11px] uppercase tracking-[0.4em] text-indigo-400 font-black mb-12 flex items-center gap-3">
              <History size={16} /> Mission Record Terminal
            </h3>
            
            <div className="space-y-6">
              {latestSessions.length === 0 ? (
                <div className="py-24 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-800/50 rounded-[40px]">
                   <div className="w-24 h-1 bg-slate-800/50 mb-8 rounded-full"></div>
                   <p className="text-slate-600 font-black uppercase italic tracking-[0.5em] text-[10px]">Awaiting First Combat Data</p>
                </div>
              ) : (
                latestSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-6 bg-slate-950/40 rounded-[32px] border border-slate-800/40 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all group">
                    <div className="flex items-center gap-8">
                      <div className={`w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center font-black text-3xl italic shadow-2xl ${session.operation === 'multiplication' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-cyan-400 hover:text-cyan-300'}`}>
                        {session.operation === 'multiplication' ? '×' : '÷'}
                      </div>
                      <div>
                        <div className="font-black text-slate-100 uppercase text-sm tracking-widest mb-1 group-hover:text-indigo-400 transition-colors uppercase italic">{session.operation} Protocol</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono opacity-80">Log_ID: {session.id.slice(0,8)} • {new Date(session.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-indigo-400 text-2xl tracking-tighter">{session.score.toLocaleString()} XP</div>
                      <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">Combat Merits</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Tactical Feed */}
        <div className="lg:col-span-4 flex flex-col gap-10">
           <div className="glass-panel p-12 bg-gradient-to-br from-indigo-950/20 to-transparent h-full flex flex-col shadow-indigo-900/5">
              <h3 className="text-[11px] uppercase tracking-[0.5em] text-slate-500 font-black mb-12 flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></span> Performance Status
              </h3>

              <div className="space-y-16 flex-grow">
                 <div className="space-y-5">
                    <div className="flex justify-between items-end px-1">
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Combat Accuracy</span>
                       <span className="text-2xl font-mono font-bold text-indigo-400">92.4%</span>
                    </div>
                    <div className="h-4 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden p-1 shadow-inner">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '92.4%' }}
                        className="h-full bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                      />
                    </div>
                 </div>

                 <div className="space-y-5">
                    <div className="flex justify-between items-end px-1">
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Rank Core Sync</span>
                       <span className="text-2xl font-mono font-bold text-cyan-400">85%</span>
                    </div>
                    <div className="h-4 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden p-1 shadow-inner">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        className="h-full bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                      />
                    </div>
                 </div>

                 <div className="bg-slate-950/80 rounded-[40px] p-8 border border-slate-800 shadow-2xl relative overflow-hidden mt-12">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="flex items-center gap-6 mb-6">
                       <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                          <Award className="text-amber-500" size={32} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Designation Status</p>
                          <h4 className="text-2xl font-black italic uppercase text-slate-100 leading-none tracking-tighter">
                            {profile.totalPoints < 1000 ? 'Initiate' : profile.totalPoints < 5000 ? 'Vanguard' : 'Grandmaster'}
                          </h4>
                       </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 leading-[1.8] uppercase tracking-widest opacity-80">
                      Unit Core stability is optimized. Recommended combat scenario: Division Protocols to further isolate logic spikes.
                    </p>
                 </div>
              </div>
              
              <div className="mt-16 pt-10 border-t border-slate-800/50 flex justify-center">
                 <div className="flex gap-2.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full border border-slate-800 shadow-sm ${i < 3 ? 'bg-indigo-500 shadow-indigo-500/20' : 'bg-transparent'}`}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
