import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fetchSubscription, pauseSubscription } from '@/services/api/subscription';
import { SubscriptionInfo } from '@/types';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';
import { GradientButton } from '@/components/GradientButton';

export function SubscriptionDetailsScreen() {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    fetchSubscription('').then(setSubscription).catch(() => setSubscription(null));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={typography.display}>Subscription</Text>
      {subscription && (
        <LinearGradient colors={[...gradients.hero]} style={styles.card}>
          <Text style={styles.plan}>{subscription.plan} plan</Text>
          <Text style={styles.price}>
            {subscription.price} {subscription.currency}
            <Text style={styles.perYear}> / year</Text>
          </Text>
          <View style={styles.divider} />
          <Text style={styles.detail}>Started: {subscription.startedAt}</Text>
          <Text style={styles.detail}>Expires: {subscription.expiresAt}</Text>
        </LinearGradient>
      )}
      <GradientButton
        label="Pause for 1 month"
        variant="sunset"
        onPress={() => pauseSubscription('').then(setSubscription)}
        style={styles.pauseButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  card: { borderRadius: radii.lg, padding: 20, marginTop: 20 },
  plan: { ...typography.label, color: colors.textOnDark, opacity: 0.85 },
  price: { ...typography.display, color: colors.textOnDark, marginTop: 4 },
  perYear: { ...typography.body, color: colors.textOnDark, opacity: 0.8 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 14 },
  detail: { ...typography.body, color: colors.textOnDark, opacity: 0.9 },
  pauseButton: { marginTop: 24 },
});
