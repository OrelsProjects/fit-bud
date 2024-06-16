import type { Metadata, Viewport } from "next";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import SessionWrapper from "./providers/SessionWrapper";
import React from "react";
import LiveChatProvider from "./providers/LiveChatProvider";
import AuthProvider from "./providers/AuthProvider";
import TopLoaderProvider from "./providers/TopLoaderProvider";
import ProductHuntProvider from "./providers/ProductHuntProvider";
import Head from "next/head";

const APP_NAME = "PinkyPartner";
const APP_DEFAULT_TITLE = "PinkyPartner";
const APP_TITLE_TEMPLATE = "%s - PinkyPartner";
const APP_DESCRIPTION = "Create habits with a partner!";

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: "/favicon.ico",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="font-montserrat">
           <Head>
        <title>{APP_DEFAULT_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:title" content={APP_DEFAULT_TITLE} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={APP_DEFAULT_TITLE} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image" content="/twitter-og-image.png" />

        {/* Additional tags for mobile web app capabilities */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#1C1F26" />
      </Head>
      <body className="!overscroll-none">
        <LiveChatProvider />
        <StoreProvider>
          <SessionWrapper>
            <ThemeProvider>
              <AuthProvider>
                <TopLoaderProvider />
                <ProductHuntProvider />
                {children}
                {/* <SpeedInsights />
                <Analytics /> */}
              </AuthProvider>
            </ThemeProvider>
          </SessionWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#FBF8F4",
};
