import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface SegmentButtonProps {
  id: string;
  name: string;
  label: string;
  icon: LucideIcon;
  color: 'warm' | 'green' | 'cyan' | 'red';
  position: { x: string; y: string };
  isDisabled: boolean;
  isActive: boolean;
  isPulsing: boolean;
  timeoutDuration: number;
  startTime: number | null;
  onClick: () => void;
}

const colorStyles = {
  warm: {
    ring: 'border-amber-400',
    glow: 'shadow-[0_0_30px_hsl(38_92%_50%/0.5)]',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(38_92%_50%/0.7),0_0_80px_hsl(38_92%_50%/0.4)]',
    text: 'text-amber-400',
    textGlow: 'drop-shadow-[0_0_8px_hsl(38_92%_50%/0.8)]',
    gradient: 'from-amber-500/20 to-orange-500/20',
    strokeColor: 'hsl(38, 92%, 50%)',
    iconBg: 'from-amber-500/30 to-orange-500/30',
  },
  green: {
    ring: 'border-emerald-400',
    glow: 'shadow-[0_0_30px_hsl(160_84%_39%/0.5)]',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(160_84%_39%/0.7),0_0_80px_hsl(160_84%_39%/0.4)]',
    text: 'text-emerald-400',
    textGlow: 'drop-shadow-[0_0_8px_hsl(160_84%_39%/0.8)]',
    gradient: 'from-emerald-500/20 to-green-500/20',
    strokeColor: 'hsl(160, 84%, 39%)',
    iconBg: 'from-emerald-500/30 to-green-500/30',
  },
  cyan: {
    ring: 'border-cyan-400',
    glow: 'shadow-[0_0_30px_hsl(190_100%_55%/0.5)]',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(190_100%_55%/0.7),0_0_80px_hsl(190_100%_55%/0.4)]',
    text: 'text-cyan-400',
    textGlow: 'drop-shadow-[0_0_8px_hsl(190_100%_55%/0.8)]',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    strokeColor: 'hsl(190, 100%, 55%)',
    iconBg: 'from-cyan-500/30 to-blue-500/30',
  },
  red: {
    ring: 'border-rose-500',
    glow: 'shadow-[0_0_30px_hsl(0_85%_55%/0.5)]',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(0_85%_55%/0.7),0_0_80px_hsl(0_85%_55%/0.4)]',
    text: 'text-rose-500',
    textGlow: 'drop-shadow-[0_0_8px_hsl(0_85%_55%/0.8)]',
    gradient: 'from-rose-500/20 to-red-500/20',
    strokeColor: 'hsl(0, 85%, 55%)',
    iconBg: 'from-rose-500/30 to-red-500/30',
  },
};

export function SegmentButton({
  id,
  name,
  label,
  icon: Icon,
  color,
  isDisabled,
  isActive,
  isPulsing,
  timeoutDuration,
  startTime,
  onClick,
}: Omit<SegmentButtonProps, 'position'>) {
  const styles = colorStyles[color];
  const [progress, setProgress] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Countdown progress for active button
  useEffect(() => {
    if (!isActive || !startTime || !timeoutDuration) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / timeoutDuration) * 100, 100);
      setProgress(newProgress);
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, startTime, timeoutDuration]);

  // Handle touch ripple for inactive buttons during playback
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDisabled || isActive) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    const rippleId = Date.now();
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 600);
  };

  const isInactive = isDisabled && !isActive;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Plate-style button container */}
      <motion.button
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
        disabled={isDisabled}
        className={cn(
          "relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full transition-all duration-500",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          !isDisabled && "cursor-pointer",
          isDisabled && "cursor-not-allowed",
          // Grayed out state for inactive buttons during playback
          isInactive && "opacity-40 grayscale"
        )}
        whileHover={!isDisabled ? { scale: 1.08, y: -5 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
        animate={isInactive ? {
          y: [0, -3, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        } : {}}
      >
        {/* Plate base shadow (table surface effect) */}
        <div className="absolute inset-0 rounded-full bg-black/30 blur-xl translate-y-4 scale-90" />

        {/* Progress ring for active button */}
        {isActive && (
          <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={styles.strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 48} ${2 * Math.PI * 48}`}
              strokeDashoffset={2 * Math.PI * 48 * (1 - progress / 100)}
              style={{ filter: 'drop-shadow(0 0 8px ' + styles.strokeColor + ')' }}
            />
          </svg>
        )}

        {/* Outer rotating gradient border (visible on hover or when active) */}
        <motion.div
          className={cn(
            "absolute -inset-2 rounded-full transition-opacity duration-300",
            !isDisabled && "opacity-0 hover:opacity-100",
            isActive && "opacity-100"
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${styles.strokeColor}, transparent, ${styles.strokeColor}, transparent)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: isActive ? 2 : 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Main ring - plate edge */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 transition-all duration-500",
            "bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95",
            styles.ring,
            !isInactive && styles.glow,
            !isDisabled && styles.hoverGlow,
            isActive && "border-opacity-100",
            isInactive && "border-opacity-30"
          )}
        />

        {/* Inner plate surface */}
        <div
          className={cn(
            "absolute inset-3 rounded-full transition-all duration-500",
            "bg-gradient-to-br from-slate-600/50 via-slate-700/60 to-slate-800/70",
            "backdrop-blur-md border border-white/5",
            isInactive && "from-slate-700/30 via-slate-800/40 to-slate-900/50"
          )}
        />

        {/* Icon container */}
        <div className={cn(
          "absolute inset-5 rounded-full overflow-hidden shadow-inner flex items-center justify-center",
          "bg-gradient-to-br",
          styles.iconBg
        )}>
          <Icon 
            className={cn(
              "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-500",
              styles.text,
              isInactive && "opacity-60"
            )}
            strokeWidth={1.5}
          />
          
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
        </div>

        {/* Glass reflection effect */}
        <div className="absolute inset-5 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Touch ripple effect for inactive buttons */}
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Pulse effect on click */}
        {isPulsing && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full border-4",
              styles.ring
            )}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Breathing glow effect - enhanced for active, subtle for normal */}
        {!isInactive && (
          <motion.div
            className="absolute -inset-3 rounded-full pointer-events-none"
            animate={{
              boxShadow: isActive ? [
                `0 0 30px ${styles.strokeColor}`,
                `0 0 60px ${styles.strokeColor}`,
                `0 0 30px ${styles.strokeColor}`,
              ] : [
                `0 0 20px ${styles.strokeColor.replace(')', ' / 0.2)')}`,
                `0 0 40px ${styles.strokeColor.replace(')', ' / 0.4)')}`,
                `0 0 20px ${styles.strokeColor.replace(')', ' / 0.2)')}`,
              ],
            }}
            transition={{ duration: isActive ? 1.5 : 3, repeat: Infinity }}
          />
        )}

        {/* Label */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <div className={cn(
            "font-display text-base sm:text-lg md:text-xl font-bold transition-all duration-500",
            styles.text,
            !isInactive && styles.textGlow,
            isInactive && "opacity-50"
          )}>
            {name}
          </div>
          <div className={cn(
            "text-xs sm:text-sm text-muted-foreground/80 transition-all duration-500",
            isInactive && "opacity-50"
          )}>
            {label}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
