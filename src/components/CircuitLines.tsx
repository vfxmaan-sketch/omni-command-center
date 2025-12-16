import { motion } from 'framer-motion';

export function CircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="circuit-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(190 100% 55%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(190 100% 55%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(190 100% 55%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="circuit-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 100% 60%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(220 100% 60%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(220 100% 60%)" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Horizontal lines */}
      {[20, 40, 60, 80].map((y, i) => (
        <motion.line
          key={`h-${i}`}
          x1="0%"
          y1={`${y}%`}
          x2="100%"
          y2={`${y}%`}
          stroke="url(#circuit-gradient-1)"
          strokeWidth="1"
          strokeDasharray="10 20"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: i * 0.2 }}
        />
      ))}

      {/* Vertical lines */}
      {[20, 40, 60, 80].map((x, i) => (
        <motion.line
          key={`v-${i}`}
          x1={`${x}%`}
          y1="0%"
          x2={`${x}%`}
          y2="100%"
          stroke="url(#circuit-gradient-2)"
          strokeWidth="1"
          strokeDasharray="10 20"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: i * 0.2 + 0.5 }}
        />
      ))}

      {/* Glowing nodes at intersections */}
      {[
        { x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 }, { x: 80, y: 20 },
        { x: 20, y: 40 }, { x: 80, y: 40 },
        { x: 20, y: 60 }, { x: 80, y: 60 },
        { x: 20, y: 80 }, { x: 40, y: 80 }, { x: 60, y: 80 }, { x: 80, y: 80 },
      ].map((pos, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={`${pos.x}%`}
          cy={`${pos.y}%`}
          r="3"
          fill="hsl(190 100% 55%)"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ 
            duration: 3,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}
    </svg>
  );
}
