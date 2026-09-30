import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apex International Academy | Senior Secondary (+2) School',
  description: 'Premier Senior Secondary School offering holistic education, CBSE Science, Commerce, and Arts streams with advanced laboratories and distinguished faculty.',
  keywords: ['school', '+2 school', 'CBSE school', 'Higher Secondary', 'Science stream', 'Commerce stream', 'Humanities', 'Apex International Academy'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-gold-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
