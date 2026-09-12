import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchSubscription, pauseSubscription } from '@/services/api/subscription';
import { SubscriptionInfo } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export function SubscriptionDetailsScreen() {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    fetchSubscription('').then(setSubscription).catch(() => setSubscription(null));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Subscription</Text>
      {subscription && (
        <>
          <Text style={typography.body}>Plan: {subscription.plan}</Text>
          <Text style={typography.body}>Started: {subscription.startedAt}</Text>
          <Text style={typography.body}>Expires: {subscription.expiresAt}</Text>
          <Text style={typography.body}>
            Price: {subscription.price} {subscription.currency}
          </Text>
        </>
      )}
      <Pressable
        style={styles.pauseButton}
        onPress={() => pauseSubscription('').then(setSubscription)}
      >
        <Text style={{ color: colors.surface }}>Pause for 1 month</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  pauseButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
});
