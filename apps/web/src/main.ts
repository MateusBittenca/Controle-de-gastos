import './styles/main.css';
import './styles/auth.css';
import './styles/landing.css';
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

type AuthView = 'login' | 'register' | 'forgot' | 'reset';

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

function showLanding() {
  document.getElementById('landing-screen')?.classList.remove('hidden');
  document.getElementById('auth-screen')?.classList.add('hidden');
  document.getElementById('app-root')?.classList.add('hidden');
  document.getElementById('loading-screen')?.classList.add('hidden');
  app.hideOnboarding();
}

function showAuth() {
  document.getElementById('landing-screen')?.classList.add('hidden');
  document.getElementById('auth-screen')?.classList.remove('hidden');
  document.getElementById('app-root')?.classList.add('hidden');
  document.getElementById('loading-screen')?.classList.add('hidden');
  app.hideOnboarding();
}

function showApp() {
  document.getElementById('landing-screen')?.classList.add('hidden');
  document.getElementById('auth-screen')?.classList.add('hidden');
  document.getElementById('app-root')?.classList.remove('hidden');
  document.getElementById('loading-screen')?.classList.add('hidden');
}

function showLoading() {
  document.getElementById('loading-screen')?.classList.remove('hidden');
  document.getElementById('landing-screen')?.classList.add('hidden');
  document.getElementById('auth-screen')?.classList.add('hidden');
  document.getElementById('app-root')?.classList.add('hidden');
  app.hideOnboarding();
}

function showError(msg: string) {
  const el = document.getElementById('api-error');
  if (el) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
}

function getResetTokenFromUrl(): string | null {
  const token = new URLSearchParams(window.location.search).get('reset');
  return token && token.length >= 32 ? token : null;
}

function clearResetFromUrl() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('reset')) return;
  url.searchParams.delete('reset');
  const next = url.pathname + (url.search ? url.search : '') + url.hash;
  window.history.replaceState({}, '', next);
}

async function bootstrapApp(userId: string) {
  app.setCurrentUserId(userId);
  exposeApp();
  app.populateCatSel('recur-cat', 'expense');
  app.renderAll();
  showApp();
  setTimeout(app.checkOnboarding, 120);
}

window.finLogout = async () => {
  await api.logout();
  showLanding();
};

function setupLandingNav(openAuth: (tab: 'login' | 'register') => void) {
  const goRegister = () => openAuth('register');
  const goLogin = () => openAuth('login');

  document.getElementById('landing-nav-login')?.addEventListener('click', goLogin);
  document.getElementById('landing-cta-login')?.addEventListener('click', goLogin);
  document.getElementById('landing-cta-start')?.addEventListener('click', goRegister);
  document.getElementById('landing-cta-start-hero')?.addEventListener('click', goRegister);
  document.getElementById('landing-cta-bottom')?.addEventListener('click', goRegister);
}

function setupAuthForm() {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const forgotForm = document.getElementById('forgot-form') as HTMLFormElement;
  const resetForm = document.getElementById('reset-form') as HTMLFormElement;
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const authTabs = document.getElementById('auth-tabs');
  const authError = document.getElementById('auth-error');
  const authSuccess = document.getElementById('auth-success');
  const authTitle = document.getElementById('auth-title');
  const authSub = document.getElementById('auth-sub');
  const authDemo = document.querySelector('.auth-demo') as HTMLElement | null;
  const devResetBox = document.getElementById('dev-reset-box');

  let resetToken: string | null = getResetTokenFromUrl();

  const clearMessages = () => {
    if (authError) authError.textContent = '';
    if (authSuccess) {
      authSuccess.textContent = '';
      authSuccess.classList.add('hidden');
    }
    devResetBox?.classList.add('hidden');
    if (devResetBox) devResetBox.innerHTML = '';
  };

  const setView = (view: AuthView) => {
    clearMessages();
    loginForm?.classList.toggle('hidden', view !== 'login');
    registerForm?.classList.toggle('hidden', view !== 'register');
    forgotForm?.classList.toggle('hidden', view !== 'forgot');
    resetForm?.classList.toggle('hidden', view !== 'reset');
    authTabs?.classList.toggle('hidden', view === 'forgot' || view === 'reset');
    authDemo?.classList.toggle('hidden', view === 'forgot' || view === 'reset');

    if (view === 'login') {
      if (authTitle) authTitle.textContent = 'Bem-vindo';
      if (authSub) authSub.textContent = 'Entre ou crie sua conta';
    } else if (view === 'register') {
      if (authTitle) authTitle.textContent = 'Criar conta';
      if (authSub) authSub.textContent = 'Preencha seus dados';
    } else if (view === 'forgot') {
      if (authTitle) authTitle.textContent = 'Recuperar senha';
      if (authSub) authSub.textContent = 'Enviaremos um link para seu e-mail';
    } else if (view === 'reset') {
      if (authTitle) authTitle.textContent = 'Nova senha';
      if (authSub) authSub.textContent = 'Escolha uma senha segura';
    }
  };

  const setTab = (tab: 'login' | 'register') => {
    tabLogin?.classList.toggle('active', tab === 'login');
    tabRegister?.classList.toggle('active', tab === 'register');
    setView(tab);
  };

  tabLogin?.addEventListener('click', () => setTab('login'));
  tabRegister?.addEventListener('click', () => setTab('register'));

  document.getElementById('link-forgot')?.addEventListener('click', () => {
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const forgotEmail = document.getElementById('forgot-email') as HTMLInputElement;
    if (forgotEmail && email) forgotEmail.value = email;
    setView('forgot');
  });

  document.getElementById('link-back-login')?.addEventListener('click', () => {
    clearResetFromUrl();
    resetToken = null;
    setTab('login');
  });

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement)
      .value;
    try {
      showLoading();
      const { user } = await api.login(email, password);
      await loadAppState();
      await bootstrapApp(user.id);
    } catch (err) {
      showAuth();
      setView('login');
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
      const { user } = await api.register(name, email, password);
      await loadAppState();
      await bootstrapApp(user.id);
    } catch (err) {
      showAuth();
      setView('register');
      if (authError) authError.textContent = (err as Error).message;
    }
  });

  forgotForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('forgot-email') as HTMLInputElement).value;
    try {
      clearMessages();
      const res = await api.forgotPassword(email);
      if (authSuccess) {
        authSuccess.textContent = res.message;
        authSuccess.classList.remove('hidden');
      }
      if (res.devResetUrl && devResetBox) {
        devResetBox.classList.remove('hidden');
        devResetBox.innerHTML = `<strong>Modo dev (sem SMTP):</strong> use o link abaixo.<br><a href="${res.devResetUrl}">${res.devResetUrl}</a>`;
      }
    } catch (err) {
      if (authError) authError.textContent = (err as Error).message;
    }
  });

  resetForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const p1 = (document.getElementById('reset-password') as HTMLInputElement).value;
    const p2 = (document.getElementById('reset-password2') as HTMLInputElement).value;
    if (p1 !== p2) {
      if (authError) authError.textContent = 'As senhas não coincidem';
      return;
    }
    const token = resetToken ?? getResetTokenFromUrl();
    if (!token) {
      if (authError) authError.textContent = 'Link inválido. Solicite um novo e-mail.';
      return;
    }
    try {
      clearMessages();
      const res = await api.resetPassword(token, p1);
      clearResetFromUrl();
      resetToken = null;
      if (authSuccess) {
        authSuccess.textContent = res.message;
        authSuccess.classList.remove('hidden');
      }
      setTab('login');
    } catch (err) {
      if (authError) authError.textContent = (err as Error).message;
    }
  });

  document.querySelectorAll('.btn-logout').forEach((btn) => {
    btn.addEventListener('click', () => {
      void window.finLogout();
    });
  });

  if (resetToken) {
    setView('reset');
  }

  return (tab: 'login' | 'register') => {
    showAuth();
    setTab(tab);
  };
}

async function init() {
  app.hideOnboarding();
  const openAuth = setupAuthForm();
  if (openAuth) setupLandingNav(openAuth);

  const resetToken = getResetTokenFromUrl();
  if (resetToken) {
    showAuth();
    return;
  }

  showLoading();
  try {
    const { user } = await api.me();
    await loadAppState();
    await bootstrapApp(user.id);
  } catch {
    showLanding();
  }
}

init().catch(() => {
  showError('Não foi possível conectar ao servidor. Verifique se a API está rodando.');
  showLanding();
});
