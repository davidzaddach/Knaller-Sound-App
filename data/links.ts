export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  color: string;
}

export interface MusicLink {
  id: string;
  title: string;
  subtitle: string;
  spotifyUrl: string;
  spotifyUri: string;
  coverEmoji: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    platform: 'Instagram',
    label: '@knallersoundsystem',
    url: 'https://www.instagram.com/knallersoundsystem',
    icon: 'camera',
    color: '#E4405F',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    label: '@knallersoundsystem',
    url: 'https://www.tiktok.com/@knallersoundsystem',
    icon: 'musical-notes',
    color: '#000000',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    label: 'Knallersoundsystem',
    url: 'https://www.youtube.com/@Knallersoundsystem',
    icon: 'play-circle',
    color: '#FF0000',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    label: 'Knaller Sound',
    url: 'https://www.linkedin.com/company/knaller-sound',
    icon: 'briefcase',
    color: '#0A66C2',
  },
];

export const musicLinks: MusicLink[] = [
  {
    id: 'artist',
    title: 'Knaller Soundsystem',
    subtitle: 'Alle Releases auf Spotify',
    spotifyUrl: 'https://open.spotify.com/artist/32OORI4khivugUjORlih63',
    spotifyUri: 'spotify:artist:32OORI4khivugUjORlih63',
    coverEmoji: '🔥',
  },
  {
    id: 'shit-ist-knaller',
    title: 'Shit ist Knaller',
    subtitle: 'Single - 2026',
    spotifyUrl: 'https://open.spotify.com/album/488lsEklK9nq10SGajLkTc',
    spotifyUri: 'spotify:album:488lsEklK9nq10SGajLkTc',
    coverEmoji: '💥',
  },
  {
    id: 'city-surfer',
    title: 'City Surfer',
    subtitle: 'Single - 2025',
    spotifyUrl: 'https://open.spotify.com/album/4FMOuvMTOT8XzMCTUvZDDC',
    spotifyUri: 'spotify:album:4FMOuvMTOT8XzMCTUvZDDC',
    coverEmoji: '🏄',
  },
];
