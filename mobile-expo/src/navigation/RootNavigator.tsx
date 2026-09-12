import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { OnboardingTimeScreen } from '@/screens/onboarding/OnboardingTimeScreen';
import { OnboardingEquipmentScreen } from '@/screens/onboarding/OnboardingEquipmentScreen';
import { PaywallScreen } from '@/screens/paywall/PaywallScreen';
import { PracticePlayerScreen } from '@/screens/practice/PracticePlayerScreen';
import { StatsScreen } from '@/screens/profile/StatsScreen';
import { FavoritesScreen } from '@/screens/profile/FavoritesScreen';
import { SubscriptionDetailsScreen } from '@/screens/profile/SubscriptionDetailsScreen';
import { PersonalDataScreen } from '@/screens/profile/PersonalDataScreen';
import { InviteFriendScreen } from '@/screens/referral/InviteFriendScreen';
import { AchievementsScreen } from '@/screens/achievements/AchievementsScreen';
import { SupportScreen } from '@/screens/support/SupportScreen';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="OnboardingTime" component={OnboardingTimeScreen} />
            <Stack.Screen name="OnboardingEquipment" component={OnboardingEquipmentScreen} />
            <Stack.Screen name="Paywall" component={PaywallScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="PracticePlayer" component={PracticePlayerScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="SubscriptionDetails" component={SubscriptionDetailsScreen} />
            <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
            <Stack.Screen name="InviteFriend" component={InviteFriendScreen} />
            <Stack.Screen name="Achievements" component={AchievementsScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
