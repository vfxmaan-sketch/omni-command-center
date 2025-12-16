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
  position,
  isDisabled,
  isPulsing,
  onClick,
}: SegmentButtonProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Button container */}
      <motion.button
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          "relative w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          !isDisabled && "cursor-pointer",
          isDisabled && "cursor-not-allowed opacity-80"
        )}
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
      >
        {/* Outer rotating gradient border (visible on hover) */}
        <motion.div
          className={cn(
            "absolute -inset-1 rounded-full opacity-0 transition-opacity duration-300",
            !isDisabled && "group-hover:opacity-100"
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(var(--neon-${color})), transparent)`,
          }}
          animate={!isDisabled ? { rotate: 360 } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Main ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 transition-all duration-300",
            styles.ring,
            styles.glow,
            !isDisabled && styles.hoverGlow
          )}
        />

        {/* Inner gradient background */}
        <div
          className={cn(
            "absolute inset-2 rounded-full bg-gradient-to-br",
            styles.gradient,
            "backdrop-blur-sm"
          )}
        />

        {/* Image container */}
        <div className="absolute inset-3 rounded-full overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Pulse effect on click */}
        {isPulsing && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full border-4",
              styles.ring
            )}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Breathing glow effect on hover */}
        {!isDisabled && (
          <motion.div
            className={cn(
              "absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300",
              "hover:opacity-100"
            )}
            animate={{
              boxShadow: [
                `0 0 30px hsl(var(--neon-${color}) / 0.3)`,
                `0 0 60px hsl(var(--neon-${color}) / 0.5)`,
                `0 0 30px hsl(var(--neon-${color}) / 0.3)`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <div className={cn("font-display text-lg font-bold", styles.text, styles.textGlow)}>
            {name}
          </div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </motion.button>

      {/* Connection line to center (decorative) */}
      <svg
        className="absolute pointer-events-none"
        style={{
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%',
          zIndex: -1,
        }}
      >
        <defs>
          <linearGradient id={`line-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(var(--neon-${color}))`} stopOpacity="0.6" />
            <stop offset="100%" stopColor={`hsl(var(--neon-${color}))`} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
