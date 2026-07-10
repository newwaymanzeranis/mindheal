export const DEFAULT_YOUTUBE_URL =
  "https://www.youtube.com/watch?v=9PFB2v_fEaA";

const YOUTUBE_ID_PATTERNS = [
  /(?:youtube\.com|youtube-nocookie\.com)\/watch\?(?:[^#]*&)?v=([a-zA-Z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9_-]{11})/i,
  /(?:youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9_-]{11})/i,
  /youtu\.be\/([a-zA-Z0-9_-]{11})/i,
];

export function extractYoutubeVideoId(url) {
  if (!url) return null;

  const trimmed = String(url).trim();
  for (const pattern of YOUTUBE_ID_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function normalizeYoutubeUrl(url) {
  const videoId = extractYoutubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function productYoutubeUrl(product) {
  const url = product?.youtubeUrl?.trim();
  if (!url) return DEFAULT_YOUTUBE_URL;
  return normalizeYoutubeUrl(url) || DEFAULT_YOUTUBE_URL;
}
