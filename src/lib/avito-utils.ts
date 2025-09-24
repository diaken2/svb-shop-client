'use client';

const ANDROID_PACKAGE = 'com.avito.android';

export function getUA(): string {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent || '';
}

export function isAndroid(ua: string): boolean {
  return /Android/i.test(ua);
}

export function isIOS(ua: string): boolean {
  return /iPhone|iPad|iPod/i.test(ua);
}

export function isInApp(ua: string): boolean {
  return /(FBAN|FBAV|Instagram|Line|VKClient|VkIntent|OKApp|Viber|WhatsApp|Telegram|MiuiBrowser|TikTok|Twitter)/i.test(ua);
}

export function isMobile(ua: string): boolean {
  return isAndroid(ua) || isIOS(ua);
}

export function normalizeAvitoURL(raw: string): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:') return null;
    if (!/(\.|^)avito\.ru$/i.test(u.hostname)) return null;
    return u.toString();
  } catch {
    if (/^\/[^^\s]*$/.test(raw)) return `https://avito.ru${raw}`;
    return null;
  }
}

export function makeAndroidIntentUrl(webUrl: string): string {
  return (
    'intent://' +
    webUrl.replace(/^https?:\/\//i, '') +
    '#Intent;scheme=https;package=' +
    ANDROID_PACKAGE +
    ';S.browser_fallback_url=' +
    encodeURIComponent(webUrl) +
    ';end'
  );
}

export function createSmartAvitoLink(avitoUrl: string): string {
  const ua = getUA();
  
  // Если это мобильное устройство
  if (isMobile(ua)) {
    const onAndroid = isAndroid(ua);
    const inApp = isInApp(ua);
    
    // Если пользователь во встроенном браузере, показываем инструкцию
    if (inApp) {
      return `/avito-go?to=${encodeURIComponent(avitoUrl)}`;
    }
    
    // Если Android - создаем intent ссылку
    if (onAndroid) {
      return makeAndroidIntentUrl(avitoUrl);
    }
    
    // Если iOS - обычная ссылка (iOS автоматически предложит открыть в приложении)
    return avitoUrl;
  }
  
  // На десктопе - обычная ссылка
  return avitoUrl;
}

export function handleAvitoClick(avitoUrl: string, e?: React.MouseEvent): void {
  const ua = getUA();
  
  // Если это мобильное устройство
  if (isMobile(ua)) {
    const onAndroid = isAndroid(ua);
    const inApp = isInApp(ua);
    
    // Если пользователь во встроенном браузере, переходим на страницу с инструкцией
    if (inApp) {
      e?.preventDefault();
      window.location.href = `/avito-go?to=${encodeURIComponent(avitoUrl)}`;
      return;
    }
    
    // Если Android - открываем intent ссылку
    if (onAndroid) {
      e?.preventDefault();
      const intentUrl = makeAndroidIntentUrl(avitoUrl);
      
      // Пытаемся открыть приложение
      try {
        window.location.href = intentUrl;
      } catch {
        // Если не получилось, открываем веб-версию
        window.open(avitoUrl, '_blank');
      }
      
      // Fallback через 1.5 секунды
      setTimeout(() => {
        window.open(avitoUrl, '_blank');
      }, 1500);
      return;
    }
    
    // Если iOS - обычная ссылка (iOS автоматически предложит открыть в приложении)
    return;
  }
  
  // На десктопе - обычная ссылка
  return;
}
