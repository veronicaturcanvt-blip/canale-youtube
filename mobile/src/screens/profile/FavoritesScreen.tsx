import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PracticeCard } from '@/components/PracticeCard';
import { Practice } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

// TODO: fetch from GET /users/me/favorites
export function FavoritesScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Practice[]>([]);

  useEffect(() => {
    setFavorites([]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('profile.favorites')}</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PracticeCard
            practice={item}
            onPress={(practice) => navigation.navigate('PracticePlayer', { id: practice.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
});
