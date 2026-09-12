import { apiRequest } from './client';

export function submitSupportMessage(message: string, token: string) {
  return apiRequest<{ id: string; createdAt: string }>('/support', {
    method: 'POST',
    token,
    body: JSON.stringify({ message }),
  });
}
