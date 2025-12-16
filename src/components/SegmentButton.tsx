import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SegmentButtonProps {
  id: string;
  name: string;
  label: string;
  imageSrc: string;
  color: 'orange' | 'cyan' | 'red' | 'green';
  position: { x: string; y: string };
  isDisabled: boolean;
  isPulsing: boolean;
  onClick: () => void;
}

const colorStyles = {
  orange: {
    ring: 'border-neon-orange',
    glow: 'shadow-neon-orange',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(25_100%_55%/0.7),0_0_80px_hsl(25_100%_55%/0.4)]',
    text: 'text-neon-orange',
    textGlow: 'text-glow-orange',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  cyan: {
    ring: 'border-neon-cyan',
    glow: 'shadow-neon-cyan',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(190_100%_55%/0.7),0_0_80px_hsl(190_100%_55%/0.4)]',
    text: 'text-neon-cyan',
    textGlow: 'text-glow-cyan',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  red: {
    ring: 'border-neon-red',
    glow: 'shadow-neon-red',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(0_85%_55%/0.7),0_0_80px_hsl(0_85%_55%/0.4)]',
    text: 'text-neon-red',
    textGlow: 'text-glow-red',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
  green: {
    ring: 'border-neon-green',
    glow: 'shadow-neon-green',
    hoverGlow: 'hover:shadow-[0_0_40px_hsl(140_70%_50%/0.7),0_0_80px_hsl(140_70%_50%/0.4)]',
    text: 'text-neon-green',
    textGlow: 'text-glow-green',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
};

export function SegmentButton({
  id,
  name,
  label,
  imageSrc,
  color,
  isDisabled,
  isPulsing,
  onClick,
}: Omit<SegmentButtonProps, 'position'>) {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Plate-style button container */}
      <motion.button
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          "relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          !isDisabled && "cursor-pointer",
          isDisabled && "cursor-not-allowed opacity-80"
        )}
        whileHover={!isDisabled ? { scale: 1.08, y: -5 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
      >
        {/* Plate base shadow (table surface effect) */}
        <div className="absolute inset-0 rounded-full bg-black/30 blur-xl translate-y-4 scale-90" />

        {/* Outer rotating gradient border (visible on hover) */}
        <motion.div
          className={cn(
            "absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300",
            !isDisabled && "hover:opacity-100"
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(var(--neon-${color})), transparent, hsl(var(--neon-${color})), transparent)`,
          }}
          animate={!isDisabled ? { rotate: 360 } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Main ring - plate edge */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 transition-all duration-300",
            "bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-900/95",
            styles.ring,
            styles.glow,
            !isDisabled && styles.hoverGlow
          )}
        />

        {/* Inner plate surface */}
        <div
          className={cn(
            "absolute inset-3 rounded-full",
            "bg-gradient-to-br from-slate-600/50 via-slate-700/60 to-slate-800/70",
            "backdrop-blur-md border border-white/5"
          )}
        />

        {/* Image container */}
        <div className="absolute inset-5 rounded-full overflow-hidden shadow-inner">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />
        </div>

        {/* Glass reflection effect */}
        <div className="absolute inset-5 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

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

        {/* Breathing glow effect */}
        {!isDisabled && (
          <motion.div
            className="absolute -inset-3 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                `0 0 20px hsl(var(--neon-${color}) / 0.2)`,
                `0 0 40px hsl(var(--neon-${color}) / 0.4)`,
                `0 0 20px hsl(var(--neon-${color}) / 0.2)`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Label */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <div className={cn("font-display text-base sm:text-lg md:text-xl font-bold", styles.text, styles.textGlow)}>
            {name}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground/80">{label}</div>
        </div>
      </motion.button>
    </motion.div>
  );
}
