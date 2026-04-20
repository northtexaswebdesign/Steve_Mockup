import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke AI Next.js Site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}