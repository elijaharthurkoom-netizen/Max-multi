/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile, Operation, GameSession, AppState } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProfileManager } from './components/ProfileManager';
import { Dashboard } from './components/Dashboard';
import { GameEngine } from './components/GameEngine';

export default function App() {
  const [db, setDb] = useLocalStorage<AppState>('math-hero-db', {
    profiles: [],
    currentProfileId: null,
    sessions: []
  });

  const [view, setView] = useState<'profiles' | 'dashboard' | 'game'>('profiles');
  const [activeGame, setActiveGame] = useState<{ op: Operation; difficulty: number } | null>(null);

  const currentProfile = useMemo(() => 
    db.profiles.find(p => p.id === db.currentProfileId), 
    [db.profiles, db.currentProfileId]
  );

  const handleAddProfile = (name: string) => {
    const colors = [
      'bg-rose-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 
      'bg-violet-500', 'bg-indigo-500', 'bg-fuchsia-500', 'bg-orange-500'
    ];
    const newProfile: Profile = {
      id: crypto.randomUUID(),
      name,
      avatarColor: colors[db.profiles.length % colors.length],
      totalPoints: 0,
      streak: 0,
      bestStreak: 0,
      masteryLevel: 1
    };
    setDb(prev => ({ ...prev, profiles: [...prev.profiles, newProfile] }));
  };

  const handleSelectProfile = (id: string) => {
    setDb(prev => ({ ...prev, currentProfileId: id }));
    setView('dashboard');
  };

  const handleDeleteProfile = (id: string) => {
    setDb(prev => ({
      ...prev,
      profiles: prev.profiles.filter(p => p.id !== id),
      currentProfileId: prev.currentProfileId === id ? null : prev.currentProfileId,
      sessions: prev.sessions.filter(s => s.profileId !== id)
    }));
  };

  const handleStartGame = (op: Operation) => {
    const difficulty = currentProfile?.masteryLevel || 1;
    setActiveGame({ op, difficulty });
    setView('game');
  };

  const handleFinishGame = (session: GameSession) => {
    setDb(prev => {
      const profileIndex = prev.profiles.findIndex(p => p.id === session.profileId);
      if (profileIndex === -1) return prev;

      const newProfiles = [...prev.profiles];
      const p = newProfiles[profileIndex];
      
      const newTotalPoints = p.totalPoints + session.score;
      const newStreak = p.streak + session.correctAnswers;
      const newBestStreak = Math.max(p.bestStreak, newStreak);
      const newMasteryLevel = Math.floor(newTotalPoints / 2500) + 1;

      newProfiles[profileIndex] = {
        ...p,
        totalPoints: newTotalPoints,
        streak: newStreak,
        bestStreak: newBestStreak,
        masteryLevel: Math.min(20, newMasteryLevel)
      };

      return {
        ...prev,
        profiles: newProfiles,
        sessions: [...prev.sessions, session]
      };
    });
  };

  const currentView = () => {
    switch (view) {
      case 'profiles':
        return (
          <ProfileManager 
            profiles={db.profiles} 
            onAdd={handleAddProfile} 
            onSelect={handleSelectProfile} 
            onDelete={handleDeleteProfile} 
          />
        );
      case 'dashboard':
        return currentProfile ? (
          <Dashboard 
            profile={currentProfile} 
            sessions={db.sessions} 
            onStartGame={handleStartGame} 
            onLogout={() => setView('profiles')} 
          />
        ) : setView('profiles') as any;
      case 'game':
        return currentProfile && activeGame ? (
          <GameEngine 
            profile={currentProfile}
            operation={activeGame.op}
            difficulty={activeGame.difficulty}
            onFinish={handleFinishGame}
            onCancel={() => setView('dashboard')}
          />
        ) : setView('dashboard') as any;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#312e81,transparent_50%)] opacity-40 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,#1e1b4b,transparent_40%)] opacity-30 pointer-events-none"></div>

      <nav className="relative z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex flex-col group cursor-pointer" onClick={() => setView('profiles')}>
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:from-cyan-400 group-hover:to-indigo-400 transition-all duration-500">
            MATH OVERDRIVE
          </h1>
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-bold opacity-80 mt-1">Status: Operational</span>
        </div>
        
        {currentProfile && view !== 'profiles' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Active Hero</span>
              <span className="text-xl font-bold text-slate-200 tracking-tight">{currentProfile.name}</span>
            </div>
            <div className={`w-10 h-10 rounded-xl ${currentProfile.avatarColor} border border-white/20 flex items-center justify-center shadow-lg`}>
              <div className="w-5 h-5 rounded-full border-2 border-white/50"></div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10 container mx-auto px-6 py-4 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (db.currentProfileId || 'none')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-8 px-6 text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex gap-6">
          <span>Local Cache: Encrypted</span>
          <span>Build: v2.4.1-Final</span>
        </div>
        <div className="flex gap-4">
          <span className="text-indigo-500">Ready for Deployment</span>
        </div>
      </footer>
    </div>
  );
}
