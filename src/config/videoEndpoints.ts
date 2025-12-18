/**
 * VIDEO TRIGGER ENDPOINTS CONFIGURATION
 * 
 * Edit these URLs to point to your external media server or webhook endpoints.
 * Each segment button will send an HTTP request to its corresponding endpoint.
 * 
 * Example endpoints:
 * - Home automation webhooks (Home Assistant, OpenHAB)
 * - Media server APIs (Plex, Jellyfin)
 * - Custom webhook URLs
 */

export interface VideoEndpoint {
  id: string;
  name: string;
  label: string;
  url: string;
  method: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  timeoutMs: number; // Per-button unlock time in milliseconds
}

export const videoTriggerEndpoints: VideoEndpoint[] = [
  {
    id: 'ai-home',
    name: 'AI Home Assistant',
    label: 'Smart Living',
    url: 'https://your-server.com/api/play/ai-home',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'ai-home',
    },
    timeoutMs: 30000, // 30 seconds
  },
  {
    id: 'food-intelligence',
    name: 'Food Intelligence',
    label: 'Healthy Living',
    url: 'https://your-server.com/api/play/food-intelligence',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'food-intelligence',
    },
    timeoutMs: 30000, // 30 seconds
  },
  {
    id: 'life-tech',
    name: 'Life-Elevating Tech',
    label: '3D Printing',
    url: 'https://your-server.com/api/play/life-tech',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'life-tech',
    },
    timeoutMs: 30000, // 30 seconds
  },
  {
    id: 'safety',
    name: 'Safety & Security',
    label: 'Protection',
    url: 'https://your-server.com/api/play/safety',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'safety',
    },
    timeoutMs: 30000, // 30 seconds
  },
];

// Default timeout if not specified per-button (30 seconds)
export const DEFAULT_PLAYBACK_TIMEOUT_MS = 30000;

// Endpoint to call when video finishes (optional)
// Set to null to use only the timeout reset
export const PLAYBACK_COMPLETE_WEBHOOK: string | null = null;
