import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

const LANGUAGES: { code: string; flag: string; label: string }[] = [
  { code: 'it', flag: '🇮🇹', label: 'IT' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'zh', flag: '🇨🇳', label: 'ZH' },
  { code: 'ja', flag: '🇯🇵', label: 'JA' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {LANGUAGES.map(({ code, flag, label }) => {
        const isActive = i18n.language === code;
        return (
          <Pressable
            key={code}
            onPress={() => i18n.changeLanguage(code)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={styles.flag}>{flag}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0, marginBottom: 16 },
  content: { flexDirection: 'row', alignItems: 'center' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  flag: { fontSize: 16, marginRight: 6 },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.textOnDark,
  },
});
