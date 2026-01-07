import React from 'react';
import "../stylesheets/style_black.scss";
import "../stylesheets/style_white.scss";
import { Providers } from './providers';

export const metadata = {
  title: 'Google Fonts + Korean',
  description: 'Google Fonts + Korean Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="shortcut icon" href="/assets/favicon_0.png" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
