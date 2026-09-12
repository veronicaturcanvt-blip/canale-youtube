import { apiRequest } from './client';
import { SubscriptionInfo } from '@/types';

export function fetchSubscription(token: string) {
  return apiRequest<SubscriptionInfo>('/subscriptions/me', { token });
}

export function pauseSubscription(token: string) {
  return apiRequest<SubscriptionInfo>('/subscriptions/me/pause', {
    method: 'POST',
    token,
  });
}

export function restorePurchases(token: string) {
  return apiRequest<SubscriptionInfo>('/subscriptions/me/restore', {
    method: 'POST',
    token,
  });
}
