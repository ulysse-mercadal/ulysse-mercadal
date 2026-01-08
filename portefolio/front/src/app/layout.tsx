import React from 'react';
import "./globals.css";

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
    <html lang="en">
      <head>
        <link id="favicon" rel="shortcut icon" href="/assets/favicon_0.png" />
      </head>
      <body>
          {children}
      </body>
    </html>
  );
}