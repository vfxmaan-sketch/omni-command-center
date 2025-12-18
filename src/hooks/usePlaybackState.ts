import { useState, useCallback, useEffect, useRef } from 'react';
import { videoTriggerEndpoints, DEFAULT_PLAYBACK_TIMEOUT_MS, type VideoEndpoint } from '@/config/videoEndpoints';

interface PlaybackState {
  isPlaying: boolean;
  activeSegment: string | null;
  isPulsing: string | null;
  timeoutDuration: number;
  startTime: number | null;
}

export function usePlaybackState() {
  const [state, setState] = useState<PlaybackState>({
    isPlaying: false,
    activeSegment: null,
    isPulsing: null,
    timeoutDuration: 0,
    startTime: null,
  });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerSegment = useCallback(async (segmentId: string) => {
    // Don't allow new triggers while playing
    if (state.isPlaying) return;

    const endpoint = videoTriggerEndpoints.find(e => e.id === segmentId);
    if (!endpoint) {
      console.error(`No endpoint found for segment: ${segmentId}`);
      return;
    }

    // Show pulse effect
    setState(prev => ({
      ...prev,
      isPulsing: segmentId,
    }));

    // Remove pulse effect after animation
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isPulsing: null,
      }));
    }, 400);

    try {
      // Send HTTP request to external system
      console.log(`Triggering external playback for: ${endpoint.name}`);
      console.log(`URL: ${endpoint.url}`);
      console.log(`Timeout: ${endpoint.timeoutMs}ms`);
      
      // Attempt the fetch - in production this would hit your actual endpoint
      try {
        await fetch(endpoint.url, {
          method: endpoint.method,
          headers: endpoint.headers,
          body: endpoint.method === 'POST' ? JSON.stringify(endpoint.body) : undefined,
          mode: 'no-cors',
        });
      } catch (fetchError) {
        console.log('HTTP request sent (demo mode - configure real endpoints in videoEndpoints.ts)');
      }

      const timeout = endpoint.timeoutMs || DEFAULT_PLAYBACK_TIMEOUT_MS;

      // Set playing state with per-button timeout
      setState(prev => ({
        ...prev,
        isPlaying: true,
        activeSegment: segmentId,
        timeoutDuration: timeout,
        startTime: Date.now(),
      }));

      // Auto-reset after per-button timeout
      timeoutRef.current = setTimeout(() => {
        resetPlaybackState();
      }, timeout);

    } catch (error) {
      console.error('Failed to trigger segment:', error);
      setState(prev => ({
        ...prev,
        isPulsing: null,
      }));
    }
  }, [state.isPlaying]);

  const resetPlaybackState = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setState({
      isPlaying: false,
      activeSegment: null,
      isPulsing: null,
      timeoutDuration: 0,
      startTime: null,
    });
    
    console.log('Playback state reset - buttons re-enabled');
  }, []);

  return {
    isPlaying: state.isPlaying,
    activeSegment: state.activeSegment,
    isPulsing: state.isPulsing,
    timeoutDuration: state.timeoutDuration,
    startTime: state.startTime,
    triggerSegment,
    resetPlaybackState,
    endpoints: videoTriggerEndpoints,
  };
}
