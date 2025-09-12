import type { Metadata } from "next";
import { cookies as getCookies} from 'next/headers';

import { Providers } from "./providers";
import { GlobalLightboxProvider } from '@shared/context/GlobalLightboxContext';
import ClientApp from "./ClientApp";
import "yet-another-react-lightbox/styles.css";

import "@styles/colors.css";
import "@styles/fonts.css";
import "@styles/global.css";

export const metadata: Metadata = {
  title: "Федеральная Лезгинская Национально-Культурная Автономия | Официальный сайт",
  description:
    "Официальный сайт Федеральной Лезгинской Национально-Культурной Автономии (ФЛНКА). Новости, проекты, события, медиатека и полезные ресурсы о лезгинской культуре, истории и общественной деятельности.",
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon.ico", sizes: "any" }, // fallback для старых браузеров
    ],
    apple: "/icons/apple-touch-icon.png", // для iOS (180×180)
    other: [
      { rel: "icon", url: "/icons/icon-192.png", sizes: "192x192" },
      { rel: "icon", url: "/icons/icon-512.png", sizes: "512x512" },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = getCookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value || 'ru';

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <GlobalLightboxProvider>
            <ClientApp>
              {children}
            </ClientApp>
          </GlobalLightboxProvider>
        </Providers>
      </body>
    </html>
  );
}
