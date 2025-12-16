import { motion } from 'framer-motion';

export function OmniaLogo() {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-neon-blue/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          boxShadow: '0 0 30px hsl(220 100% 60% / 0.3), inset 0 0 30px hsl(220 100% 60% / 0.1)',
        }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-neon-cyan/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          boxShadow: '0 0 20px hsl(190 100% 55% / 0.4)',
        }}
      />
      
      {/* Inner glowing circle */}
      <div 
        className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center"
        style={{
          boxShadow: '0 0 40px hsl(220 100% 60% / 0.5), 0 0 80px hsl(190 100% 55% / 0.3)',
        }}
      >
        {/* Logo content */}
        <div className="text-center">
          {/* Neural network icon */}
          <svg 
            className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-1 text-slate-800"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {/* Central node */}
            <circle cx="50" cy="50" r="8" />
            
            {/* Outer nodes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 30;
              const y = 50 + Math.sin(rad) * 30;
              return (
                <g key={i}>
                  <line 
                    x1="50" y1="50" 
                    x2={x} y2={y} 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                  <circle cx={x} cy={y} r="4" />
                </g>
              );
            })}
          </svg>
          
          {/* Arabic text */}
          <div className="text-2xl md:text-3xl font-bold text-slate-800" style={{ fontFamily: 'serif' }}>
            أُمنية
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}
