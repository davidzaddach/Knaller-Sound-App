import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

type DeviceType = 'ios' | 'android' | 'in-app-browser' | 'none';

function detectDevice(): DeviceType {
  if (Platform.OS !== 'web') return 'none';

  const ua = navigator.userAgent || '';
  const isStandalone =
    ('standalone' in navigator && (navigator as any).standalone) ||
    window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone) return 'none';

  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);

  const isInApp = /FBAN|FBAV|Instagram|Line|Snapchat|Twitter|TikTok/.test(ua);
  if (isInApp) return 'in-app-browser';

  if (isIOS) return 'ios';
  if (isAndroid) return 'android';

  return 'none';
}

export default function InstallBanner() {
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState<DeviceType>('none');

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const dismissed = localStorage.getItem('install-banner-dismissed');
    if (dismissed) return;

    const detected = detectDevice();
    if (detected !== 'none') {
      setDevice(detected);
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('install-banner-dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>App installieren</Text>
            <TouchableOpacity onPress={dismiss} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Ionicons name="close" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {device === 'ios' && (
            <Text style={styles.instruction}>
              Tippe auf{' '}
              <Ionicons name="share-outline" size={16} color={Colors.secondary} />
              {' '}(Teilen) und dann auf{'\n'}
              <Text style={styles.highlight}>"Zum Home-Bildschirm"</Text>
            </Text>
          )}

          {device === 'android' && (
            <Text style={styles.instruction}>
              Tippe auf{' '}
              <Ionicons name="ellipsis-vertical" size={16} color={Colors.secondary} />
              {' '}(Menü) und dann auf{'\n'}
              <Text style={styles.highlight}>"App installieren"</Text>
            </Text>
          )}

          {device === 'in-app-browser' && (
            <Text style={styles.instruction}>
              Öffne diese Seite im Browser um die App zu installieren.{'\n'}
              Tippe auf{' '}
              <Ionicons name="ellipsis-horizontal" size={16} color={Colors.secondary} />
              {' '}→{' '}
              <Text style={styles.highlight}>"Im Browser öffnen"</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    paddingHorizontal: Spacing.md,
  },
  banner: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(12, 12, 20, 0.97)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 1,
  },
  instruction: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  highlight: {
    color: Colors.secondary,
    fontWeight: '700',
  },
});
