import { Instrument_Serif, Inter_Tight, Michroma } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans' });
const wide = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-wide' });

export const metadata = {
  title: 'Reposé Residence — Al Furjan, Dubai | Dubai One',
  description:
    'Reposé Residence by Saion Properties. A luxurious lifestyle address in Al Furjan, Dubai — 1 to 4 bedroom residences and sky penthouses.',
};

export const viewport = {
  themeColor: '#0d0d0c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${wide.variable}`}>
      <body>{children}</body>
    </html>
  );
}
