import './styles/main.css';
import './styles/auth.css';
import { api } from './api/client.js';
import { setDB } from './state.js';
import * as app from './app.js';

declare global {
  interface Window {
    finReload: () => Promise<void>;
    finLogout: () => Promise<void>;
    goPage: (id: string) => void;
    openTxnModal: () => void;
    openBudModal: () => void;
    openGoalModal: () => void;
    openRecurModal: () => void;
    openPinModal: () => void;
    openModal: (id: string) => void;
    closeModal: (id: string, e?: Event) => void;
    setType: (t: string) => void;
    setRecurType: (t: string) => void;
    saveTxn: () => Promise<void>;
    saveBudget: () => Promise<void>;
    saveGoal: () => Promise<void>;
    saveRecur: () => Promise<void>;
    saveProfile: () => Promise<void>;
    savePin: () => Promise<void>;
    delBudget: (id: string) => Promise<void>;
    delGoal: (id: string) => Promise<void>;
    delRecur: (id: string) => Promise<void>;
    addToGoal: (id: string) => Promise<void>;
    setFilter: (f: string, el: HTMLElement) => void;
    toggleTheme: () => Promise<void>;
    togglePref: (key: string, el: HTMLElement) => Promise<void>;
    exportData: () => void;
    handleImport: (e: Event) => Promise<void>;
    handleAvatar: (e: Event) => void;
    clearData: () => Promise<void>;
    resetDemo: () => Promise<void>;
    runAIAnalysis: () => Promise<void>;
    sendAIMsg: (msg: string) => Promise<void>;
    checkOnboarding: () => void;
    obNext: () => void;
    obSkip: () => void;
  }
}

function exposeApp() {
  const w = window as unknown as Record<string, unknown>;
  for (const [key, fn] of Object.entries(app)) {
    if (typeof fn === 'function') w[key] = fn;
  }
}

async function loadAppState() {
  const raw = await api.fetchState();
  const generated = raw.recurringGenerated ?? 0;
  const { recurringGenerated: _, ...state } = raw;
  setDB(state);
  const theme =
    localStorage.getItem('fin_theme') ??
    (document.documentElement.getAttribute('data-theme') || 'light');
  app.applyTheme(theme, false);
  if (generated > 0) {
    app.toast(
      generated === 1
        ? '1 lançamento automático adicionado'
        : `${generated} lançamentos automáticos adicionados`,
    );
  }
  return generated;
}

window.finReload = loadAppState;

function showAuth() {
  document.getElementById('auth-screen')?.classList.remove('hidden');
  document.getElementById('app-root')?.classList.add('hidden');
  document.getElementById('loading-screen')?.classList.add('hidden');
}

function showApp() {
  document.getElementById('auth-screen')?.classList.add('hidden');
  document.getElementById('app-root')?.classList.remove('hidden');
  document.getElementById('loading-screen')?.classList.add('hidden');
}

function showLoading() {
  document.getElementById('loading-screen')?.classList.remove('hidden');
  document.getElementById('auth-screen')?.classList.add('hidden');
  document.getElementById('app-root')?.classList.add('hidden');
}

function showError(msg: string) {
  const el = document.getElementById('api-error');
  if (el) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
}

async function bootstrapApp() {
  exposeApp();
  app.populateCatSel('recur-cat', 'expense');
  app.renderAll();
  setTimeout(app.checkOnboarding, 120);
  showApp();
}

window.finLogout = async () => {
  await api.logout();
  showAuth();
};

function setupAuthForm() {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const authError = document.getElementById('auth-error');

  const setTab = (tab: 'login' | 'register') => {
    tabLogin?.classList.toggle('active', tab === 'login');
    tabRegister?.classList.toggle('active', tab === 'register');
    loginForm?.classList.toggle('hidden', tab !== 'login');
    registerForm?.classList.toggle('hidden', tab !== 'register');
    if (authError) authError.textContent = '';
  };

  tabLogin?.addEventListener('click', () => setTab('login'));
  tabRegister?.addEventListener('click', () => setTab('register'));

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement)
      .value;
    try {
      showLoading();
      await api.login(email, password);
      await loadAppState();
      await bootstrapApp();
    } catch (err) {
      showAuth();
      if (authError) authError.textContent = (err as Error).message;
    }
  });

  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (document.getElementById('reg-name') as HTMLInputElement).value;
    const email = (document.getElementById('reg-email') as HTMLInputElement).value;
    const password = (document.getElementById('reg-password') as HTMLInputElement)
      .value;
    try {
      showLoading();
      await api.register(name, email, password);
      await loadAppState();
      await bootstrapApp();
    } catch (err) {
      showAuth();
      if (authError) authError.textContent = (err as Error).message;
    }
  });

  document.getElementById('btn-logout')?.addEventListener('click', () => {
    void window.finLogout();
  });
}

async function init() {
  setupAuthForm();
  showLoading();
  try {
    await api.me();
    await loadAppState();
    await bootstrapApp();
  } catch {
    showAuth();
  }
}

init().catch(() => {
  showError('Não foi possível conectar ao servidor. Verifique se a API está rodando.');
  showAuth();
});
