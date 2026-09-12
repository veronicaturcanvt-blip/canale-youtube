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
      <Text style={[typography.display, styles.title]}>{t('profile.favorites')}</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  container: { flex: 1, backgroundColor: colors.background },
  title: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8 },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
});
