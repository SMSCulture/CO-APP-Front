import { WebView } from 'react-native-webview';

import { radius } from '../../design/tokens';

function embedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?playsinline=1` : url;
}

export function InlineVideo({ url, title }: { url: string; title: string }) {
  return (
    <WebView
      source={{ uri: embedUrl(url) }}
      allowsFullscreenVideo
      mediaPlaybackRequiresUserAction
      accessibilityLabel={title}
      style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: radius.xl }}
    />
  );
}
