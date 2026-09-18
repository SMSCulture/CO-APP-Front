import { createElement } from 'react';

function embedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?playsinline=1` : url;
}

export function InlineVideo({ url, title }: { url: string; title: string }) {
  return createElement('iframe', {
    src: embedUrl(url),
    title,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
    style: {
      width: '100%',
      aspectRatio: '16 / 9',
      border: 0,
      borderRadius: 20,
      background: '#000',
    },
  });
}
