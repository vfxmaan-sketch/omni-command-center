import { motion } from 'framer-motion';
import { OmniaLogo } from './OmniaLogo';
import { SegmentButton } from './SegmentButton';
import { CircuitLines } from './CircuitLines';
import { usePlaybackState } from '@/hooks/usePlaybackState';
import { toast } from 'sonner';

import backgroundImage from '@/assets/futuristic-cityscape.jpg';
import sunsetIcon from '@/assets/sunset-icon.png';
import kitchenIcon from '@/assets/kitchen-icon.png';
import securityIcon from '@/assets/security-icon.png';
import flowersIcon from '@/assets/flowers-icon.png';

const segmentConfig = [
  {
    id: 'sunset',
    name: 'Sunset',
    label: 'Segment 1',
    imageSrc: sunsetIcon,
    color: 'orange' as const,
    position: { x: '25%', y: '25%' },
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    label: 'Segment 2',
    imageSrc: kitchenIcon,
    color: 'cyan' as const,
    position: { x: '75%', y: '25%' },
  },
  {
    id: 'flowers',
    name: 'Kitchen Flowers',
    label: 'Segment 3',
    imageSrc: flowersIcon,
    color: 'green' as const,
    position: { x: '75%', y: '75%' },
  },
  {
    id: 'security',
    name: 'Security',
    label: 'Segment 4',
    imageSrc: securityIcon,
    color: 'red' as const,
    position: { x: '25%', y: '75%' },
  },
];

export function SmartHomeDashboard() {
  const { isPlaying, isPulsing, triggerSegment, resetPlaybackState } = usePlaybackState();

  const handleSegmentClick = (segmentId: string, segmentName: string) => {
    if (isPlaying) {
      toast.info('Please wait for current playback to finish');
      return;
    }
    
    triggerSegment(segmentId);
    toast.success(`Command sent: ${segmentName}`, {
      description: 'External playback triggered',
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Futuristic table surface background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Table surface texture - subtle grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient glow from table edges */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/80" />

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      {/* Animated circuit lines */}
      <CircuitLines />

      {/* Main content - tablet optimized landscape layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 md:p-8">
        {/* Table surface container */}
        <div className="relative w-full max-w-6xl aspect-[16/10] bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl border border-neon-cyan/20 shadow-[0_0_60px_rgba(0,200,255,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm overflow-hidden">
          
          {/* Inner table glow effect */}
          <div className="absolute inset-4 rounded-2xl border border-neon-cyan/10 bg-gradient-to-br from-slate-800/30 via-transparent to-slate-900/30" />
          
          {/* Center logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <OmniaLogo />
          </div>

          {/* Segment buttons as plates on table - 2x2 grid around center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {segmentConfig.map((segment) => (
              <div
                key={segment.id}
                className="absolute"
                style={{
                  left: segment.position.x,
                  top: segment.position.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <SegmentButton
                  {...segment}
                  isDisabled={isPlaying}
                  isPulsing={isPulsing === segment.id}
                  onClick={() => handleSegmentClick(segment.id, segment.name)}
                />
              </div>
            ))}
          </div>

          {/* Connection lines from center to segments */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <defs>
              <linearGradient id="line-orange" x1="50%" y1="50%" x2="25%" y2="25%">
                <stop offset="0%" stopColor="hsl(190 100% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(25 100% 55%)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="line-cyan" x1="50%" y1="50%" x2="75%" y2="25%">
                <stop offset="0%" stopColor="hsl(190 100% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(190 100% 55%)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="line-green" x1="50%" y1="50%" x2="75%" y2="75%">
                <stop offset="0%" stopColor="hsl(190 100% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(140 70% 50%)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="line-red" x1="50%" y1="50%" x2="25%" y2="75%">
                <stop offset="0%" stopColor="hsl(190 100% 55%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(0 85% 55%)" stopOpacity="0.3" />
              </linearGradient>
              <filter id="line-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Lines from center to each segment */}
            <motion.line
              x1="50%" y1="50%" x2="25%" y2="25%"
              stroke="url(#line-orange)"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              filter="url(#line-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="50%" y1="50%" x2="75%" y2="25%"
              stroke="url(#line-cyan)"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              filter="url(#line-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.line
              x1="50%" y1="50%" x2="75%" y2="75%"
              stroke="url(#line-green)"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              filter="url(#line-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.line
              x1="50%" y1="50%" x2="25%" y2="75%"
              stroke="url(#line-red)"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              filter="url(#line-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />

            {/* Animated particles along lines */}
            {segmentConfig.map((segment, i) => (
              <motion.circle
                key={`particle-${segment.id}`}
                r="4"
                fill={`hsl(var(--neon-${segment.color}))`}
                filter="url(#line-glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: ['50%', segment.position.x],
                  cy: ['50%', segment.position.y],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Status indicator */}
      {isPlaying && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="bg-card/90 backdrop-blur-md border border-neon-cyan/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-neon-cyan">
            <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-sm font-display text-foreground">
              External playback in progress...
            </span>
            <button
              onClick={resetPlaybackState}
              className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
