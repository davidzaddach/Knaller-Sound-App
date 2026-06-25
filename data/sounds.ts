export interface Sound {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const sounds: Sound[] = [
  { id: 'airhorn', name: 'Airhorn', emoji: '📯', color: '#ff2d95' },
  { id: 'siren', name: 'Siren', emoji: '🚨', color: '#ff3366' },
  { id: 'alarm', name: 'Alarm', emoji: '🔔', color: '#ffe600' },
  { id: 'gun_shot', name: 'Bam Bam', emoji: '💥', color: '#ff6b2d' },
  { id: 'dj_rewind', name: 'Rewind!', emoji: '⏪', color: '#b400ff' },
  { id: 'pullup', name: 'Pull Up!', emoji: '🔄', color: '#00f0ff' },
  { id: 'bass_drop', name: 'Bass Drop', emoji: '🔊', color: '#4d4dff' },
  { id: 'reggae_horn', name: 'Horn', emoji: '🎺', color: '#39ff14' },
  { id: 'dancehall', name: 'Riddim', emoji: '🌴', color: '#ffe600' },
  { id: 'crowd', name: 'Forward!', emoji: '🙌', color: '#ff2d95' },
  { id: 'explosion', name: 'Boom!', emoji: '💣', color: '#ff6b2d' },
  { id: 'whistle', name: 'Whistle', emoji: '🎶', color: '#00f0ff' },
  { id: 'foghorn', name: 'Foghorn', emoji: '🌊', color: '#4d4dff' },
  { id: 'lion_roar', name: 'Lion!', emoji: '🦁', color: '#39ff14' },
  { id: 'dubplate', name: 'Dub', emoji: '🔥', color: '#b400ff' },
];
