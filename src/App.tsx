/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Settings, 
  Play, 
  UserPlus, 
  UserMinus, 
  ChevronLeft, 
  Smartphone, 
  Eye, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  History,
  Volume2,
  VolumeX,
  Target,
  Utensils,
  Tv,
  Globe,
  MapPin,
  Dog,
  Gamepad2,
  LayoutGrid,
  Info
} from 'lucide-react';
import { CATEGORIES } from './constants';
import { Player, GameSettings, GameStep, RoundData } from './types';

// --- Utilities ---
const vibrate = (pattern: number | number[] = 50) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

const playSound = (type: 'tap' | 'reveal' | 'success' | 'fail') => {
  // We can use the Web Audio API or just skip for now to keep it lightweight.
  // For now, vibration is a better "offline/party" feedback.
  vibrate(type === 'reveal' ? [50, 100, 50] : 30);
};

const CategoryIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, any> = {
    Utensils,
    Trophy,
    Tv,
    Globe,
    MapPin,
    Dog,
    Gamepad2
  };
  const Icon = icons[name] || LayoutGrid;
  return <Icon className={className} />;
};

export default function App() {
  // --- State ---
  const [step, setStep] = useState<GameStep>('home');
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('spy_players');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'لاعب 1' },
      { id: '2', name: 'لاعب 2' },
      { id: '3', name: 'لاعب 3' },
    ];
  });
  
  const [settings, setSettings] = useState<GameSettings>({
    category: CATEGORIES[0].id,
    spyCount: 1,
    timerSeconds: 120,
  });

  const [roundData, setRoundData] = useState<RoundData | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('spy_players', JSON.stringify(players));
  }, [players]);

  // --- Handlers ---
  const addPlayer = () => {
    if (players.length >= 50) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setPlayers([...players, { id: newId, name: `لاعب ${players.length + 1}` }]);
    vibrate(20);
  };

  const removePlayer = (id: string) => {
    if (players.length <= 1) return;
    setPlayers(players.filter(p => p.id !== id));
    vibrate(20);
  };

  const updatePlayerName = (id: string, name: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, name } : p));
  };

  const startGame = () => {
    if (players.length < 3) {
      alert('تحتاج إلى 3 لاعبين على الأقل للعب!');
      vibrate([50, 100, 50]);
      return;
    }
    const category = CATEGORIES.find(c => c.id === settings.category) || CATEGORIES[0];
    const randomIndex = Math.floor(Math.random() * category.pairs.length);
    const pair = category.pairs[randomIndex];
    
    // Choose spies
    const spyIndices: number[] = [];
    const availableIndices = Array.from({ length: players.length }, (_, i) => i);
    
    for (let i = 0; i < settings.spyCount; i++) {
        if (availableIndices.length === 0) break;
        const rand = Math.floor(Math.random() * availableIndices.length);
        spyIndices.push(availableIndices.splice(rand, 1)[0]);
    }

    setRoundData({
      secretWord: pair.word,
      spyIndices,
      players: [...players].sort(() => Math.random() - 0.5), // Shuffle players for the pass sequence
      currentPlayerIndex: 0,
      categoryName: category.name
    });
    
    setStep('pass_phone');
    vibrate([100, 50, 100]);
  };

  const nextReveal = () => {
    if (!roundData) return;
    setIsRevealed(false);
    if (roundData.currentPlayerIndex < roundData.players.length - 1) {
      setRoundData({
        ...roundData,
        currentPlayerIndex: roundData.currentPlayerIndex + 1
      });
      setStep('pass_phone');
    } else {
      setTimeLeft(settings.timerSeconds);
      setStep('in_round');
    }
  };

  // --- Timer ---
  useEffect(() => {
    let interval: any;
    if (step === 'in_round' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  // --- Render Helpers ---
  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 space-y-8 relative"
    >
      <button 
        onClick={() => { vibrate(20); setShowCredits(!showCredits); }}
        className="absolute top-4 left-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-all active:scale-95"
      >
        <Info className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {showCredits && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-16 left-4 z-50 panel-glass p-3 text-right space-y-1 min-w-[150px]"
          >
            <div className="text-[10px] text-cyan-400 font-black uppercase tracking-tighter">صنع من طرف عمك يحيى بنموسى</div>
            <div className="text-[10px] text-purple-400 font-black uppercase tracking-tighter">فكرة عبد الله محداش</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute -inset-4 bg-purple-600/30 blur-3xl rounded-full" />
        <Target className="w-24 h-24 text-cyan-400 relative z-10 animate-pulse" />
      </div>
      
      <div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter title-glow mb-2">مَـن المُـحتـال؟</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs sm:text-sm">أوفلاين بالكامل • جاهز للبدء</p>
      </div>

      <div className="w-full space-y-4 pt-4 sm:pt-8">
        <button 
          onClick={() => setStep('player_setup')}
          className="w-full py-4 sm:py-5 btn-immersive text-lg sm:text-xl flex items-center justify-center gap-3"
        >
          <Play className="fill-current w-5 h-5" />
          ابدأ اللعب
        </button>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="panel-glass p-4 sm:p-6 flex flex-col items-center gap-2 border-white/5">
            <Users className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-white font-black text-base sm:text-lg">{players.length} لاعبين</span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold">جاهزون للمواجهة</span>
          </div>
          <div className="panel-glass p-4 sm:p-6 flex flex-col items-center gap-2 border-white/5">
            <History className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-white font-black text-base sm:text-lg">النتائج</span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold">سجل الجولات</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPlayerSetup = () => (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-4 lg:p-8 space-y-6 lg:grid lg:grid-cols-[330px_1fr] lg:gap-8 lg:items-start"
    >
      {/* Sidebar-like panel for settings on large screens, or top section on mobile */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setStep('home')} className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black title-glow">الإعدادات</h2>
            <button 
              onClick={() => { vibrate(20); setShowCredits(!showCredits); }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-all"
              title="المطورون"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showCredits && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="panel-glass p-3 text-right space-y-1 mb-4 border-cyan-500/20">
                <div className="text-[10px] text-cyan-400 font-black uppercase tracking-tighter">صنع من طرف عمك يحيى بنموسى</div>
                <div className="text-[10px] text-purple-400 font-black uppercase tracking-tighter">فكرة عبد الله محداش</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="panel-glass p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-3">
                <label className="text-[11px] sm:text-[12px] text-slate-400 font-black uppercase flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-cyan-400" /> فئات اللعب (50+)
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => { vibrate(20); setSettings({...settings, category: cat.id}); }}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all border flex items-center gap-1.5 sm:gap-2 ${
                                settings.category === cat.id 
                                ? 'bg-violet-600/20 border-violet-500 text-white shadow-lg shadow-violet-500/20' 
                                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                            }`}
                        >
                            <CategoryIcon name={cat.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-3 sm:pt-4 border-t border-white/5">
                <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] sm:text-[12px] text-slate-400 font-black uppercase">عدد المحتالين</label>
                    <div className="flex items-center gap-2 sm:gap-4 bg-black/40 p-1 rounded-xl border border-white/5">
                        <button 
                            onClick={() => { vibrate(10); setSettings({...settings, spyCount: Math.max(1, settings.spyCount - 1)}); }}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-black text-violet-400 text-lg sm:text-xl"
                        >–</button>
                        <span className="text-white font-black text-base sm:text-lg w-5 sm:w-6 text-center">{settings.spyCount}</span>
                        <button 
                            onClick={() => { vibrate(10); setSettings({...settings, spyCount: Math.min(Math.floor(players.length / 3), settings.spyCount + 1)}); }}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-black text-violet-400 text-lg sm:text-xl"
                        >+</button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1 sm:pt-2">
                    <label className="text-[11px] sm:text-[12px] text-slate-400 font-black uppercase">المؤقت (ثانية)</label>
                    <select 
                        value={settings.timerSeconds}
                        onChange={(e) => { vibrate(10); setSettings({...settings, timerSeconds: Number(e.target.value)}); }}
                        className="bg-black/40 text-white font-black px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-xl border border-white/5 outline-none appearance-none cursor-pointer hover:bg-black/60 transition-colors"
                    >
                        <option value={30}>30</option>
                        <option value={60}>60</option>
                        <option value={120}>120</option>
                        <option value={180}>180</option>
                        <option value={300}>300</option>
                    </select>
                </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-[10px] sm:text-[11px] font-black text-cyan-400 px-2 py-0.5 rounded uppercase mb-1">الكلمات المتشابهة مفعلة</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 opacity-70">(مثال: نمر / قطة)</div>
            </div>
        </div>
      </div>

      {/* Players Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between px-2">
            <h3 className="text-xl sm:text-2xl font-black title-glow flex items-center gap-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" /> اللاعبون ({players.length})
            </h3>
            <button 
                onClick={addPlayer}
                className="p-2 sm:p-3 bg-cyan-600/20 text-cyan-400 rounded-xl hover:bg-cyan-600/30 transition-all active:scale-90"
            >
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {players.map((player, idx) => (
                <motion.div 
                    layout
                    key={player.id} 
                    className="card-immersive p-3 sm:p-4 flex items-center gap-3 sm:gap-4 group focus-within:ring-2 ring-violet-500/50"
                >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-full text-[10px] sm:text-xs font-black shadow-lg">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <input 
                        type="text" 
                        value={player.name}
                        onChange={(e) => updatePlayerName(player.id, e.target.value)}
                        className="flex-1 bg-transparent text-white font-bold text-sm sm:text-base outline-none placeholder:text-slate-600"
                        placeholder="اسم اللاعب..."
                    />
                    <button 
                        onClick={() => removePlayer(player.id)}
                        className="p-1.5 sm:p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="حذف اللاعب"
                    >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </motion.div>
            ))}
            
            <button 
              onClick={addPlayer}
              className="w-full p-3 sm:p-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 sm:gap-3 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all group"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span className="font-bold text-sm sm:text-base">إضافة لاعب جديد</span>
            </button>
        </div>

        <div className="pt-2 sm:pt-4 lg:pt-8">
            <button 
                onClick={() => { vibrate([50, 50, 50]); startGame(); }}
                className="w-full py-4 sm:py-6 btn-immersive text-xl sm:text-2xl shadow-violet-600/30"
            >
                ابدأ الجولة ({players.length} لاعبين)
            </button>
        </div>
      </div>
    </motion.div>
  );

  const renderPassPhone = () => {
    if (!roundData) return null;
    const currentPlayer = roundData.players[roundData.currentPlayerIndex];
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4 sm:p-6 space-y-8 sm:space-y-12"
      >
        <div className="w-full panel-glass p-8 sm:p-12 space-y-6 sm:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400 mx-auto animate-bounce filter drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white">مرر الهاتف لـ...</h2>
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="py-4 sm:py-6 px-8 sm:px-10 bg-gradient-to-br from-violet-600 to-blue-600 text-white text-3xl sm:text-5xl font-black rounded-[24px] sm:rounded-[32px] shadow-2xl inline-block"
              >
                  {currentPlayer.name}
              </motion.div>
            </div>
            
            <p className="text-slate-400 text-sm sm:text-base font-medium">تأكد أن لا أحد يرى شاشتك قبل الضغط</p>
        </div>

        <button 
            onClick={() => setStep('reveal_word')}
            className="w-full py-4 sm:py-6 btn-immersive text-xl sm:text-2xl flex items-center justify-center gap-3 sm:gap-4"
        >
            <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
            عرض الكلمة
        </button>
      </motion.div>
    );
  };

  const renderRevealWord = () => {
    if (!roundData) return null;
    const isSpy = roundData.spyIndices.includes(roundData.currentPlayerIndex);
    
    return (
      <motion.div 
        initial={{ opacity: 0, rotateY: 90 }} 
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: -90 }}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4 sm:p-6 space-y-6 sm:space-y-8"
      >
        <div className={`w-full panel-glass p-8 sm:p-12 space-y-6 sm:space-y-8 relative overflow-hidden ${isSpy ? 'ring-2 ring-red-500/50 shadow-2xl shadow-red-500/20' : 'ring-2 ring-cyan-500/50 shadow-2xl shadow-cyan-500/20'}`}>
            {isSpy && <div className="absolute top-0 right-0 p-2 sm:p-3 bg-red-600 text-white text-[10px] sm:text-xs font-black px-4 sm:px-6 rounded-bl-3xl shadow-lg">محـتال 🎭</div>}
            
            <div className="space-y-4 sm:space-y-6">
                <p className="text-slate-500 text-xs sm:text-sm font-black uppercase tracking-widest">مهمتك السرية...</p>
                {isRevealed ? (
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <h2 className={`text-4xl sm:text-7xl font-black ${isSpy ? 'text-red-500' : 'text-cyan-400'} tracking-tighter filter drop-shadow-lg break-words`}>
                            {isSpy ? 'أنت الجاسوس!' : roundData.secretWord}
                        </h2>
                        {!isSpy && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="px-3 py-0.5 sm:px-4 sm:py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] sm:text-xs font-black uppercase border border-emerald-500/30">فريق الأبرياء</div>
                                <p className="text-slate-400 text-xs sm:text-sm font-medium italic px-4">أنت مع الفريق، حاول كشف المحتال بذكاء!</p>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-full mx-auto flex items-center justify-center cursor-pointer shadow-inner relative group" 
                      onClick={() => { setIsRevealed(true); vibrate([50, 100]); }}
                    >
                        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Eye className="w-12 h-12 sm:w-16 sm:h-16 text-slate-500 group-hover:text-cyan-400 transition-colors relative z-10" />
                    </motion.div>
                )}
            </div>

            <div className="pt-4 sm:pt-6 border-t border-white/5">
                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest truncate block">التصنيف: {roundData.categoryName}</span>
            </div>
        </div>

        <button 
            disabled={!isRevealed}
            onClick={() => { vibrate(30); nextReveal(); }}
            className={`w-full py-4 sm:py-6 text-xl sm:text-2xl flex items-center justify-center gap-3 sm:gap-4 ${isRevealed ? 'btn-immersive' : 'bg-white/5 text-slate-700 pointer-events-none'}`}
        >
            اللاعب التالي
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </motion.div>
    );
  };

  const renderInRound = () => {
    if (!roundData) return null;
    const isTimeLow = timeLeft < 30;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="p-4 sm:p-6 space-y-6 sm:space-y-8 flex flex-col min-h-[90vh] lg:grid lg:grid-cols-[1fr_350px] lg:gap-12 lg:items-start"
      >
        <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-4xl font-black title-glow">وقت المواجهة!</h2>
                <div className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-3 rounded-full sm:rounded-[24px] font-mono font-black text-xl sm:text-2xl shadow-xl transition-all ${isTimeLow ? 'bg-red-600 text-white animate-pulse shadow-red-600/40' : 'bg-white text-black shadow-white/10'}`}>
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                </div>
            </div>

            <div className="panel-glass p-6 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-10 relative overflow-hidden min-h-[40vh] sm:min-h-[50vh]">
                <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 to-transparent pointer-events-none" />
                
                <div className="relative">
                    <div className="absolute inset-0 bg-cyan-400/30 blur-[60px] rounded-full animate-pulse" />
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[30px] sm:rounded-[40px] flex items-center justify-center shadow-2xl relative rotate-3 group-hover:rotate-0 transition-transform">
                        <Users className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6 max-w-sm">
                    <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tighter">ابدأ الاستجواب</h3>
                    <p className="text-slate-400 text-sm sm:text-lg leading-relaxed px-4">
                        اسأل الآخرين أسئلة ذكية لكشف المحتال، ولكن انتبه لا تلمّح للكلمة كثيراً حتى لا يكتشفها المحتال!
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full pt-4 sm:pt-8">
                    <div className="p-3 sm:p-5 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/5 backdrop-blur-sm">
                        <p className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-black mb-1">الفئة</p>
                        <p className="text-white font-black text-sm sm:text-lg truncate">{roundData.categoryName}</p>
                    </div>
                    <div className="p-3 sm:p-5 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/5 backdrop-blur-sm">
                        <p className="text-slate-500 text-[9px] sm:text-[10px] uppercase font-black mb-1">المطلوب كشفهم</p>
                        <p className="text-white font-black text-sm sm:text-lg">{settings.spyCount} محتال</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-4 sm:space-y-6 flex flex-col h-full justify-center">
             <div className="panel-glass p-5 sm:p-6 space-y-3 sm:space-y-4">
                <h4 className="text-[10px] sm:text-sm font-black text-slate-500 uppercase tracking-widest">نصائح الفريق</h4>
                <ul className="space-y-2 sm:space-y-3 text-[10px] sm:text-xs text-slate-300">
                    <li className="flex gap-2"><span>🛡️</span> أسئلتك يجب أن تكون مبهمة للأبرياء وواضحة لهم</li>
                    <li className="flex gap-2"><span>👀</span> راقب ردود الأفعال السريعة</li>
                    <li className="flex gap-2"><span>🤐</span> لا تذكر تفاصيل دقيقة عن الكلمة</li>
                </ul>
             </div>

             <button 
                onClick={() => { vibrate(100); setStep('voting'); }}
                className="w-full py-4 sm:py-6 btn-immersive text-xl sm:text-2xl shadow-violet-600/40"
             >
                انتهى الوقت / بدأت المحاكمة
             </button>
             
             <button 
                onClick={() => {
                    vibrate(10);
                    if (confirm('هل تريد إنهاء الجولة والعودة للرئيسية؟')) {
                        setStep('home');
                    }
                }}
                className="w-full py-2 sm:py-4 text-slate-600 font-bold hover:text-slate-400 transition-colors text-sm sm:text-base"
             >
                هروب من الجولة
             </button>
        </div>
      </motion.div>
    );
  };

  const renderVoting = () => (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 space-y-6 sm:space-y-8 flex flex-col min-h-[90vh] items-center justify-center max-w-2xl mx-auto"
    >
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-600/20 text-red-500 border border-red-500/30 rounded-full inline-block text-[10px] sm:text-xs font-black uppercase tracking-tighter">محاكمة علنية</div>
        <h2 className="text-3xl sm:text-5xl font-black title-glow">وقت التصويت</h2>
        <p className="text-slate-400 text-base sm:text-lg">اتفقوا على من تشكون فيه، ثم استعدوا للحقيقة</p>
      </div>

      <div className="panel-glass p-4 sm:p-8 w-full max-h-[50vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {roundData?.players.map((player, idx) => (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    key={idx} 
                    className="p-3 sm:p-5 bg-white/5 rounded-[20px] sm:rounded-3xl flex flex-col items-center gap-2 sm:gap-3 border border-white/5 transition-all hover:bg-white/10"
                  >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800 text-slate-400 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black shadow-inner">
                        {idx + 1}
                      </div>
                      <span className="text-white font-black truncate w-full text-center text-xs sm:text-sm">{player.name}</span>
                  </motion.div>
              ))}
          </div>
      </div>

      <button 
        onClick={() => { vibrate([50, 150, 50]); setStep('results'); }}
        className="w-full max-w-xs sm:max-w-sm py-4 sm:py-6 btn-immersive text-xl sm:text-2xl animate-pulse"
      >
        كشف الحقيقة 🎭
      </button>
    </motion.div>
  );

  const renderResults = () => {
    if (!roundData) return null;
    const spies = roundData.spyIndices.map(idx => roundData.players[idx]);
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4 sm:p-6 space-y-8 sm:space-y-12"
      >
        <div className="w-full panel-glass p-8 sm:p-12 space-y-6 sm:space-y-10 relative overflow-hidden bg-gradient-to-b from-red-950/20 to-black/20 border-red-500/30">
            <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-red-600/10 blur-[100px] rounded-full" />
            
            <div className="space-y-3 sm:space-y-4">
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto filter drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]" />
                <h2 className="text-2xl sm:text-4xl font-black title-glow">المحتال هو...</h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
                {spies.map((spy, i) => (
                    <motion.div 
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.3, type: 'spring' }}
                        className="py-4 sm:py-8 px-8 sm:px-16 bg-gradient-to-br from-red-600 to-red-800 text-white text-3xl sm:text-5xl font-black rounded-[24px] sm:rounded-[36px] shadow-[0_20px_50px_rgba(220,38,38,0.4)] border-t border-white/20"
                    >
                        {spy.name}
                    </motion.div>
                ))}
            </div>

            <div className="pt-6 sm:pt-10 border-t border-white/5 space-y-3 sm:space-y-4">
                <div className="px-4 sm:px-6 py-2 bg-white/5 rounded-full inline-block">
                  <span className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-widest sm:ml-3 ml-2">الكلمة السرية:</span>
                  <span className="text-cyan-400 text-xl sm:text-2xl font-black tracking-tight">{roundData.secretWord}</span>
                </div>
            </div>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4">
            <button 
                onClick={() => { vibrate(50); startGame(); }}
                className="w-full py-4 sm:py-6 btn-immersive text-xl sm:text-2xl shadow-emerald-600/30"
            >
                جولة جديدة فوراً
            </button>
            <button 
                onClick={() => setStep('home')}
                className="w-full py-3 sm:py-4 text-slate-500 font-black hover:text-white transition-colors text-sm sm:text-base"
            >
                العودة للرئيسية
            </button>
        </div>
      </motion.div>
    );
  };


  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden" dir="rtl">
      <main className="relative z-10 w-full max-w-6xl mx-auto min-h-screen px-4">
        <AnimatePresence mode="wait">
          {step === 'home' && renderHome()}
          {step === 'player_setup' && renderPlayerSetup()}
          {step === 'pass_phone' && renderPassPhone()}
          {step === 'reveal_word' && renderRevealWord()}
          {step === 'in_round' && renderInRound()}
          {step === 'voting' && renderVoting()}
          {step === 'results' && renderResults()}
        </AnimatePresence>
      </main>

      {/* Persistent Audio Controls */}
      <div className="fixed bottom-8 left-8 z-50 flex gap-4">
        <div className="panel-glass px-4 py-2 flex items-center gap-4 bg-black/60 shadow-2xl">
          <button 
            onClick={() => { vibrate(20); setIsMuted(!isMuted); }}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap');
      `}} />
    </div>
  );
}
