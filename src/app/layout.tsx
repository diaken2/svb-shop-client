import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateHomeMetadata } from '@/lib/seo-utils';
import { CartProvider } from "@/contexts/CartContext";
import CartNotificationWrapper from '@/components/CartNotificationWrapper';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = await generateHomeMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SVB SHOP - ТВ без подписок",
    "description": "Smart TV приставки для комфортного просмотра контента",
    "url": "https://tv-bez-podpiski.ru",
    "logo": "https://tv-bez-podpiski.ru/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-992-220-00-37",
      "contactType": "customer service",
      "availableLanguage": "Russian"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "sameAs": [
      "https://t.me/StasB78"
    ]
  };

  return (
    <html lang="ru">
      <head>
        {/* SPA route hit tracker for Yandex.Metrika */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (typeof window === 'undefined') return;
                function sendHit(){
                  if (!window.ym) return;
                  try {
                    window.ym(103576778, 'hit', window.location.pathname + window.location.search);
                  } catch (e) {}
                }
                // Send initial hit after ym initializes
                setTimeout(sendHit, 0);
                // Listen to history changes (Next.js app router uses pushState/replaceState)
                const pushState = history.pushState;
                const replaceState = history.replaceState;
                function wrap(fn){
                  return function(){
                    const ret = fn.apply(this, arguments);
                    try { sendHit(); } catch (e) {}
                    return ret;
                  }
                }
                history.pushState = wrap(pushState);
                history.replaceState = wrap(replaceState);
                window.addEventListener('popstate', function(){
                  try { sendHit(); } catch (e) {}
                });
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103576778', 'ym');

              ym(103576778, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103576778" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartNotificationWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
