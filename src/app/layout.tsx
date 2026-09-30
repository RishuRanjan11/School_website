import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UUMV Mahasingh Hasauli | Senior Secondary School',
  description: 'Utkramit Uccha Madhyamik Vidyalaya Mahasingh Hasauli, Madhepur, Madhubani, Bihar.',
  keywords: ['school', '+2 school', 'Higher Secondary', 'Science stream', 'Arts stream', 'UUMV Mahasingh Hasauli'],
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
