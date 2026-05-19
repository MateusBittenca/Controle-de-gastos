import type { AppState, Goal, Recurring, Transaction } from '../types.js';

const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? 'Erro na requisição');
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  register(name: string, email: string, password: string) {
    return request<{ user: { id: string; email: string; name: string } }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify({ name, email, password }) },
    );
  },

  login(email: string, password: string) {
    return request<{ user: { id: string; email: string; name: string } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    );
  },

  logout() {
    return request<{ ok: boolean }>('/auth/logout', { method: 'POST' });
  },

  forgotPassword(email: string) {
    return request<{ message: string; devResetUrl?: string }>(
      '/auth/forgot-password',
      { method: 'POST', body: JSON.stringify({ email }) },
    );
  },

  resetPassword(token: string, password: string) {
    return request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  me() {
    return request<{ user: { id: string; email: string; name: string } }>(
      '/auth/me',
    );
  },

  fetchState() {
    return request<AppState & { recurringGenerated?: number }>('/state');
  },

  createTransaction(data: {
    type: string;
    cat: string;
    desc: string;
    amt: number;
    date: string;
    isRecur?: boolean;
  }) {
    return request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  deleteTransaction(id: string) {
    return request<{ ok: boolean }>(`/transactions/${id}`, { method: 'DELETE' });
  },

  importTransactions(
    rows: { type: string; cat: string; desc: string; amt: number; date: string }[],
  ) {
    return request<{ added: number }>('/transactions/bulk', {
      method: 'POST',
      body: JSON.stringify(rows),
    });
  },

  setBudget(categoryId: string, limit: number) {
    return request(`/budgets/${categoryId}`, {
      method: 'PUT',
      body: JSON.stringify({ limit }),
    });
  },

  deleteBudget(categoryId: string) {
    return request(`/budgets/${categoryId}`, { method: 'DELETE' });
  },

  createGoal(data: {
    name: string;
    icon: string;
    target: number;
    current: number;
  }) {
    return request<Goal>('/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  addToGoal(id: string, addAmount: number) {
    return request<Goal>(`/goals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ addAmount }),
    });
  },

  deleteGoal(id: string) {
    return request(`/goals/${id}`, { method: 'DELETE' });
  },

  createRecurring(data: {
    type: string;
    cat: string;
    desc: string;
    amt: number;
    freq: string;
    next: string;
  }) {
    return request<Recurring>('/recurring', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  deleteRecurring(id: string) {
    return request(`/recurring/${id}`, { method: 'DELETE' });
  },

  patchProfile(data: Record<string, unknown>) {
    return request<AppState>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  savePin(pin: string) {
    return request('/profile/pin', {
      method: 'PATCH',
      body: JSON.stringify({ pin }),
    });
  },

  clearData() {
    return request<AppState>('/data/clear', { method: 'POST' });
  },

  resetDemo() {
    return request<AppState>('/data/reset-demo', { method: 'POST' });
  },
};
