import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Zap, Trophy, ArrowLeft, RefreshCw, Cat } from 'lucide-react';
import { MathProblem, Operation, Profile, GameSession } from '../types';

interface GameEngineProps {
  profile: Profile;
  operation: Operation;
  difficulty: number;
  onFinish: (session: GameSession) => void;
  onCancel: () => void;
}

export const GameEngine: React.FC<GameEngineProps> = ({ profile, operation, difficulty, onFinish, onCancel }) => {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);
  const [showMascot, setShowMascot] = useState(false);

  const generateProblem = useCallback(() => {
    let a: number, b: number, ans: number;
    const maxVal = 2 + difficulty * 4; // Scales with difficulty level
    
    if (operation === 'multiplication') {
      a = Math.floor(Math.random() * maxVal) + 2;
      b = Math.floor(Math.random() * 10) + 2;
      ans = a * b;
    } else {
      b = Math.floor(Math.random() * 9) + 2;
      ans = Math.floor(Math.random() * maxVal) + 2;
      a = ans * b;
    }

    const options = new Set<number>();
    options.add(ans);
    while (options.size < 4) {
      const offset = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const fakeAns = Math.max(1, ans + offset);
      options.add(fakeAns);
    }

    setProblem({
      a, b, op: operation, answer: ans,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    });
  }, [operation, difficulty]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      endGame();
    }
  }, [timeLeft, isGameOver]);

  const endGame = () => {
    setIsGameOver(true);
    const session: GameSession = {
      id: crypto.randomUUID(),
      profileId: profile.id,
      operation,
      difficulty,
      score,
      correctAnswers: correctCount,
      totalQuestions: correctCount + (score === 0 ? 0 : Math.floor(score / 100)), // Crude approximation
      timestamp: Date.now()
    };
    onFinish(session);
  };

  const handleAnswer = (selected: number) => {
    if (selected === problem?.answer) {
      const points = 100 + (streak * 10) + (timeLeft * 2);
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);

      if (newStreak % 5 === 0) {
        setShowMascot(true);
        setTimeout(() => setShowMascot(false), 2000);
      }
      
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        generateProblem();
      }, 500);
    } else {
      setStreak(0);
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        generateProblem();
      }, 500);
    }
  };

  if (isGameOver) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]"
        >
          <Trophy className="mx-auto text-amber-500 mb-6" size={80} />
          <h2 className="text-5xl font-black text-slate-900 mb-2 uppercase">GAME OVER</h2>
          <p className="text-xl font-bold text-slate-500 mb-8 uppercase tracking-widest">YOU EARNED {score} POINTS</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <span className="block text-xs font-black text-slate-400 uppercase">Correct</span>
              <span className="text-2xl font-black text-slate-900">{correctCount}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <span className="block text-xs font-black text-slate-400 uppercase">Efficiency</span>
              <span className="text-2xl font-black text-slate-900">{Math.round((score / (timeLeft || 1)))} XP/S</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onCancel}
              className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl border-4 border-slate-900 flex items-center justify-center gap-2 hover:bg-slate-800"
            >
              <ArrowLeft size={20} />
              DASHBOARD
            </button>
            <button 
              onClick={() => {
                setIsGameOver(false);
                setScore(0);
                setCorrectCount(0);
                setTimeLeft(60);
                setStreak(0);
                generateProblem();
              }}
              className="flex-1 bg-sky-500 text-white font-black py-4 rounded-2xl border-4 border-slate-900 flex items-center justify-center gap-2 hover:bg-sky-600"
            >
              <RefreshCw size={20} />
              REPLAY
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 md:gap-10">
      {/* HUD Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative z-20 px-4">
        <div className="glass-panel px-6 md:px-10 py-4 md:py-6 flex flex-col md:flex-col items-center md:items-start justify-between md:justify-center border-l-4 border-l-indigo-500 shadow-indigo-500/5">
           <span className="text-[9px] md:text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] md:tracking-[0.4em] mb-1 md:mb-2 italic">Time</span>
           <div className={`text-3xl md:text-5xl font-mono font-bold flex items-center gap-3 ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-100'}`}>
              <Timer size={20} className="md:w-7 md:h-7" />
              <span>{timeLeft}s</span>
           </div>
        </div>

        <div className="glass-panel px-6 md:px-10 py-4 md:py-6 flex flex-col items-center justify-center border-b-4 border-b-amber-500 shadow-amber-500/10">
           <div className="flex items-center gap-4 md:gap-6">
              <Zap className="text-amber-400" size={24} className="md:w-10 md:h-10" />
              <div className="text-4xl md:text-6xl font-black italic text-slate-100 tracking-tighter leading-none">{score.toLocaleString()}</div>
           </div>
           {streak > 1 && (
             <motion.div 
               initial={{ scale: 1.2, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-[8px] md:text-[10px] font-black text-amber-500 uppercase tracking-widest mt-2 italic"
             >
               STREAK: {streak}X
             </motion.div>
           )}
        </div>

        <div className="glass-panel px-6 md:px-10 py-4 md:py-6 flex flex-col items-center md:items-end justify-between md:justify-center border-r-4 border-r-cyan-500 shadow-cyan-500/5">
           <span className="text-[9px] md:text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] md:tracking-[0.4em] mb-1 md:mb-2 italic">Rank</span>
           <div className="text-3xl md:text-5xl font-black italic text-slate-100 uppercase leading-none">Lv.{difficulty}</div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center py-6 md:py-10 relative px-4">
        <AnimatePresence mode="wait">
          {problem && (
            <motion.div 
              key={problem.a + problem.b + problem.op}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              className="w-full text-center"
            >
              <div className="glass-panel p-8 md:p-24 mb-8 md:mb-16 flex flex-col items-center justify-center relative shadow-2xl bg-slate-900/60 border-slate-700/50">
                <div className="flex items-center gap-6 md:gap-28 my-6 md:my-10 relative z-10 overflow-hidden">
                  <span className="text-6xl md:text-[200px] font-black text-slate-100 tabular-nums italic tracking-tighter leading-none">
                    {problem.a}
                  </span>
                  <span className="text-4xl md:text-9xl font-light text-indigo-500/40">
                    {problem.op === 'multiplication' ? '×' : '÷'}
                  </span>
                  <span className="text-6xl md:text-[200px] font-black text-slate-100 tabular-nums italic tracking-tighter leading-none">
                    {problem.b}
                  </span>
                </div>

                <div className="w-48 h-20 md:w-80 md:h-32 bg-slate-950 border-2 border-indigo-500/40 rounded-2xl md:rounded-[48px] flex items-center justify-center shadow-indigo-500/20 mb-6 md:mb-10">
                   <div className="text-3xl md:text-6xl font-black text-indigo-400 font-mono tracking-widest animate-pulse">? ?</div>
                </div>

                <div className="w-full max-w-lg hidden md:block">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-slate-600 mb-4 font-black italic">
                    <span>Performance</span>
                    <span>{correctCount} Targets</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden p-0.5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (correctCount / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
                {problem.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(opt)}
                    className={`
                      h-24 md:h-36 text-3xl md:text-5xl font-mono font-bold rounded-2xl md:rounded-[32px] border-2 transition-all shadow-xl relative overflow-hidden group/btn
                      ${feedback === 'correct' && opt === problem.answer ? 'bg-emerald-600 border-emerald-400 text-white' : 
                        feedback === 'wrong' && opt !== problem.answer ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:border-indigo-400 hover:text-white hover:bg-slate-800'}
                    `}
                    disabled={feedback !== null}
                  >
                    <div className="relative z-10">{opt}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center pb-8">
        <button 
          onClick={onCancel}
          className="text-slate-600 font-black hover:text-indigo-400 uppercase text-[9px] md:text-[11px] tracking-widest px-8 md:px-12 py-3 md:py-4 bg-slate-950/40 rounded-full border border-slate-800/80 transition-all hover:bg-slate-900"
        >
          Disconnect
        </button>
      </div>


      <AnimatePresence>
        {showMascot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-12 right-12 z-[100] flex flex-col items-center"
          >
            <div className="bg-white text-indigo-900 font-black p-4 rounded-2xl rounded-br-none mb-2 shadow-2xl border-2 border-indigo-500">
              MEOW! YOU DID IT! 🔥
            </div>
            <div className="bg-indigo-600 p-4 rounded-full border-4 border-white shadow-2xl">
              <Cat size={64} className="text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
