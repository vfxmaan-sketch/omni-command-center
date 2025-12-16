import { useState, useCallback, useEffect, useRef } from 'react';
import { videoTriggerEndpoints, PLAYBACK_TIMEOUT_MS, type VideoEndpoint } from '@/config/videoEndpoints';

interface PlaybackState {
  isPlaying: boolean;
  activeSegment: string | null;
  isPulsing: string | null;
}

export function usePlaybackState() {
  const [state, setState] = useState<PlaybackState>({
    isPlaying: false,
    activeSegment: null,
    isPulsing: null,
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
      
      // Attempt the fetch - in production this would hit your actual endpoint
      // For demo purposes, we'll catch the error and proceed
      try {
        await fetch(endpoint.url, {
          method: endpoint.method,
          headers: endpoint.headers,
          body: endpoint.method === 'POST' ? JSON.stringify(endpoint.body) : undefined,
          mode: 'no-cors', // Allow cross-origin requests
        });
      } catch (fetchError) {
        // Expected to fail with demo URLs - in production, your real endpoints would work
        console.log('HTTP request sent (demo mode - configure real endpoints in videoEndpoints.ts)');
      }

      // Set playing state - disable all buttons
      setState(prev => ({
        ...prev,
        isPlaying: true,
        activeSegment: segmentId,
      }));

      // Auto-reset after timeout
      timeoutRef.current = setTimeout(() => {
        resetPlaybackState();
      }, PLAYBACK_TIMEOUT_MS);

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
    });
    
    console.log('Playback state reset - buttons re-enabled');
  }, []);

  return {
    isPlaying: state.isPlaying,
    activeSegment: state.activeSegment,
    isPulsing: state.isPulsing,
    triggerSegment,
    resetPlaybackState,
    endpoints: videoTriggerEndpoints,
  };
}
