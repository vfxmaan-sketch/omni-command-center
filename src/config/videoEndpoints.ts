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
}

export const videoTriggerEndpoints: VideoEndpoint[] = [
  {
    id: 'sunset',
    name: 'Sunset',
    label: 'Segment 1',
    url: 'https://your-server.com/api/play/sunset',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'sunset',
    },
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    label: 'Segment 2',
    url: 'https://your-server.com/api/play/kitchen',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'kitchen',
    },
  },
  {
    id: 'flowers',
    name: 'Kitchen Flowers',
    label: 'Segment 3',
    url: 'https://your-server.com/api/play/flowers',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'flowers',
    },
  },
  {
    id: 'security',
    name: 'Security',
    label: 'Segment 4',
    url: 'https://your-server.com/api/play/security',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      action: 'play',
      segment: 'security',
    },
  },
];

// Auto-reset timeout in milliseconds (30 seconds)
export const PLAYBACK_TIMEOUT_MS = 30000;

// Endpoint to call when video finishes (optional)
// Set to null to use only the timeout reset
export const PLAYBACK_COMPLETE_WEBHOOK: string | null = null;
