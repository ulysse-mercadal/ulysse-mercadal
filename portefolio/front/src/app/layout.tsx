import React from 'react';
import "./globals.css";
import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'Ulysse Mercadal',
  description: 'Ulysse Mercadal Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link id="favicon" rel="shortcut icon" href="/assets/favicon_0.png" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}